const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://shopr-scanner-backend.onrender.com';

export interface PublicStats {
  products: number;
  retailers: number;
  stores: number;
  categories: number;
}

export interface Retailer {
  id: string;
  code: string;
  name: string;
  logo?: string;
  colors?: { primary?: string; accent?: string };
}

export interface Suggestion {
  text: string;
  category: string;
}

export interface DemoChatRequest {
  message: string;
  sessionId: string;
  conversation_id?: string | null;
}

export interface DemoChatProduct {
  id?: string;
  name?: string;
  brand?: string;
  price?: number;
  price_cents?: number;
  image_url?: string;
  merchant_name?: string;
  product_url?: string;
}

export interface DemoChatResponse {
  success?: boolean;
  data?: {
    response_version?: string;
    conversation_id?: string;
    reply?: string;
    message?: string;
    greeting?: string;
    recommendations?: DemoChatProduct[];
    outfits?: Array<{ products: DemoChatProduct[]; caption?: string }>;
    [key: string]: unknown;
  };
  demo?: boolean;
  ctaUrl?: string;
  error?: string;
  message?: string;
  retryAfter?: number;
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchPublicStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/stats`, {
      headers: { Accept: 'application/json' },
      // next: { revalidate: 300 } — skipped; we're client-side with output: 'export'
    });
    if (!res.ok) return null;
    const body = await safeJson(res);
    return body?.data || null;
  } catch {
    return null;
  }
}

export async function fetchRetailers(): Promise<Retailer[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/retailers`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const body = await safeJson(res);
    return body?.data || [];
  } catch {
    return [];
  }
}

export async function fetchSuggestions(): Promise<Suggestion[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/agent/suggestions`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const body = await safeJson(res);
    return body?.data?.suggestions || [];
  } catch {
    return [];
  }
}

export async function sendDemoChat(
  payload: DemoChatRequest,
  signal?: AbortSignal,
): Promise<{ ok: true; data: DemoChatResponse } | { ok: false; status: number; data: DemoChatResponse }> {
  const res = await fetch(`${API_URL}/api/v1/public/agent/demo-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  const body: DemoChatResponse = (await safeJson(res)) || {};

  if (res.ok) return { ok: true, data: body };
  return { ok: false, status: res.status, data: body };
}
