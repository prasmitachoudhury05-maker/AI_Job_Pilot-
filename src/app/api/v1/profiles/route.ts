import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

function formatCandidate(candidate: any) {
  if (!candidate) return null;
  const profileData = candidate.profileData ? JSON.parse(candidate.profileData) : {};
  const skills = candidate.skills ? JSON.parse(candidate.skills) : [];
  const experience = candidate.experience ? JSON.parse(candidate.experience) : [];
  const education = candidate.education ? JSON.parse(candidate.education) : [];

  return {
    id: candidate.id,
    user_id: candidate.userId,
    skills,
    experience,
    education,
    completion_percentage: candidate.completionPercentage || 0,
    created_at: candidate.createdAt,
    updated_at: candidate.updatedAt,
    ...profileData,
  };
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
    const existingProfile = await prisma.candidate.findUnique({ where: { userId } });
    if (existingProfile) {
      return NextResponse.json({ detail: 'Profile already exists for this user' }, { status: 400 });
    }

    const data = await request.json();

    const profileData = {
      title: data.title,
      summary: data.summary,
      phone: data.phone,
      location: data.location,
      linkedin_url: data.linkedin_url,
      github_url: data.github_url,
      portfolio_url: data.portfolio_url,
      website_url: data.website_url,
    };

    const newProfile = await prisma.candidate.create({
      data: {
        userId,
        profileData: JSON.stringify(profileData),
        skills: data.skills ? JSON.stringify(data.skills) : null,
        experience: data.experience ? JSON.stringify(data.experience) : null,
        education: data.education ? JSON.stringify(data.education) : null,
      }
    });

    return NextResponse.json(formatCandidate(newProfile), { status: 201 });
  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // List profiles with optional filtering
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    
    // In SQLite Prisma, filtering on JSON is limited. So we'll fetch all and filter in memory for simple cases
    // Or just return a simple list.
    const profiles = await prisma.candidate.findMany({
      take: 100
    });

    return NextResponse.json(profiles.map(formatCandidate));
  } catch (error) {
    console.error('Profiles GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
