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

    // Calculate metrics
    const totalApplications = await prisma.application.count({ where: { candidateId: candidate.id } });
    
    const statusCounts = await prisma.application.groupBy({
      by: ['status'],
      where: { candidateId: candidate.id },
      _count: { status: true }
    });

    const metrics = {
      total: totalApplications,
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
      withdrawn: 0
    };

    statusCounts.forEach(item => {
      if (item.status === 'APPLIED') metrics.applied = item._count.status;
      if (item.status === 'INTERVIEWING') metrics.interviewing = item._count.status;
      if (item.status === 'OFFER') metrics.offer = item._count.status;
      if (item.status === 'REJECTED') metrics.rejected = item._count.status;
      if (item.status === 'WITHDRAWN') metrics.withdrawn = item._count.status;
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Analytics Metrics GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
