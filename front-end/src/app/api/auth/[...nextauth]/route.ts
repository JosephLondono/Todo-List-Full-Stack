import NextAuth from "next-auth";
import GooglePrivder from "next-auth/providers/google";

const handle = NextAuth({
  providers: [
    GooglePrivder({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
});

export { handle as GET, handle as POST };
