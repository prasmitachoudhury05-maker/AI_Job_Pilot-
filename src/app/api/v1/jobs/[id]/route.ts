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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: 'Invalid job ID' }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id }
    });

    if (!job) {
      return NextResponse.json({ detail: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(formatJob(job));
  } catch (error) {
    console.error('Job GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
