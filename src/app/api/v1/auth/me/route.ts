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
    
    try {
      const decoded = jwt.verify(token, secret) as { sub: string, email: string };
      const user = await prisma.user.findUnique({
        where: { id: parseInt(decoded.sub, 10) }
      });

      if (!user) {
        return NextResponse.json({ detail: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        full_name: user.fullName,
        is_active: user.isActive,
        is_verified: user.isVerified
      });
    } catch (err) {
      return NextResponse.json({ detail: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
