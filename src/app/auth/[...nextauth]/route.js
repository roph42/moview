// app/auth/[...nextAuth]/routeModule.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../_lib/db';
import User from '../../../model/User';
import bcrypt from 'bcryptjs';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        await connectMongo();

        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Aucun utilisateur trouvé avec cet email');
        }

        if (!user.isVerified) {
          throw new Error('Veuillez vérifier votre email avant de vous connecter');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error('Mot de passe incorrect');
        }

        return {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.is_admin,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username; 
        session.user.isAdmin = token.isAdmin;
      }
      console.log('userID',session.user.id)
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export {handler as GET, handler as POST };

