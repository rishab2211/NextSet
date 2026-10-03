/**
 * Edge-native JWT implementation using Web Crypto API
 * Zero runtime dependencies, runs directly on Cloudflare Workers edge nodes
 */

function base64UrlEncode(data: Uint8Array): string {
  let str = '';
  for (let i = 0; i < data.byteLength; i++) {
    str += String.fromCharCode(data[i]);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates and signs a JSON Web Token (HMAC-SHA256)
 */
export async function signJwt(payload: Record<string, any>, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };

  const encodedHeader = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(enc.encode(JSON.stringify(payload)));
  const dataToSign = enc.encode(`${encodedHeader}.${encodedPayload}`);

  const key = await getHmacKey(secret);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);
  const encodedSignature = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

/**
 * Verifies a JWT and extracts claims
 */
export async function verifyJwt(token: string, secret: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const enc = new TextEncoder();
    const dataToSign = enc.encode(`${encodedHeader}.${encodedPayload}`);
    const signature = base64UrlDecode(encodedSignature);

    const key = await getHmacKey(secret);
    const isValid = await crypto.subtle.verify('HMAC', key, signature, dataToSign);

    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(encodedPayload));
    const payload = JSON.parse(payloadJson);

    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }

    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Generates a 6-digit numeric OTP code
 */
export function generateOtp(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (100000 + (array[0] % 900000)).toString();
}
