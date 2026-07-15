const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

/** Real number of people on the waitlist. Returns null if it can't be read. */
export async function fetchSignupCount(): Promise<number | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?select=id`, {
      method: "HEAD",
      headers: { ...headers, Prefer: "count=exact", Range: "0-0" },
    });
    // Content-Range looks like "0-0/42"
    const range = res.headers.get("content-range");
    const total = range?.split("/")[1];
    const n = total ? parseInt(total, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export type RecentJoin = { id: number; created_at?: string | null };

/**
 * Most recent real signups (ids only — no personal data leaves the DB).
 * Used to drive activity popups from genuine events.
 */
export async function fetchRecentJoins(limit = 8): Promise<RecentJoin[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/waitlist?select=id,created_at&order=id.desc&limit=${limit}`,
      { headers },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** "2 hours ago" — only used when we actually have a real timestamp. */
export function relativeTime(iso?: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return null;
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return null;
}
