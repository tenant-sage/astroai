# AstroAI

พยากรณ์ราศีอาทิตย์สองภาษา (ไทย / English) เพื่อความบันเทิงและการใคร่ครวญตนเอง

Developed from a single-page prototype into a service you can actually use:

- ราศีอาทิตย์ ธาตุ ดาวประจำราศี ช่วงเวลาตกฟาก และเลขทาง คำนวณบนเครื่องผู้ใช้
- รองรับทั้ง ค.ศ. และ พ.ศ.
- ถ้อยคำจากโมเดลถูกขอผ่านเซิร์ฟเวอร์ ไม่มีกุญแจ API ในเบราว์เซอร์
- ถ้าโมเดลไม่พร้อม ระบบยังเรียบเรียงคำอ่านจากแผนที่ดวงบนเครื่อง
- โปรไฟล์และประวัติอยู่เฉพาะในเบราว์เซอร์เครื่องนั้น
- กันหัวข้อการแพทย์ การลงทุนเสี่ยง และเรื่องผิดกฎหมาย
- ถ้าข้อความเกี่ยวกับความทุกข์รุนแรง ระบบจะไม่ทำนาย และชี้สายด่วน 1323 และ Lifeline 13 11 14

This is not medical, legal, or financial advice. A sun-sign note is not a full natal chart: there is no birthplace, so there is no rising sign.

## Source map

- `src/components/astro/astro-app.tsx` — the screen
- `src/lib/astro/zodiac.ts` — tropical sun-sign dates
- `src/lib/astro/compose.ts` — on-device reading, used when the model is unavailable
- `src/lib/astro/reading.functions.ts` — server reading
- `src/lib/astro/guard.ts` — topic boundary
