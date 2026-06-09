import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

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

    const applications = await prisma.application.findMany({
      where: { candidateId: candidate.id },
      include: {
        job: {
          select: { title: true, companyName: true, location: true }
        }
      },
      orderBy: { appliedDate: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Applications GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
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

    const { jobId, status, notes } = await request.json();

    if (!jobId) {
      return NextResponse.json({ detail: 'Job ID is required' }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId: parseInt(jobId, 10),
        status: status || 'APPLIED',
        notes: notes || '',
      },
      include: {
        job: {
          select: { title: true, companyName: true }
        }
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Applications POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
