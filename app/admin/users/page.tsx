import { prisma } from '@/lib/prisma';
import UserManagement from '@/components/admin/UserManagement';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl">Admin access</h1>
      <p className="text-sm text-deep/70">
        Add admin users and send password reset links when needed.
      </p>
      <UserManagement initialUsers={users.map((user) => ({ ...user, createdAt: user.createdAt.toISOString() }))} />
    </div>
  );
}
