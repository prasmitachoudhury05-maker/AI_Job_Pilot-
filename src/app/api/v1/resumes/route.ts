import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

function formatResume(resume: any) {
  return {
    id: resume.id,
    candidate_id: resume.candidateId,
    file_name: resume.fileName,
    file_path: resume.filePath,
    file_size: resume.fileSize,
    file_type: resume.fileType,
    is_active: resume.isActive,
    created_at: resume.createdAt,
    updated_at: resume.updatedAt,
  };
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
    const candidate = await prisma.candidate.findUnique({ where: { userId } });
    if (!candidate) {
      return NextResponse.json({ detail: 'Candidate profile not found' }, { status: 404 });
    }

    const resumes = await prisma.resume.findMany({
      where: { candidateId: candidate.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(resumes.map(formatResume));
  } catch (error) {
    console.error('Resumes GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
