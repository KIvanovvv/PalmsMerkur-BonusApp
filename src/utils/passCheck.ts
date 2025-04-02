const HASH = 'e751efb8b652817fa0c47700ad07167bf7140bb7f137fdfae9ccf233baa4e69c';

export async function verifyPassword(inputPassword: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hash === HASH;
}
