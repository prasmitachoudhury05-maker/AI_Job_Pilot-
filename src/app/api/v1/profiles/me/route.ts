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
    const profile = await prisma.candidate.findUnique({
      where: { userId }
    });

    if (!profile) {
      return NextResponse.json({ detail: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(formatCandidate(profile));
  } catch (error) {
    console.error('Profile GET me error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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
    const data = await request.json();
    
    let profile = await prisma.candidate.findUnique({
      where: { userId }
    });

    if (!profile) {
      return NextResponse.json({ detail: 'Profile not found' }, { status: 404 });
    }

    // Merge profile data
    const existingProfileData = profile.profileData ? JSON.parse(profile.profileData) : {};
    const updatedProfileData = { ...existingProfileData, ...data };
    
    // SQLite doesn't natively support JSON querying easily via Prisma JSON type in early versions, so we use stringified JSON.
    profile = await prisma.candidate.update({
      where: { userId },
      data: {
        profileData: JSON.stringify(updatedProfileData),
        skills: data.skills ? JSON.stringify(data.skills) : profile.skills,
        experience: data.experience ? JSON.stringify(data.experience) : profile.experience,
        education: data.education ? JSON.stringify(data.education) : profile.education,
      }
    });

    return NextResponse.json(formatCandidate(profile));
  } catch (error) {
    console.error('Profile PUT me error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
