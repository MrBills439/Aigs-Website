import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}
