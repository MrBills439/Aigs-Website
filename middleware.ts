import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (
        pathname.startsWith('/admin') &&
        !['/admin/login', '/admin/forgot-password', '/admin/reset-password'].includes(pathname)
      ) {
        return token?.role === 'ADMIN';
      }
      return true;
    }
  }
});

export const config = {
  matcher: ['/admin/:path*']
};
