import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/databse/conn";
import Users from "@/models/Schema";
import { compare } from "bcryptjs";

// const GOOGLE_CLIENT_ID =
//   "472275723412-oqgnsvti6lcr1fua4smqq1je5j6ll22i.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUN_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectDb();

        // check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  secret: "NPcprBBMn7U/mYuin+/IJOs+plpEsg6zMIzWKj6oL1Y=",
});


