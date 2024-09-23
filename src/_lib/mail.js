import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"My Rotten Tomatoes" <no-reply@myrottentomatoes.com>',
    to: email,
    subject: 'Vérification de votre email',
    html: `<p>Merci de vérifier votre email en cliquant sur le lien suivant :</p>
           <a href="${verificationUrl}">Vérifier mon email</a>`,
  });
};

export async function sendPasswordResetEmail(email, resetUrl) {

  const mailOptions = {
    from: '"My Rotten Tomatoes" <no-reply@myrottentomatoes.com>',
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetUrl}`,
    html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetUrl}">Réinitialiser le mot de passe</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}