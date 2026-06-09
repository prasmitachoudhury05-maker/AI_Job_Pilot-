import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { generateCoverLetter, generateOutreachMessage } from '@/lib/generation/documentEngine';

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
    const { resumeId, jobId, documentType, tone } = await request.json();

    if (!resumeId || !jobId || !documentType) {
      return NextResponse.json({ detail: 'Resume ID, Job ID, and Document Type are required' }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({ where: { id: parseInt(resumeId, 10) } });
    const job = await prisma.job.findUnique({ where: { id: parseInt(jobId, 10) } });
    const candidate = await prisma.candidate.findUnique({ where: { userId } });

    if (!resume || !job || !candidate) {
      return NextResponse.json({ detail: 'Resume, Job, or Candidate not found' }, { status: 404 });
    }

    const originalContent = resume.parsedContent || "Candidate Resume\nSkills: TypeScript, Next.js";
    const jobDescription = job.description || "Looking for a full-stack developer with Next.js skills.";

    let generatedContent = '';

    if (documentType === 'COVER_LETTER') {
      generatedContent = await generateCoverLetter(originalContent, jobDescription, tone);
    } else if (documentType.startsWith('OUTREACH')) {
      const specificType = documentType === 'OUTREACH_LINKEDIN' ? 'LinkedIn Recruiter' : 'Hiring Manager Email';
      generatedContent = await generateOutreachMessage(originalContent, jobDescription, specificType);
    } else {
      return NextResponse.json({ detail: 'Invalid document type' }, { status: 400 });
    }

    // Save document
    const document = await prisma.generatedDocument.create({
      data: {
        userId,
        candidateId: candidate.id,
        jobId: job.id,
        documentType,
        tone: tone || 'Professional',
        content: generatedContent
      }
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Document POST error:', error);
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
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: { title: true, companyName: true }
        }
      }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Document GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
