import dbConnection from "@/config/mongoose";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "abc@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        dbConnection();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("user in jwt callback", user);
      if (user) {
        token.role = user?.role;
      }
      //   token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session?.user) {
        session.user.role = token?.role;
      }
      // console.log("In Session callback", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
