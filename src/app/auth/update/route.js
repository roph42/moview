import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectMongo from '../../../_lib/db';
import User from '@/model/User';

export async function POST(req) {
  const { userId, username, email, oldPassword, newPassword } = await req.json();

  await connectMongo();
    console.log('formId',userId)
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 });
  }

  const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
  if (existingEmail) {
    return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 400 });
  }

  // Mettre à jour le nom d'utilisateur et l'email
  user.username = username;
  user.email = email;

  // Si l'utilisateur souhaite changer son mot de passe, vérifier l'ancien mot de passe
  if (newPassword) {
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Ancien mot de passe incorrect.' }, { status: 400 });
    }

    // Hacher et mettre à jour le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
  }

  try {
    await user.save();
    return NextResponse.json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil.' }, { status: 500 });
  }
}
