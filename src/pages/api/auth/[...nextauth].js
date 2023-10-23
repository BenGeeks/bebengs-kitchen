import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import dbConnect from '@/lib/dbConnect';

await dbConnect();

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials.pin === process.env.DEFAULT_PIN) {
          return { userName: 'Ben Geeks' };
        } else {
          throw new Error('Intruder alert');
        }
      },
    }),
  ],
  session: { jwt: true },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async (session) => {
      return Promise.resolve(session);
    },
  },
};
export default NextAuth(authOptions);
