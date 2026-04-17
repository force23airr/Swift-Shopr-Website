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
  webUserId?: string;
}

// Matches commerce-agent-service's ProductRecommendation.
export interface DemoChatProduct {
  id: string;
  name: string;
  brand?: string | null;
  description?: string | null;
  price?: string;
  price_cents?: number;
  category?: string | null;
  material?: string | null;
  colors?: string[];
  sizes?: string[];
  image_urls?: string[];
  product_url?: string | null;
  affiliate_url?: string | null;
  merchant_name?: string;
  is_sponsored?: boolean;
  position?: number;
}

export interface DemoChatOutfit {
  outfit_id: string;
  description?: string;
  top: DemoChatProduct;
  bottom: DemoChatProduct;
  shoes: DemoChatProduct;
  total_price?: string;
  total_price_cents?: number;
  position?: number;
}

export interface DemoChatResponse {
  success?: boolean;
  data?: {
    response_version?: string;
    conversation_id?: string;
    message?: string;
    outfits?: DemoChatOutfit[];
    result_count?: number;
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
