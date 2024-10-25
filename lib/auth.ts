
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '../lib/prisma'; // Adjust path as necessary
import bcrypt from 'bcrypt';
import { User } from 'next-auth';

export const NEXT_AUTH = {


  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
      if (!credentials) return null;

     const user = await prisma.user.findFirst({
     where: { email: credentials.email }, 
     });
     if(!user){
      return null;
     }
     const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedpassword);
     if (isPasswordValid) {
      return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }
  return null;
}
}),


    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/pages/verify/signin",
  },
};

export default NEXT_AUTH;
