import { NextResponse } from 'next/server';
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

export async function GET(request: Request, { params }: { params: { profile_id: string } }) {
  try {
    const id = parseInt(params.profile_id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: 'Invalid profile ID' }, { status: 400 });
    }

    const profile = await prisma.candidate.findUnique({
      where: { id }
    });

    if (!profile) {
      return NextResponse.json({ detail: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(formatCandidate(profile));
  } catch (error) {
    console.error('Profile GET by ID error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
