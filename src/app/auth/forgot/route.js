import User from '@/model/User';
import connectMongo from '../../../_lib/db';
import { sendPasswordResetEmail } from '@/_lib/mail';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Connexion à MongoDB
    await connectMongo();
    
    // Extraire l'email du corps de la requête
    const { email } = await req.json(); // Pour lire les données POST

    // Vérifie si l'utilisateur existe dans la base de données avec l'email fourni
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Aucun utilisateur trouvé avec cet email.' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 heure d'expiration

    // Stocke le token et l'expiration dans l'utilisateur
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = tokenExpiry;
    await user.save();

    // Génère l'URL de réinitialisation de mot de passe
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}&email=${email}`;

    // Envoie l'email contenant le lien de réinitialisation de mot de passe
    await sendPasswordResetEmail(email, resetUrl);

    // Répond avec succès
    return NextResponse.json({ message: 'Email de réinitialisation envoyé.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
