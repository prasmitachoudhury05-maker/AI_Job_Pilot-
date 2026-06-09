import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json(); // FastAPI's OAuth2PasswordRequestForm uses 'username'

    if (!username || !password) {
      return NextResponse.json({ detail: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: username }
    });

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return NextResponse.json({ detail: 'Incorrect email or password' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ detail: 'User account is inactive' }, { status: 403 });
    }

    const secret = process.env.JWT_SECRET_KEY || 'your-secret-key-change-this-in-production';
    const token = jwt.sign(
      { sub: user.id.toString(), email: user.email },
      secret,
      { expiresIn: '30m' }
    );

    return NextResponse.json({
      access_token: token,
      token_type: 'bearer'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
