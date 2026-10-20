import type { CastOk, Era, Lang, Topic } from "./types";

const PROFILE_KEY = "astroai.profile.v1";
const HISTORY_KEY = "astroai.history.v1";
const LANG_KEY = "astroai.lang.v1";

export type Profile = {
  name: string;
  day: string;
  month: string;
  year: string;
  era: Era;
  birthTime: string;
  timeUnknown: boolean;
  topic: Topic;
  lang: Lang;
};

export type HistoryItem = {
  id: string;
  at: number;
  name: string;
  topic: Topic;
  question: string;
  lang: Lang;
  reading: CastOk;
};

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadLang(): Lang | null {
  const value = readJson<Lang>(LANG_KEY);
  return value === "th" || value === "en" ? value : null;
}

export function saveLang(lang: Lang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANG_KEY, JSON.stringify(lang));
}

export function loadProfile(): Profile | null {
  const profile = readJson<Profile>(PROFILE_KEY);
  if (!profile || typeof profile !== "object") return null;
  return profile;
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadHistory(): HistoryItem[] {
  const items = readJson<HistoryItem[]>(HISTORY_KEY);
  return Array.isArray(items) ? items.slice(0, 12) : [];
}

export function pushHistory(item: HistoryItem) {
  if (typeof window === "undefined") return;
  const next = [item, ...loadHistory().filter((row) => row.id !== item.id)].slice(0, 12);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearDevice() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROFILE_KEY);
  window.localStorage.removeItem(HISTORY_KEY);
}
