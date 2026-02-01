import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        return token?.role === 'ADMIN';
      }
      return true;
    }
  }
});

export const config = {
  matcher: ['/admin/:path*']
};
