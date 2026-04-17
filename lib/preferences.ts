// Preferences API client + option constants.
// Field names match commerce-agent-service's ALLOWED_UPDATE_FIELDS exactly so
// the backend actually persists them (the mobile app uses different names;
// that's a separate bug in shoprv1). Claude's orchestrator reads these from
// the profile DB and uses them for catalog filtering + outfit composition.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://shopr-scanner-backend.onrender.com';

// ============================================
// TYPES
// ============================================

export interface Preferences {
  gender_presentation?: 'male' | 'female' | 'unisex' | 'non-binary' | null;
  size_tops?: string | null;
  size_bottoms?: string | null;
  size_shoes?: string | null;
  body_type?: string | null;
  style_description?: string | null;
  style_keywords?: string[];
  fit_preference?: 'fitted' | 'relaxed' | 'oversized' | null;
  colors_love?: string[];
  colors_avoid?: string[];
  dress_for_occasions?: string[];
  climate?: 'hot' | 'warm' | 'mild' | 'cold' | 'variable' | null;
  budget_default_min_cents?: number | null;
  budget_default_max_cents?: number | null;
  material_likes?: string[];
  material_dislikes?: string[];
  preferred_retailers?: string[];
}

export const EMPTY_PREFERENCES: Preferences = {
  gender_presentation: null,
  size_tops: null,
  size_bottoms: null,
  size_shoes: null,
  body_type: null,
  style_description: '',
  style_keywords: [],
  fit_preference: null,
  colors_love: [],
  colors_avoid: [],
  dress_for_occasions: [],
  climate: null,
  budget_default_min_cents: null,
  budget_default_max_cents: null,
  material_likes: [],
  material_dislikes: [],
  preferred_retailers: [],
};

// ============================================
// API CLIENT
// ============================================

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadPreferences(
  webUserId: string,
): Promise<Preferences | null> {
  if (!webUserId) return null;
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/profile?webUserId=${encodeURIComponent(webUserId)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) return null;
    const body = await safeJson(res);
    if (!body?.success) return null;
    // data is null for first-time visitors
    return (body.data as Preferences) ?? null;
  } catch {
    return null;
  }
}

export async function savePreferences(
  webUserId: string,
  prefs: Preferences,
): Promise<Preferences | null> {
  if (!webUserId) return null;
  try {
    const res = await fetch(`${API_URL}/api/v1/public/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ webUserId, ...prefs }),
    });
    if (!res.ok) return null;
    const body = await safeJson(res);
    if (!body?.success) return null;
    return (body.data as Preferences) ?? prefs;
  } catch {
    return null;
  }
}

export async function resetPreferences(webUserId: string): Promise<boolean> {
  if (!webUserId) return false;
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/profile?webUserId=${encodeURIComponent(webUserId)}`,
      { method: 'DELETE' },
    );
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================
// OPTION CONSTANTS (mirror mobile app's UX)
// The UI key is what the user sees/selects; the `value` is what ships to the
// commerce-agent. Mobile app uses key-only; we map here so chips persist in
// the same canonical form across platforms where possible.
// ============================================

export interface Option<V = string> {
  key: V;
  label: string;
}

export const CLOTHING_PREFERENCE_OPTIONS: Option<NonNullable<Preferences['gender_presentation']>>[] = [
  { key: 'female', label: "Women's" },
  { key: 'male', label: "Men's" },
  { key: 'unisex', label: 'Unisex' },
];

export const SIZE_OPTIONS: Option[] = [
  { key: 'XS', label: 'XS' },
  { key: 'S', label: 'S' },
  { key: 'M', label: 'M' },
  { key: 'L', label: 'L' },
  { key: 'XL', label: 'XL' },
  { key: 'XXL', label: 'XXL' },
];

export const BODY_TYPE_OPTIONS: Option[] = [
  { key: 'slim', label: 'Slim' },
  { key: 'athletic', label: 'Athletic' },
  { key: 'curvy', label: 'Curvy' },
  { key: 'plus', label: 'Plus' },
];

export const STYLE_OPTIONS: Option[] = [
  { key: 'casual', label: 'Casual' },
  { key: 'streetwear', label: 'Streetwear' },
  { key: 'minimalist', label: 'Minimalist' },
  { key: 'business_casual', label: 'Business Casual' },
  { key: 'bohemian', label: 'Bohemian' },
  { key: 'vintage', label: 'Vintage' },
  { key: 'athleisure', label: 'Athleisure' },
  { key: 'formal', label: 'Formal' },
  { key: 'preppy', label: 'Preppy' },
  { key: 'edgy', label: 'Edgy' },
  { key: 'coastal', label: 'Coastal' },
  { key: 'y2k', label: 'Y2K' },
];

export const FIT_OPTIONS: Option<NonNullable<Preferences['fit_preference']>>[] = [
  { key: 'fitted', label: 'Fitted' },
  { key: 'relaxed', label: 'Relaxed' },
  { key: 'oversized', label: 'Oversized' },
];

export const COLOR_OPTIONS: Option[] = [
  { key: 'black', label: 'Black' },
  { key: 'white', label: 'White' },
  { key: 'gray', label: 'Gray' },
  { key: 'navy', label: 'Navy' },
  { key: 'brown', label: 'Brown' },
  { key: 'beige', label: 'Beige' },
  { key: 'cream', label: 'Cream' },
  { key: 'red', label: 'Red' },
  { key: 'pink', label: 'Pink' },
  { key: 'orange', label: 'Orange' },
  { key: 'yellow', label: 'Yellow' },
  { key: 'green', label: 'Green' },
  { key: 'blue', label: 'Blue' },
  { key: 'purple', label: 'Purple' },
  { key: 'pastels', label: 'Pastels' },
  { key: 'earth_tones', label: 'Earth Tones' },
];

export const OCCASION_OPTIONS: Option[] = [
  { key: 'work', label: 'Work' },
  { key: 'date_night', label: 'Date Night' },
  { key: 'going_out', label: 'Going Out' },
  { key: 'errands', label: 'Errands' },
  { key: 'gym', label: 'Gym' },
  { key: 'beach', label: 'Beach' },
  { key: 'formal_events', label: 'Formal Events' },
  { key: 'travel', label: 'Travel' },
];

export const CLIMATE_OPTIONS: Option<NonNullable<Preferences['climate']>>[] = [
  { key: 'hot', label: 'Hot' },
  { key: 'warm', label: 'Warm' },
  { key: 'mild', label: 'Mild' },
  { key: 'cold', label: 'Cold' },
  { key: 'variable', label: 'Variable' },
];

export const MATERIAL_OPTIONS: Option[] = [
  { key: 'cotton', label: 'Cotton' },
  { key: 'linen', label: 'Linen' },
  { key: 'silk', label: 'Silk' },
  { key: 'wool', label: 'Wool' },
  { key: 'denim', label: 'Denim' },
  { key: 'leather', label: 'Leather' },
  { key: 'cashmere', label: 'Cashmere' },
  { key: 'suede', label: 'Suede' },
  { key: 'polyester', label: 'Polyester' },
  { key: 'nylon', label: 'Nylon' },
  { key: 'rayon', label: 'Rayon' },
  { key: 'acrylic', label: 'Acrylic' },
];
