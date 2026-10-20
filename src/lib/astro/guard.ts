export type GuardHit = "ok" | "care" | "blocked";

const CARE = [
  "ฆ่าตัวตาย",
  "ทำร้ายตัวเอง",
  "อยากตาย",
  "ซึมเศร้า",
  "suicide",
  "self-harm",
  "self harm",
  "kill myself",
  "end my life",
  "depression",
];

const BLOCKED = [
  "มะเร็ง",
  "เนื้องอก",
  "วินิจฉัยโรค",
  "โรคหัวใจ",
  "หุ้น",
  "คริปโต",
  "บิตคอยน์",
  "ฟอเร็กซ์",
  "หวย",
  "การพนัน",
  "ยาเสพติด",
  "ฟอกเงิน",
  "ผิดกฎหมาย",
  "คุณไสย",
  "ignore previous",
  "ignore all previous",
  "system prompt",
  "prompt injection",
  "crypto",
  "bitcoin",
  "forex",
  "stock tip",
  "stock investment",
  "gambling",
  "lottery",
  "money laundering",
  "illegal",
  "black magic",
  "diagnose my",
  "medical diagnosis",
  "tumor",
];

export function guardText(text: string): GuardHit {
  const lower = text.toLowerCase();
  if (CARE.some((word) => lower.includes(word))) return "care";
  if (BLOCKED.some((word) => lower.includes(word))) return "blocked";
  return "ok";
}
