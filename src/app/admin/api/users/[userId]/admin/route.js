import { NextResponse } from 'next/server';
import connectMongo from '@/_lib/db';
import User from '@/model/User';

export async function PATCH(req, { params }) {
    const { userId } = params;
    console.log('id utilisateur',userId)
    await connectMongo();
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'Utilisateur non trouvé.' }, { status: 404 });
      }
      console.log('Statut user',user.is_admin)
      user.is_admin = true;
      await user.save();
      console.log('Statut user after',user.is_admin)
      return NextResponse.json({ message: 'Utilisateur défini comme admin avec succès.' });
    } catch (error) {
      return NextResponse.json({ message: 'Erreur lors de la définition de l\'utilisateur comme admin.' }, { status: 500 });
    }
}