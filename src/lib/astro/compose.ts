import type { ChartFacts, Lang, Sections, Topic } from "./types";
import { signById } from "./zodiac";

const ELEMENT: Record<Lang, Record<ChartFacts["element"], string>> = {
  th: {
    fire: "ธาตุไฟทำให้คุณเริ่มได้เร็ว และต้องการพื้นที่ให้ความร้อนนั้นมีทิศ",
    earth: "ธาตุดินทำให้คุณเชื่อสิ่งที่ทำซ้ำได้ และไม่รีบแลกความมั่นคงกับความตื่นเต้น",
    air: "ธาตุลมทำให้คุณเข้าใจเรื่องผ่านถ้อยคำ และการเปลี่ยนมุมคือเครื่องมือ ไม่ใช่ความโลเล",
    water: "ธาตุน้ำทำให้คุณรับบรรยากาศได้ก่อนเหตุผล และต้องการความเงียบเพื่อคืนแรง",
  },
  en: {
    fire: "Fire starts quickly and needs a direction for the heat.",
    earth: "Earth trusts what can be repeated, and will not trade stability for noise.",
    air: "Air understands through language. Changing angle is a tool, not a flaw.",
    water: "Water feels the room before the argument, and recovers in quiet.",
  },
};

const TIME: Record<Lang, Record<ChartFacts["timeBand"], string>> = {
  th: {
    dawn: "เวลาตกฟากยามรุ่งเน้นการเริ่มแบบมีแรง แต่ควรเหลือทางให้ปรับในชั่วโมงแรก",
    day: "เวลาตกฟากยามวันเน้นสิ่งที่คนอื่นมองเห็น การตัดสินใจกลางแจ้งจึงมีน้ำหนักกว่าความคิดลับ",
    dusk: "เวลาตกฟากยามเย็นเน้นการประนีประนอม ศิลปะ และบทสนทนาที่ซ่อมความสัมพันธ์",
    night: "เวลาตกฟากยามค่ำเน้นสัญชาตญาณและการทำงานคนเดียว อย่าใช้ความเงียบเป็นข้ออ้างไม่สื่อสาร",
    unknown: "ไม่ได้ระบุเวลาตกฟาก จึงไม่อ่านลัคนาหรือเรือนชะตา แผนที่นี้ยึดราศีอาทิตย์เท่านั้น",
  },
  en: {
    dawn: "A dawn birth emphasises beginnings. Leave room to revise the first hour.",
    day: "A daytime birth emphasises what others can see. Public decisions carry more weight than private hunches.",
    dusk: "A dusk birth emphasises repair, art, and the conversation that mends a bond.",
    night: "A night birth emphasises instinct and solitary work. Do not let silence replace a needed sentence.",
    unknown: "Birth time was not given, so there is no rising sign. This map is sun-sign only.",
  },
};

