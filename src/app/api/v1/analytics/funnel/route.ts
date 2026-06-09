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

    const statusCounts = await prisma.application.groupBy({
      by: ['status'],
      where: { candidateId: candidate.id },
      _count: { status: true }
    });

    let applied = 0;
    let interviewing = 0;
    let offer = 0;

    statusCounts.forEach(item => {
      if (item.status === 'APPLIED') applied = item._count.status;
      if (item.status === 'INTERVIEWING') interviewing = item._count.status;
      if (item.status === 'OFFER') offer = item._count.status;
    });

    // In a real funnel, the "Applied" bucket includes everyone who reached interviews or offers too.
    // E.g. Total Applications = applied + interviewing + offer + rejected + withdrawn
    const totalSent = await prisma.application.count({ where: { candidateId: candidate.id } });
    
    // Total who reached interview = currently interviewing + offers (assuming you interview before offer)
    const reachedInterview = interviewing + offer; 
    
    // Offers = offers
    const offers = offer;

    const funnelData = [
      { name: 'Applications Sent', value: totalSent, fill: '#3b82f6' },
      { name: 'Interviews Secured', value: reachedInterview, fill: '#10b981' },
      { name: 'Offers Received', value: offers, fill: '#f59e0b' }
    ];

    return NextResponse.json(funnelData);
  } catch (error) {
    console.error('Analytics Funnel GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
