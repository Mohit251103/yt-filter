import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import dbconnect from "@/utils/dbConfig";
import { User } from "@/app/models/auth/user-model";

export const options:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbconnect();
      try {
        const userdb = await User.findOne({ email:user.email });
        if (!userdb) {
          const data = {
            // uid: user.id,
            email: profile?.email,
            googleId: user.id,
            profilePhoto: user.image
          };
          await User.create(data);
        }
      } catch (error: any) {
        throw new Error(error);
      }
      return true;
    },
    async jwt({ user, token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if(user){
        token.id = user.id
      }
      await dbconnect();
      try {
        const data = await User.findOne({ email: token.email })
        if (data && data.username) {
          token.username = data.username;
        }
        token.picture = data.profilePhoto;
        token.userId = data.id;
        if(!user){
          token.id = data.googleId
        }
      } catch (error: any) {
        throw new Error(error);
      }

      return token
    },
    async session({ session, token }:{session:any, token:any}) {
      session.accessToken = token.accessToken as string
      session.user.id = token.id as string
      session.user.email = token.email as string;
      session.user.image = token.picture as string;
      session.user.username = token.username as string;
      session.user.userId = token.userId as string;
      return session
    }
  },
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
}

export default options;