import * as crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return `${hashedPassword}.${salt}`;
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const [hashed, salt] = hashedPassword.split('.');
  const hashedPasswordToValidate = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hashed === hashedPasswordToValidate;
}

export function generateRandomToken(length: number) {
  return crypto.randomBytes(length).toString('hex');
}
