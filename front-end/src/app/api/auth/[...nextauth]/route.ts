import NextAuth from "next-auth";
import GooglePrivder from "next-auth/providers/google";

const handle = NextAuth({
  providers: [
    GooglePrivder({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
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