const FORECAST: Record<Lang, Record<Topic, Record<ChartFacts["element"], string>>> = {
  th: {
    overview: {
      fire: "ภาพรวมช่วงนี้ขอให้เลือกหนึ่งไฟแล้วเลี้ยงมัน อย่าจุดพร้อมกันสามกองแล้วบ่นว่าหมดแรง",
      earth: "ภาพรวมขอความช้าที่มีกำหนด การเลื่อนอย่างมีเหตุผลดีกว่าการฝืนเร็วเพียงเพราะคนรอบข้างร้อนใจ",
      air: "ภาพรวมขอให้คุณตัดข้อมูลที่ซ้ำ เหลือสองทางที่อธิบายให้คนอื่นฟังได้ในหนึ่งย่อหน้า",
      water: "ภาพรวมขอให้แยกความรู้สึกออกจากข้อเท็จจริง แล้วค่อยตอบ สิ่งที่ท่วมวันนี้ไม่จำเป็นต้องตัดสินทั้งเดือน",
    },
    love: {
      fire: "ความรักขยับเมื่อคุณพูดตรงและนัดให้ชัด ความร้อนโดยไม่มีเวลานัดจะกลายเป็นความเข้าใจผิด",
      earth: "ความรักมั่นขึ้นจากกิจวัตรเล็ก ๆ ที่ทำตามคำพูด ไม่ใช่จากคำสาบานใหญ่",
      air: "ความรักต้องการบทสนทนาที่ทั้งสองฝ่ายได้พูดจบ อย่าตัดสินจากน้ำเสียงช่วงที่เหนื่อย",
      water: "ความรักฟื้นเมื่อมีความปลอดภัย ไม่ใช่เมื่อมีการทดสอบ บอกความต้องการเป็นประโยคเดียวที่ทำตามได้",
    },
    career: {
      fire: "การงานได้เปรียบถ้าคุณอาสาเริ่มชิ้นงานที่วัดผลได้ แล้วส่งของจริงมากกว่าคำมั่น",
      earth: "การงานโตจากการเก็บระบบที่คนอื่นข้าม เลือกหนึ่งกระบวนการแล้วทำให้มันเลิกพัง",
      air: "การงานเปิดทางผ่านการอธิบายที่สั้นและชัด เขียนให้คนที่ไม่ได้ร่วมประชุมยังทำตามได้",
      water: "การงานต้องการจังหวะฟื้น ไม่ใช่การตอบทุกข้อความทันที กันเวลาเงียบไว้ก่อนรับงานใหม่",
    },
    wealth: {
      fire: "การเงินช่วงนี้ห้ามไล่ตามความเร่ง รายจ่ายที่เกิดจากความอยากชนะควรถูกพักหนึ่งคืนก่อน",
      earth: "การเงินดีขึ้นเมื่อคุณรู้ว่าเงินเดือนหน้าติดพันธะอะไรไว้แล้ว ความชัดดีกว่าโชค",
      air: "การเงินต้องการตัวเลขบนกระดาษ ไม่ใช่ความรู้สึกว่าน่าจะพอ แยกเงินใช้กับเงินเก็บคนละซอง",
      water: "การเงินอย่าตัดสินตอนอารมณ์จัด รายการสั้น ๆ สามบรรทัดจะซื่อกว่าลางสังหรณ์",
    },
  },
  en: {
    overview: {
      fire: "The overview asks you to feed one fire. Three blazes at once is how the fuel runs out.",
      earth: "The overview wants a slow plan with a date. A reasoned delay beats speed borrowed from someone else's panic.",
      air: "The overview asks you to drop duplicate information. Keep two paths you can explain in a paragraph.",
      water: "The overview asks you to separate feeling from fact before you answer. A flooded day is not the whole month.",
    },
    love: {
      fire: "Love moves when you speak plainly and set a time. Heat without an appointment becomes a misunderstanding.",
      earth: "Love steadies through small kept promises, not through a grand oath.",
      air: "Love needs a conversation both people finish. Do not judge a tired tone as the whole truth.",
      water: "Love recovers in safety, not in tests. Name one need the other person can actually meet.",
    },
    career: {
      fire: "Work favours volunteering for a piece with a visible result, then delivering it.",
      earth: "Work grows by repairing a system others skip. Pick one process and stop it from breaking.",
      air: "Work opens when the explanation is short. Write so someone who missed the meeting can still act.",
      water: "Work needs recovery, not instant replies. Protect a quiet hour before you accept new load.",
    },
    wealth: {
      fire: "Money this stretch punishes haste. Sleep on a purchase that exists to prove you are winning.",
      earth: "Money improves when next month's obligations are already named. Clarity beats luck.",
      air: "Money wants figures on paper, not a feeling that it will probably be fine. Separate spending from saving.",
      water: "Do not move money at the peak of a mood. Three honest lines beat an intuition.",
    },
  },
};

