import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
    const sessionId = parseInt(params.id, 10);

    const session = await prisma.tailoringSession.findUnique({
      where: { id: sessionId },
      include: { changeLogs: true }
    });

    if (!session) {
      return NextResponse.json({ detail: 'Session not found' }, { status: 404 });
    }

    if (session.userId !== userId) {
      return NextResponse.json({ detail: 'Unauthorized access to session' }, { status: 403 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Tailoring GET error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

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
    const sessionId = parseInt(params.id, 10);

    const session = await prisma.tailoringSession.findUnique({
      where: { id: sessionId }
    });

    if (!session || session.userId !== userId) {
      return NextResponse.json({ detail: 'Session not found or unauthorized' }, { status: 404 });
    }

    const data = await request.json();

    const updatedSession = await prisma.tailoringSession.update({
      where: { id: sessionId },
      data: {
        tailoredResume: data.tailoredResume || session.tailoredResume,
        status: data.status || session.status
      }
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Tailoring PUT error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
