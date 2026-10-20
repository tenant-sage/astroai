import type { ElementId, Era, SignId, TimeBand } from "./types";

export type Sign = {
  id: SignId;
  th: string;
  en: string;
  glyph: string;
  element: ElementId;
  planetTh: string;
  planetEn: string;
  toneTh: string;
  toneEn: string;
  start: [number, number];
  end: [number, number];
  colors: { th: string; en: string }[];
  items: { th: string; en: string }[];
};

export const SIGNS: Sign[] = [
  {
    id: "capricorn",
    th: "ราศีมังกร",
    en: "Capricorn",
    glyph: "♑",
    element: "earth",
    planetTh: "ดาวเสาร์",
    planetEn: "Saturn",
    toneTh: "วินัย โครงสร้าง และผลที่สะสมทีละขั้น",
    toneEn: "discipline, structure, and results that compound slowly",
    start: [12, 22],
    end: [1, 19],
    colors: [
      { th: "ถ่าน", en: "charcoal" },
      { th: "สน", en: "pine" },
      { th: "ทองเก่า", en: "antique gold" },
    ],
    items: [
      { th: "สมุดปกแข็ง", en: "a hardbound notebook" },
      { th: "นาฬิกาเรียบ", en: "a plain watch" },
      { th: "หินโอนิกซ์", en: "onyx" },
    ],
  },
  {
    id: "aquarius",
    th: "ราศีกุมภ์",
    en: "Aquarius",
    glyph: "♒",
    element: "air",
    planetTh: "ดาวมฤตยู",
    planetEn: "Uranus",
    toneTh: "มุมมองแปลกใหม่และความเป็นอิสระทางความคิด",
    toneEn: "uncommon angles and independence of mind",
    start: [1, 20],
    end: [2, 18],
    colors: [
      { th: "ไฟฟ้า", en: "electric blue" },
      { th: "เงิน", en: "silver" },
      { th: "ขาวหมอก", en: "mist white" },
    ],
    items: [
      { th: "ปากกาสีเข้ม", en: "a dark pen" },
      { th: "แผนที่เมือง", en: "a city map" },
      { th: "แก้วน้ำใสรูปแปลก", en: "an unusual clear glass" },
    ],
  },
  {
    id: "pisces",
    th: "ราศีมีน",
    en: "Pisces",
    glyph: "♓",
    element: "water",
    planetTh: "ดาวเนปจูน",
    planetEn: "Neptune",
    toneTh: "จินตนาการ ความเมตตา และขอบเขตที่ต้องรักษา",
    toneEn: "imagination, compassion, and boundaries worth keeping",
    start: [2, 19],
    end: [3, 20],
    colors: [
      { th: "ทะเลลึก", en: "deep sea" },
      { th: "ม่วงลาเวนเดอร์", en: "lavender" },
      { th: "มุก", en: "pearl" },
    ],
    items: [
      { th: "ผ้าลินินอ่อน", en: "soft linen" },
      { th: "เพลงที่ฟังคนเดียว", en: "music for solitude" },
      { th: "แก้วน้ำริมหน้าต่าง", en: "a glass by the window" },
    ],
  },
  {
    id: "aries",
    th: "ราศีเมษ",
    en: "Aries",
    glyph: "♈",
    element: "fire",
    planetTh: "ดาวอังคาร",
    planetEn: "Mars",
    toneTh: "การเริ่มต้น ความกล้า และจังหวะที่ไม่อยากรอ",
    toneEn: "beginnings, courage, and a tempo that dislikes waiting",
    start: [3, 21],
    end: [4, 19],
    colors: [
      { th: "แดงอิฐ", en: "brick red" },
      { th: "ทอง", en: "gold" },
      { th: "ขาวร้อน", en: "hot white" },
    ],
    items: [
      { th: "รองเท้าที่ใส่แล้วอยากเดิน", en: "shoes that make you walk" },
      { th: "เทียนเล่มสั้น", en: "a short candle" },
      { th: "โลหะขัดเงา", en: "polished metal" },
    ],
  },
  {
    id: "taurus",
    th: "ราศีพฤษภ",
    en: "Taurus",
    glyph: "♉",
    element: "earth",
    planetTh: "ดาวศุกร์",
    planetEn: "Venus",
    toneTh: "ความคงทน ความสุขทางประสาทสัมผัส และคุณค่าที่จับต้องได้",
    toneEn: "staying power, sensory ease, and value you can touch",
    start: [4, 20],
    end: [5, 20],
    colors: [
      { th: "เขียวมอส", en: "moss" },
      { th: "ครีม", en: "cream" },
      { th: "ทองแดง", en: "copper" },
    ],
    items: [
      { th: "ผ้าลินิน", en: "linen" },
      { th: "ต้นไม้ใบหนา", en: "a thick-leaf plant" },
      { th: "ถ้วยเซรามิก", en: "a ceramic cup" },
    ],
  },
  {
    id: "gemini",
    th: "ราศีเมถุน",
    en: "Gemini",
    glyph: "♊",
    element: "air",
    planetTh: "ดาวพุธ",
    planetEn: "Mercury",
    toneTh: "ภาษา ความคล่อง และความอยากรู้มากกว่าหนึ่งทาง",
    toneEn: "language, agility, and curiosity down more than one path",
    start: [5, 21],
    end: [6, 20],
    colors: [
      { th: "เหลืองอ่อน", en: "pale yellow" },
      { th: "ฟ้าใส", en: "clear sky" },
      { th: "เทาเงิน", en: "silver grey" },
    ],
    items: [
      { th: "สมุดเล็กสองเล่ม", en: "two small notebooks" },
      { th: "หูฟัง", en: "earphones" },
      { th: "ปากกาคู่", en: "a pair of pens" },
    ],
  },
  {
    id: "cancer",
    th: "ราศีกรกฎ",
    en: "Cancer",
    glyph: "♋",
    element: "water",
    planetTh: "ดวงจันทร์",
    planetEn: "the Moon",
    toneTh: "ความผูกพัน บ้าน และความจำทางความรู้สึก",
    toneEn: "belonging, home, and emotional memory",
    start: [6, 21],
    end: [7, 22],
    colors: [
      { th: "เงินจันทร์", en: "moon silver" },
      { th: "ขาวนม", en: "milk white" },
      { th: "น้ำเงินกลางคืน", en: "night blue" },
    ],
    items: [
      { th: "ผ้าห่มบาง", en: "a light blanket" },
      { th: "รูปถ่ายเก่า", en: "an old photograph" },
      { th: "ถ้วยชา", en: "a tea cup" },
    ],
  },
  {
    id: "leo",
    th: "ราศีสิงห์",
    en: "Leo",
    glyph: "♌",
    element: "fire",
    planetTh: "ดวงอาทิตย์",
    planetEn: "the Sun",
    toneTh: "ความอบอุ่นที่อยากถูกมองเห็น และการสร้างอย่างมีหัวใจ",
    toneEn: "warmth that wants to be seen, and making things with heart",
    start: [7, 23],
    end: [8, 22],
    colors: [
      { th: "ทองคำ", en: "gold" },
      { th: "อำพัน", en: "amber" },
      { th: "แดงราชวงศ์", en: "royal red" },
    ],
    items: [
      { th: "เครื่องประดับชิ้นเดียวที่ใส่บ่อย", en: "one piece of jewellery you actually wear" },
      { th: "แสงไฟอุ่น", en: "warm light" },
      { th: "กระดาษสีครีม", en: "cream paper" },
    ],
  },
  {
    id: "virgo",
    th: "ราศีกันย์",
    en: "Virgo",
    glyph: "♍",
    element: "earth",
    planetTh: "ดาวพุธ",
    planetEn: "Mercury",
    toneTh: "รายละเอียด ระบบ และการดูแลที่เงียบแต่ได้ผล",
    toneEn: "detail, systems, and quiet care that works",
    start: [8, 23],
    end: [9, 22],
    colors: [
      { th: "เขียวมะกอก", en: "olive" },
      { th: "เบจ", en: "beige" },
      { th: "ขาวกระดาษ", en: "paper white" },
    ],
    items: [
      { th: "รายการสิ่งที่ต้องทำ", en: "a short list" },
      { th: "ผ้าลินินสะอาด", en: "clean linen" },
      { th: "สมุนไพรแห้ง", en: "dried herbs" },
    ],
  },
  {
    id: "libra",
    th: "ราศีตุลย์",
    en: "Libra",
    glyph: "♎",
    element: "air",
    planetTh: "ดาวศุกร์",
    planetEn: "Venus",
    toneTh: "ดุลยภาพ ความงาม และศิลปะของการตกลงร่วมกัน",
    toneEn: "balance, beauty, and the craft of agreement",
    start: [9, 23],
    end: [10, 22],
    colors: [
      { th: "ชมพูฝุ่น", en: "dusty rose" },
      { th: "ฟ้าพอร์ซเลน", en: "porcelain blue" },
      { th: "ทองอ่อน", en: "soft gold" },
    ],
    items: [
      { th: "ดอกไม้หนึ่งก้าน", en: "a single stem" },
      { th: "กระจกเล็ก", en: "a small mirror" },
      { th: "กระดาษจดหมาย", en: "letter paper" },
    ],
  },
  {
    id: "scorpio",
    th: "ราศีพิจิก",
    en: "Scorpio",
    glyph: "♏",
    element: "water",
    planetTh: "ดาวพลูโต",
    planetEn: "Pluto",
    toneTh: "ความลึก ความลับที่เลือกเปิด และพลังในการเริ่มใหม่",
    toneEn: "depth, chosen secrecy, and the power to begin again",
    start: [10, 23],
    end: [11, 21],
    colors: [
      { th: "ดำไวน์", en: "wine black" },
      { th: "แดงเลือดนก", en: "garnet" },
      { th: "เขียวเข้ม", en: "deep green" },
    ],
    items: [
      { th: "กุญแจดอกเก่า", en: "an old key" },
      { th: "หมึกสีเข้ม", en: "dark ink" },
      { th: "ผ้ากำมะหยี่", en: "a scrap of velvet" },
    ],
  },
  {
    id: "sagittarius",
    th: "ราศีธนู",
    en: "Sagittarius",
    glyph: "♐",
    element: "fire",
    planetTh: "ดาวพฤหัสบดี",
    planetEn: "Jupiter",
    toneTh: "ขอบฟ้าที่กว้าง ความหมาย และการเดินทางทั้งจริงและในความคิด",
    toneEn: "a wide horizon, meaning, and travel of foot or mind",
    start: [11, 22],
    end: [12, 21],
    colors: [
      { th: "ม่วงราชวงศ์", en: "royal purple" },
      { th: "น้ำเงินโคบอลต์", en: "cobalt" },
      { th: "ทอง", en: "gold" },
    ],
    items: [
      { th: "หนังสือเล่มบาง", en: "a slim book" },
      { th: "ตั๋วหรือแผนที่", en: "a ticket or a map" },
      { th: "ลูกศรเล็กๆ บนโต๊ะ", en: "a small arrow on the desk" },
    ],
  },
];