const GUIDANCE: Record<Lang, Record<Topic, string[]>> = {
  th: {
    overview: [
      "เลือกหนึ่งเรื่องที่เลื่อนมาเกินสองสัปดาห์ แล้วกำหนดวันจบที่สั้นพอจะทำจริง",
      "ก่อนตอบเรื่องใหญ่ ให้เขียนข้อเท็จจริงสามข้อที่คนอื่นตรวจได้",
      "ลดหนึ่งพันธะที่คุณรับเพราะเกรงใจ ไม่ใช่เพราะมันสำคัญ",
      "เก็บหนึ่งชั่วโมงในสัปดาห์ไว้เงียบ โดยไม่มีหน้าจอ",
    ],
    love: [
      "บอกรู้สึกเป็นประโยคปัจจุบัน ไม่ใช่รายการความผิดเก่า",
      "นัดเวลาคุยที่ทั้งคู่ยังไม่หิวและไม่เพิ่งทะเลาะ",
      "ถามหนึ่งคำถามที่เปิดทาง แทนการสอบสวน",
      "ถ้ายังไม่พร้อมตอบ ให้ขอกำหนดเวลาตอบ อย่าหายไป",
    ],
    career: [
      "ส่งงานชิ้นเล็กที่ตรวจได้ ก่อนสัญญาชิ้นใหญ่",
      "เขียนผลลัพธ์ของสัปดาห์นี้เป็นหนึ่งประโยค",
      "ขอความช่วยเหลือเฉพาะจุด อย่าขอให้คนอื่นมาคิดแทนทั้งโครง",
      "ปิดหนึ่งแท็บที่ทำให้คุณดูยุ่งแต่ไม่ได้งาน",
    ],
    wealth: [
      "จดรายจ่ายสามวันโดยไม่ตัดสินตัวเอง แล้วค่อยดูรูปแบบ",
      "เลื่อนของซื้อที่เกินความจำเป็นออกไปหนึ่งคืน",
      "แยกเงินเก็บออกจากเงินใช้ในวันที่เงินเข้า ไม่ใช่ตอนปลายเดือน",
      "อย่าให้คำทำนายมาแทนตัวเลขในบัญชี",
    ],
  },
  en: {
    overview: [
      "Pick one matter delayed more than two weeks and give it a finish date small enough to keep.",
      "Before a large answer, write three facts someone else could check.",
      "Drop one obligation you accepted from politeness, not importance.",
      "Keep one hour this week quiet, without a screen.",
    ],
    love: [
      "Say the feeling in the present tense, not as a list of old faults.",
      "Choose a time to talk when neither of you is hungry or freshly angry.",
      "Ask one open question instead of running an inquiry.",
      "If you cannot answer yet, name when you will. Do not vanish.",
    ],
    career: [
      "Deliver a small checkable piece before you promise a large one.",
      "Write this week's outcome as a single sentence.",
      "Ask for help at one point. Do not hand over the whole frame.",
      "Close one tab that makes you look busy and produces nothing.",
    ],
    wealth: [
      "Note three days of spending without scolding yourself, then look for the pattern.",
      "Sleep on a purchase that is not a need.",
      "Move savings on the day money arrives, not at the end of the month.",
      "Do not let a reading replace the figures in the account.",
    ],
  },
};

const NOTE: Record<Lang, string> = {
  th: "นี่คือกระจกให้คิด ไม่ใช่คำสั่ง ถ้าคำทำนายขัดกับข้อเท็จจริงตรงหน้า ให้เชื่อข้อเท็จจริง",
  en: "This is a mirror for thought, not an order. If a line conflicts with the facts in front of you, trust the facts.",
};

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function composeReading(
  facts: ChartFacts,
  lang: Lang,
  topic: Topic,
  question: string,
  name: string,
): Sections {
  const sign = signById(facts.signId);
  const signName = lang === "th" ? sign.th : sign.en;
  const planet = lang === "th" ? sign.planetTh : sign.planetEn;
  const tone = lang === "th" ? sign.toneTh : sign.toneEn;
  const who = name.trim();
  const life =
    lang === "th"
      ? `เลขทางจากวันเกิดคือ ${facts.lifeNumber} ใช้เป็นเครื่องเตือนความจำ ไม่ใช่ชะตาที่ล็อกไว้`
      : `The path number from the birth date is ${facts.lifeNumber}. It is a mnemonic, not a locked fate.`;
  const address =
    lang === "th"
      ? who
        ? `สำหรับ${who} `
        : ""
      : who
        ? `${who}, `
        : "";
  const asked =
    question.trim().length > 0
      ? lang === "th"
        ? `คำถามที่วางไว้คือ “${question.trim()}” ให้ใช้ย่อหน้านี้เป็นมุมคิด ไม่ใช่คำตอบสำเร็จ`
        : `The question on the table is “${question.trim()}”. Use the paragraph as an angle, not a finished answer.`
      : lang === "th"
        ? "ไม่มีคำถามเจาะจง จึงอ่านเป็นแนวโน้มของหัวข้อนี้"
        : "No specific question was set, so this is a tendency for the chosen focus.";

  const natal = `${address}${signName} — ${ELEMENT[lang][facts.element]} ${lang === "th" ? "ดาวประจำราศี" : "Ruling planet"}: ${planet}, ${tone}. ${TIME[lang][facts.timeBand]} ${life}`;
  const forecast = `${FORECAST[lang][topic][facts.element]} ${asked}`;
  const pool = GUIDANCE[lang][topic];
  const start = hash(`${facts.ceYear}-${facts.month}-${facts.day}-${topic}-${question}`) % pool.length;
  const guidance = [0, 1, 2].map((step) => pool[(start + step) % pool.length]);

  return {
    natal,
    forecast,
    guidance,
    colors: sign.colors.map((color) => (lang === "th" ? color.th : color.en)),
    items: sign.items.map((item) => (lang === "th" ? item.th : item.en)),
    note: NOTE[lang],
  };
}
