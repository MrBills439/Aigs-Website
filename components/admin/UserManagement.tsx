'use client';

import { useState } from 'react';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function UserManagement({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function createUser() {
    setLoading(true);
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      const user = (await response.json()) as AdminUser;
      setUsers((prev) => [user, ...prev]);
      setForm({ name: '', email: '', password: '' });
    } else {
      alert('Unable to create user.');
    }
    setLoading(false);
  }

  async function deleteUser(id: string) {
    if (!confirm('Delete this admin user?')) return;
    const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  }

  async function sendReset(email: string) {
    // Sends one-time reset link to selected admin user.
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      alert('Reset link sent.');
    } else {
      alert('Unable to send reset link.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="card grid gap-4 p-6 md:grid-cols-3">
        <input
          placeholder="Full name"
          className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          placeholder="Temporary password"
          type="password"
          className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        <button
          type="button"
          onClick={createUser}
          disabled={loading}
          className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white md:col-span-3"
        >
          {loading ? 'Creating...' : 'Add admin user'}
        </button>
      </div>

      <div className="card p-6">
        <h2 className="font-serif text-2xl">Admin users</h2>
        <div className="mt-4 space-y-3 text-sm text-deep/70">
          {users.length === 0 && <p>No admin users found.</p>}
          {users.map((user) => (
            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-rose/30 pb-3">
              <div>
                <p className="font-semibold text-deep">{user.name}</p>
                <p className="text-xs text-deep/60">{user.email}</p>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <button type="button" onClick={() => sendReset(user.email)} className="text-deep/70">
                  Send reset link
                </button>
                <button type="button" onClick={() => deleteUser(user.id)} className="text-deep/50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
