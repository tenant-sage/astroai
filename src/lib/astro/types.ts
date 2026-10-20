export const TOPICS = ["overview", "love", "career", "wealth"] as const;
export type Topic = (typeof TOPICS)[number];
export type Lang = "th" | "en";
export type Era = "CE" | "BE";
export type ElementId = "fire" | "earth" | "air" | "water";
export type TimeBand = "dawn" | "day" | "dusk" | "night" | "unknown";
export type SignId =
  | "capricorn"
  | "aquarius"
  | "pisces"
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius";

export type ChartFacts = {
  signId: SignId;
  glyph: string;
  element: ElementId;
  timeBand: TimeBand;
  lifeNumber: number;
  ceYear: number;
  month: number;
  day: number;
  time: string | null;
};

export type Sections = {
  natal: string;
  forecast: string;
  guidance: string[];
  colors: string[];
  items: string[];
  note: string;
};

export type ReadingSource = "grok" | "chart";

export type CastOk = {
  ok: true;
  source: ReadingSource;
  limited: boolean;
  facts: ChartFacts;
  sections: Sections;
};

export type CastFail = {
  ok: false;
  reason: "invalid" | "care" | "blocked" | "unavailable";
};

export type CastResult = CastOk | CastFail;

export type CastInput = {
  name: string;
  day: number;
  month: number;
  year: number;
  era: Era;
  birthTime: string;
  timeUnknown: boolean;
  topic: Topic;
  question: string;
  lang: Lang;
};
