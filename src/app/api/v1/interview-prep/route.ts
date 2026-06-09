import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { generateInterviewPrep } from '@/lib/generation/interviewEngine';

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
    const { resumeId, jobId } = await request.json();

    if (!resumeId || !jobId) {
      return NextResponse.json({ detail: 'Resume ID and Job ID are required' }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({ where: { id: parseInt(resumeId, 10) } });
    const job = await prisma.job.findUnique({ where: { id: parseInt(jobId, 10) } });
    const candidate = await prisma.candidate.findUnique({ where: { userId } });

    if (!resume || !job || !candidate) {
      return NextResponse.json({ detail: 'Resume, Job, or Candidate not found' }, { status: 404 });
    }

    const originalContent = resume.parsedContent || "Candidate Resume\nSkills: TypeScript, Next.js";
    const jobDescription = job.description || "Looking for a great candidate.";

    const generatedContent = await generateInterviewPrep(originalContent, jobDescription);

    // Save document with type INTERVIEW_PREP
    const document = await prisma.generatedDocument.create({
      data: {
        userId,
        candidateId: candidate.id,
        jobId: job.id,
        documentType: 'INTERVIEW_PREP',
        tone: 'Coaching',
        content: generatedContent
      }
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Interview Prep POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
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

    const documents = await prisma.generatedDocument.findMany({
      where: { 
        userId,
        documentType: 'INTERVIEW_PREP'
      },
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: { title: true, companyName: true }
        }
      }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Interview Prep GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
