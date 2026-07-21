import { createClient } from '@insforge/sdk';

const baseUrl =
  process.env.NEXT_PUBLIC_INSFORGE_BASE_URL ||
  'https://744pi2u4.us-east.insforge.app';
const anonKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  'anon_afe5fc6d670d6c66954ede9315f0b11c1714ed0b3036f9e2dd48e24066423e71';

export const insforge = createClient({
  baseUrl,
  anonKey,
});
