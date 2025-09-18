import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields to show on the default login page
      // by adding them to the `credentials` object.
      // But we are using a custom login page, so we don't need to define them here.
      async authorize(credentials) {
        // This is where you would add your own logic to validate credentials
        // from a database. For this demo, we'll accept a static user.
        if (credentials.username === 'user' && credentials.password === 'pass') {
          return { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
