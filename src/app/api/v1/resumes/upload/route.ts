import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

function formatResume(resume: any) {
  return {
    id: resume.id,
    candidate_id: resume.candidateId,
    file_name: resume.fileName,
    file_path: resume.filePath,
    file_size: resume.fileSize,
    file_type: resume.fileType,
    is_active: resume.isActive,
    created_at: resume.createdAt,
    updated_at: resume.updatedAt,
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
    const candidate = await prisma.candidate.findUnique({ where: { userId } });
    if (!candidate) {
      return NextResponse.json({ detail: 'Candidate profile not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ detail: 'No file uploaded' }, { status: 400 });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the file
    const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Mock parsed content based on candidate profile info
    const profileData = candidate.profileData ? JSON.parse(candidate.profileData) : {};
    const candidateSkills = candidate.skills ? JSON.parse(candidate.skills) : [];
    
    const mockParsedContent = `
${profileData.fullName || 'Test User'}
${profileData.title || 'Software Engineer'}
Email: test@example.com
Phone: ${profileData.phone || '123-456-7890'}
Location: ${profileData.location || 'Remote'}

Summary:
${profileData.summary || 'Experienced software engineer seeking new opportunities.'}

Skills:
${candidateSkills.join(', ')}
`;

    // Create the resume in the database
    const resume = await prisma.resume.create({
      data: {
        candidateId: candidate.id,
        fileName: file.name,
        filePath: filePath,
        fileSize: file.size,
        fileType: file.type || 'application/pdf',
        parsedContent: mockParsedContent,
        parsedData: JSON.stringify({
          skills: candidateSkills,
          summary: profileData.summary || ''
        })
      }
    });

    return NextResponse.json(formatResume(resume), { status: 201 });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
