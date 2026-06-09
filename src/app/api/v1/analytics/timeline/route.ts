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

    // Get applications from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const applications = await prisma.application.findMany({
      where: {
        candidateId: candidate.id,
        appliedDate: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        appliedDate: true
      }
    });

    // Group by date string (YYYY-MM-DD)
    const dateMap: Record<string, number> = {};
    
    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      dateMap[dateString] = 0;
    }

    // Populate with actual data
    applications.forEach(app => {
      const dateString = app.appliedDate.toISOString().split('T')[0];
      if (dateMap[dateString] !== undefined) {
        dateMap[dateString]++;
      }
    });

    const timelineData = Object.keys(dateMap).map(date => ({
      date,
      applications: dateMap[date]
    }));

    return NextResponse.json(timelineData);
  } catch (error) {
    console.error('Analytics Timeline GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