function covers(sign: Sign, month: number, day: number) {
  const cur = month * 100 + day;
  const start = sign.start[0] * 100 + sign.start[1];
  const end = sign.end[0] * 100 + sign.end[1];
  if (start <= end) return cur >= start && cur <= end;
  return cur >= start || cur <= end;
}

export function signByDate(month: number, day: number): Sign {
  return SIGNS.find((sign) => covers(sign, month, day)) ?? SIGNS[0];
}

export function signById(id: SignId): Sign {
  return SIGNS.find((sign) => sign.id === id) ?? SIGNS[0];
}

export function toCeYear(year: number, era: Era): number | null {
  const ce = era === "BE" ? year - 543 : year;
  if (!Number.isInteger(ce) || ce < 1900 || ce > 2100) return null;
  return ce;
}

export function isRealDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function timeBand(time: string, unknown: boolean): TimeBand {
  if (unknown || !/^\d{2}:\d{2}$/.test(time)) return "unknown";
  const hour = Number(time.slice(0, 2));
  if (!Number.isFinite(hour) || hour > 23) return "unknown";
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 15) return "day";
  if (hour >= 15 && hour < 19) return "dusk";
  return "night";
}

export function lifeNumber(year: number, month: number, day: number) {
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  let n = digitSum(digits);
  while (n > 9 && n !== 11 && n !== 22) n = digitSum(String(n));
  return n;
}

function digitSum(value: string) {
  let n = 0;
  for (const ch of value) {
    const digit = ch.charCodeAt(0) - 48;
    if (digit >= 0 && digit <= 9) n += digit;
  }
  return n;
}
