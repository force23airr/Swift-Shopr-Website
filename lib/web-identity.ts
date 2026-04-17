// Persistent identity for anonymous web users. Stored in localStorage so it
// survives refreshes, new tabs, and browser restarts. Used by:
//   - /preferences : keys the profile the visitor is editing
//   - /swifty      : passed to backend so queries use the same profile
//
// This is NOT secret. It's a client-generated UUID that identifies a browser
// to our backend. The backend hashes it with DEMO_USER_SALT to derive the
// actual commerce-agent user UUID (never exposed to the browser).

const KEY = 'swiftshopr-web-user-id';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers — generate a v4-style UUID
  const rand = () =>
    Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  return `${rand()}${rand()}-${rand()}-4${rand().slice(1)}-a${rand().slice(1)}-${rand()}${rand()}${rand()}`;
}

export function getOrCreateWebUserId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = localStorage.getItem(KEY);
    if (existing && UUID_REGEX.test(existing)) return existing;
    const fresh = generateUuid();
    localStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    // Storage unavailable (private mode on Safari can throw). Use a memoized
    // per-page UUID so the tab still functions, just without persistence.
    return generateUuid();
  }
}

export function resetWebUserId(): string {
  if (typeof window === 'undefined') return '';
  const fresh = generateUuid();
  try {
    localStorage.setItem(KEY, fresh);
  } catch {
    /* ignore */
  }
  return fresh;
}

export function getExistingWebUserId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const existing = localStorage.getItem(KEY);
    return existing && UUID_REGEX.test(existing) ? existing : null;
  } catch {
    return null;
  }
}
