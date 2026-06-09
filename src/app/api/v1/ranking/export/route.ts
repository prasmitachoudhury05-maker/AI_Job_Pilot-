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

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';

    // Fetch rankings
    const rankings = await prisma.jobRanking.findMany({
      where: { candidateId: candidate.id },
      include: { job: true },
      orderBy: { overallScore: 'desc' }
    });

    if (format === 'json') {
      return NextResponse.json(rankings);
    }

    // CSV format
    let csvContent = 'Job ID,Job Title,Company,Overall Score,Confidence Score,Explanation\n';
    rankings.forEach((r) => {
      const title = r.job.title.replace(/"/g, '""');
      const company = r.job.companyName.replace(/"/g, '""');
      const explanation = (r.explanation || '').replace(/"/g, '""');
      csvContent += `${r.jobId},"${title}","${company}",${((r.overallScore || 0) * 100).toFixed(1)}%,${(r.confidenceScore || 85).toFixed(1)}%,"${explanation}"\n`;
    });

    return NextResponse.json({ data: csvContent });

  } catch (error) {
    console.error('Ranking export GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
