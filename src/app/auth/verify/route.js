import { NextResponse } from 'next/server';
import connectMongo from '../../../_lib/db';
import User from '@/model/User';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  await connectMongo();

  const user = await User.findOne({ emailToken: token });

  if (!user) {
    console.log('token invalide')
    return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
  }

  user.emailToken = null;
  user.isVerified = true;
  await user.save();

 //   return NextResponse.json({ message: 'Email vérifié avec succès' }, { status: 200 });
  console.log('Email vérifié avec succès');
  return NextResponse.redirect('http://localhost:3000/auth/signin');

}
