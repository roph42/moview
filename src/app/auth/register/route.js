import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/model/User';
import crypto from 'crypto';
import connectMongo from '../../../_lib/db';
import { sendVerificationEmail } from '@/_lib/mail';

export async function POST(req) {
  const { username, email, password, passwordConfirmation } = await req.json();

  await connectMongo();

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'Email déjà utilisé' }, { status: 400 });
  }

  // Vérifier si les mots de passe correspondent
  if (password !== passwordConfirmation) {
    return NextResponse.json({ message: 'Les mots de passe ne correspondent pas' }, { status: 400 });
  }

  // Vérifier la longueur du mot de passe
  if (password.length < 8) {
    return NextResponse.json({ message: 'Le mot de passe doit contenir au moins 8 caractères' }, { status: 400 });
  }

  // Vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Format d\'email invalide' }, { status: 400 });
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Générer un token de vérification
  const emailToken = crypto.randomBytes(64).toString('hex');

  // Créer un nouvel utilisateur
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    emailToken,
  });

  try {
    await newUser.save();
    console.log('user create s')
    await sendVerificationEmail(email, emailToken);
    console.log('Mail send successfully')
    return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l’utilisateur' }, { status: 500 });
  }
}
