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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const location = searchParams.get('location');
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const where: any = {};
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { companyName: { contains: q } },
        { description: { contains: q } }
      ];
    }
    if (location) {
      where.location = { contains: location };
    }

    const jobs = await prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: { postedDate: 'desc' }
    });

    return NextResponse.json(jobs.map(formatJob));
  } catch (error) {
    console.error('Jobs GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const job = await prisma.job.create({
      data: {
        title: data.title,
        companyName: data.company_name || data.companyName,
        description: data.description,
        location: data.location,
        remoteType: data.remote_type || data.remoteType,
        salaryMin: data.salary_min || data.salaryMin,
        salaryMax: data.salary_max || data.salaryMax,
        salaryCurrency: data.salary_currency || data.salaryCurrency || 'USD',
        jobUrl: data.job_url || data.jobUrl,
        source: data.source,
      }
    });

    return NextResponse.json(formatJob(job), { status: 201 });
  } catch (error) {
    console.error('Jobs POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
