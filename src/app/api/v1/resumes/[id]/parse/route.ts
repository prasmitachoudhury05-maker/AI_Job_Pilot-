import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: 'Invalid resume ID' }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume) {
      return NextResponse.json({ detail: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json({
      resume_id: resume.id,
      parsed_data: resume.parsedData ? JSON.parse(resume.parsedData) : {},
      success: true,
      message: 'Resume parsed successfully'
    });
  } catch (error) {
    console.error('Resume parse error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
