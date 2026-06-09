import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    if (!candidate) return NextResponse.json({ detail: 'Candidate not found' }, { status: 404 });

    const applicationId = parseInt(params.id, 10);
    const existing = await prisma.application.findUnique({ where: { id: applicationId } });

    if (!existing || existing.candidateId !== candidate.id) {
      return NextResponse.json({ detail: 'Application not found or unauthorized' }, { status: 404 });
    }

    const { status, notes, reminderDate } = await request.json();

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: status || existing.status,
        notes: notes !== undefined ? notes : existing.notes,
        reminderDate: reminderDate ? new Date(reminderDate) : existing.reminderDate
      },
      include: {
        job: { select: { title: true, companyName: true } }
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Applications PUT error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
    if (!candidate) return NextResponse.json({ detail: 'Candidate not found' }, { status: 404 });

    const applicationId = parseInt(params.id, 10);
    const existing = await prisma.application.findUnique({ where: { id: applicationId } });

    if (!existing || existing.candidateId !== candidate.id) {
      return NextResponse.json({ detail: 'Application not found or unauthorized' }, { status: 404 });
    }

    await prisma.application.delete({ where: { id: applicationId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Applications DELETE error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
