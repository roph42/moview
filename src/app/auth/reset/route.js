import connectMongo from '../../../_lib/db';
import User from '@/model/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongo();

  const { token, email, newPassword } = await req.json();

  const user = await User.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: 'Token invalide ou expiré.' }, { status: 400 });
  }

  // Hash le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: 'Mot de passe réinitialisé avec succès.' }, { status: 200 });
}
