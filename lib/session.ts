// Ephemeral demo session identity. Stored in sessionStorage so it clears per tab.
// Format: `demo-<uuid>` — backend regex validates this exact pattern.

const SESSION_KEY = 'swiftshopr-demo-session';

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `demo-${crypto.randomUUID()}`;
  }
  // Fallback for older browsers — generate a v4-style UUID
  const rand = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  return `demo-${rand()}${rand()}-${rand()}-4${rand().slice(1)}-${rand()}-${rand()}${rand()}${rand()}`;
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return generateSessionId();
  }
}

export function resetSessionId(): string {
  if (typeof window === 'undefined') return '';
  const fresh = generateSessionId();
  try {
    sessionStorage.setItem(SESSION_KEY, fresh);
  } catch {
    /* ignore storage errors */
  }
  return fresh;
}
