import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { calculateSkillsScore, calculateLocationScore, calculateOverallScore } from '@/lib/ranking/algorithms';
import { getJobRankingExplanation } from '@/lib/ranking/groqClient';

function formatRanking(ranking: any, job: any, candidate: any, rankVal: number) {
  const candidateSkills = candidate.skills ? JSON.parse(candidate.skills) : [];
  const jobSkills = job.skills ? JSON.parse(job.skills) : [];
  
  const matched_skills = jobSkills.filter((s: string) => candidateSkills.map((c: string) => c.toLowerCase()).includes(s.toLowerCase()));
  const missing_skills = jobSkills.filter((s: string) => !candidateSkills.map((c: string) => c.toLowerCase()).includes(s.toLowerCase()));
  const match_percentage = jobSkills.length > 0 ? (matched_skills.length / jobSkills.length) * 100 : 100;

  const skillsScore = ranking.skillsScore !== null && ranking.skillsScore !== undefined ? ranking.skillsScore * 100 : match_percentage;
  const locationScore = ranking.locationScore !== null && ranking.locationScore !== undefined ? ranking.locationScore * 100 : 50;
  const overallScore = ranking.overallScore !== null && ranking.overallScore !== undefined ? ranking.overallScore * 100 : (skillsScore * 0.6 + locationScore * 0.4);
  const confidenceScore = (ranking.confidenceScore !== null && ranking.confidenceScore !== undefined)
    ? (ranking.confidenceScore <= 1.0 ? ranking.confidenceScore * 100 : ranking.confidenceScore)
    : 85;

  return {
    job_id: ranking.jobId,
    rank: rankVal,
    overall_score: overallScore,
    confidence_score: confidenceScore,
    breakdown: {
      skills: { score: skillsScore, weight: 0.5 },
      experience: { score: 75, weight: 0.1 },
      location: { score: locationScore, weight: 0.2 },
      salary: { score: 80, weight: 0.1 },
      industry: { score: 70, weight: 0.05 },
      seniority: { score: 85, weight: 0.05 },
    },
    skills_match: {
      score: skillsScore,
      matched_skills,
      missing_skills,
      match_percentage,
    },
    experience_match: {
      score: 75,
      status: "Acceptable",
    },
    location_match: {
      score: locationScore,
      status: locationScore >= 80 ? "Perfect" : (locationScore >= 50 ? "Acceptable" : "Different"),
    },
    salary_match: {
      score: 80,
      status: "Matched",
    },
    industry_match: {
      score: 70,
      status: "Related",
    },
    seniority_match: {
      score: 85,
      status: "Matched",
    },
    explanation: ranking.explanation || "No explanation provided.",
  };
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET_KEY || 'your-secret-key-change-this-in-production';
    
    let decoded;
    try {
      decoded = jwt.verify(token, secret) as { sub: string };
    } catch (err) {
      return NextResponse.json({ detail: 'Invalid token' }, { status: 401 });
    }

    const userId = parseInt(decoded.sub, 10);
    const candidate = await prisma.candidate.findUnique({ where: { userId } });
    
    if (!candidate) {
      return NextResponse.json({ detail: 'Candidate profile not found' }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const useAI = body.use_ai !== false;

    // Fetch all non-duplicate jobs
    const jobs = await prisma.job.findMany({
      where: { isDuplicate: false }
    });

    const candidateSkills = candidate.skills ? JSON.parse(candidate.skills) : [];
    const candidateProfileData = candidate.profileData ? JSON.parse(candidate.profileData) : {};

    const rankings: any[] = [];
    let totalApiCost = 0;
    let totalApiTokens = 0;

    for (const job of jobs) {
      // Check if ranking already exists
      let ranking = await prisma.jobRanking.findFirst({
        where: {
          candidateId: candidate.id,
          jobId: job.id
        }
      });

      if (!ranking) {
        // Parse job skills
        const jobSkills = job.skills ? JSON.parse(job.skills) : [];
        
        // Algorithmic Scoring
        const skillsScore = calculateSkillsScore(candidateSkills, jobSkills);
        const locationScore = calculateLocationScore(candidateProfileData.location, job.location, job.remoteType === 'remote');
        const overallScore = calculateOverallScore({ skills: skillsScore, location: locationScore });

        let explanation = "";
        let confidence = 0.85;

        if (useAI) {
          // AI Explanation via Groq
          const aiRes = await getJobRankingExplanation(candidateProfileData, job, overallScore);
          explanation = aiRes.explanation;
          confidence = aiRes.confidence;
          totalApiCost += 0.00015; // Estimate
          totalApiTokens += 150;
        } else {
          explanation = `This job has a ${(skillsScore * 100).toFixed(0)}% skills match and ${(locationScore * 100).toFixed(0)}% location match based on your professional profile.`;
        }

        // Save new ranking to Database
        ranking = await prisma.jobRanking.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            skillsScore,
            locationScore,
            overallScore,
            explanation,
            confidenceScore: confidence
          }
        });
      }

      rankings.push({ ranking, job });
    }

    // Sort by overall score descending
    rankings.sort((a, b) => (b.ranking.overallScore || 0) - (a.ranking.overallScore || 0));

    // Map to response structure
    const formattedRankings = rankings.map((item, index) => 
      formatRanking(item.ranking, item.job, candidate, index + 1)
    );

    return NextResponse.json({
      rankings: formattedRankings,
      total_jobs: formattedRankings.length,
      api_cost: totalApiCost,
      api_tokens: totalApiTokens
    }, { status: 200 });

  } catch (error) {
    console.error('Batch Ranking POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
