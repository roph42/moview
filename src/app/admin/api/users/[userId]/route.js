import { NextResponse } from 'next/server';
import connectMongo from '@/_lib/db';
import User from '@/model/User';
import bcrypt from 'bcryptjs';

export async function PUT(req, { params }) {
    const { userId } = params;
    const { username, email, password } = await req.json();
  
    await connectMongo();
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'Utilisateur non trouvé.' }, { status: 404 });
      }
  
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      user.username = username;
      user.email = email;
  
      await user.save();
      return NextResponse.json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
      return NextResponse.json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { userId } = params;
  
    await connectMongo();
  
    try {
      await User.findByIdAndDelete(userId);
      return NextResponse.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      return NextResponse.json({ message: 'Erreur lors de la suppression de l\'utilisateur.' }, { status: 500 });
    }
}
