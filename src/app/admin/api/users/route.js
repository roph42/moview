import { NextResponse } from 'next/server';
import connectMongo from '@/_lib/db';
import User from '@/model/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  await connectMongo();

  try {
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la récupération des utilisateurs.' }, { status: 500 });
  }
}


export async function POST(req) {
  const { username, email, password } = await req.json();

  await connectMongo();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: 'Utilisateur ajouté avec succès.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' }, { status: 500 });
  }
}


