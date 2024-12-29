import NextAuth from "next-auth";
import GooglePrivder from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const handle = NextAuth({
  providers: [
    GooglePrivder({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.email = profile?.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.email = token.email;
      }

      return session;
    },
  },
  events: {
    signIn: async (message) => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
            process.env.NEXT_PUBLIC_URL_DEV_BACKEND
          }/api/v1/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: message.user.email,
              name: message.user.name,
              image: message.user.image,
            }),
          }
        );
        const data = await response.json();
        if (data.message === "El usuario con el email proporcionado ya existe")
          return;
      } catch (error) {
        console.error("signIn", error);
      }
    },
  },
});

export { handle as GET, handle as POST };
