import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function formatJob(job: any) {
  if (!job) return null;
  
  let skills: string[] = [];
  try {
    skills = job.skills ? (typeof job.skills === 'string' ? JSON.parse(job.skills) : job.skills) : [];
  } catch (e) {
    skills = [];
  }

  let sources: string[] = [];
  try {
    sources = job.sources ? (typeof job.sources === 'string' ? JSON.parse(job.sources) : job.sources) : [job.source || 'Unknown'];
  } catch (e) {
    sources = [job.source || 'Unknown'];
  }
  
  let salary = undefined;
  if (job.salaryMin !== null && job.salaryMax !== null && job.salaryMin !== undefined && job.salaryMax !== undefined) {
    salary = `${job.salaryCurrency || 'USD'} ${job.salaryMin} - ${job.salaryMax}`;
  } else if (job.salaryMin !== null && job.salaryMin !== undefined) {
    salary = `From ${job.salaryCurrency || 'USD'} ${job.salaryMin}`;
  } else if (job.salaryMax !== null && job.salaryMax !== undefined) {
    salary = `Up to ${job.salaryCurrency || 'USD'} ${job.salaryMax}`;
  }

  return {
    id: job.id,
    title: job.title,
    company: job.companyName,
    location: job.location || 'Remote',
    description: job.description || '',
    salary,
    url: job.jobUrl || '',
    source: job.source || 'Unknown',
    sources,
    skills,
    job_type: job.jobType || undefined,
    experience_level: job.seniority || undefined,
    industry: job.industry || undefined,
    remote: job.remoteType === 'remote' || !job.location || job.location.toLowerCase().includes('remote'),
    posted_date: job.postedDate ? (job.postedDate instanceof Date ? job.postedDate.toISOString().split('T')[0] : job.postedDate.toString().split('T')[0]) : 'Recently',
    created_at: job.createdAt ? (job.createdAt instanceof Date ? job.createdAt.toISOString() : job.createdAt.toString()) : new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  try {
    const { query, location } = await request.json();

    if (!query) {
      return NextResponse.json({ detail: 'Search query is required' }, { status: 400 });
    }

    // Mock/Basic Implementation of Indeed/LinkedIn scraping via Cheerio
    // Note: Most major sites block simple fetch requests, so a real headless browser is often needed.
    // We will simulate scraping and save placeholder data for testing the manual UI.
    
    const discoveredJobs = [
      {
        title: `${query} Engineer`,
        companyName: 'Tech Innovations Inc.',
        description: `We are looking for a ${query} expert in ${location || 'remote'}.`,
        location: location || 'Remote',
        remoteType: location ? 'on-site' : 'remote',
        jobUrl: `https://example.com/jobs/${Date.now()}-1`,
        source: 'indeed',
        skills: JSON.stringify(['JavaScript', 'Next.js', 'React']),
      },
      {
        title: `Senior ${query} Developer`,
        companyName: 'Global Solutions',
        description: `Join our global team as a senior ${query} developer.`,
        location: location || 'New York, NY',
        remoteType: 'hybrid',
        jobUrl: `https://example.com/jobs/${Date.now()}-2`,
        source: 'linkedin',
        skills: JSON.stringify(['Python', 'TypeScript', 'SQL']),
      }
    ];

    const savedJobs = [];

    for (const jobData of discoveredJobs) {
      const job = await prisma.job.create({
        data: jobData
      });
      savedJobs.push(job);
    }

    return NextResponse.json({
      message: `Discovered and parsed ${savedJobs.length} jobs`,
      jobs: savedJobs.map(formatJob)
    }, { status: 200 });

  } catch (error) {
    console.error('Job discovery POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
