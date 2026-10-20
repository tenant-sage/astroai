import { useServerFn } from "@tanstack/react-start";
import {
  Briefcase,
  Coins,
  Copy as CopyIcon,
  Heart,
  Lock,
  RefreshCw,
  Save,
  Shield,
  Sparkles,
  Star,
  SunMedium,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { castHoroscope } from "@/lib/astro/reading.functions";
import { guardText } from "@/lib/astro/guard";
import { copy, type Copy } from "@/lib/astro/i18n";
import {
  clearDevice,
  loadHistory,
  loadLang,
  loadProfile,
  pushHistory,
  saveLang,
  saveProfile,
  type HistoryItem,
} from "@/lib/astro/storage";
import type { CastOk, Era, Lang, Topic } from "@/lib/astro/types";
import { isRealDate, signById, toCeYear } from "@/lib/astro/zodiac";
import { cn } from "@/lib/cn";
import { Starfield } from "./starfield";

const TOPICS: { id: Topic; icon: typeof SunMedium }[] = [
  { id: "overview", icon: SunMedium },
  { id: "love", icon: Heart },
  { id: "career", icon: Briefcase },
  { id: "wealth", icon: Coins },
];

type Banner = { kind: "care" | "blocked" } | null;

export function AstroApp() {
  const cast = useServerFn(castHoroscope);
  const [lang, setLang] = useState<Lang>("th");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [era, setEra] = useState<Era>("CE");
  const [birthTime, setBirthTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [topic, setTopic] = useState<Topic>("overview");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(0);
  const [banner, setBanner] = useState<Banner>(null);
  const [toast, setToast] = useState("");
  const [reading, setReading] = useState<CastOk | null>(null);
  const [meta, setMeta] = useState({ name: "", topic: "overview" as Topic, question: "", lang: "th" as Lang });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [armedClear, setArmedClear] = useState(false);
  const paneRef = useRef<HTMLElement>(null);
  const t = copy[lang];

  useEffect(() => {
    const storedLang = loadLang();
    const profile = loadProfile();
    const nextLang = storedLang ?? profile?.lang ?? "th";
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    if (profile) {
      setName(profile.name ?? "");
      setDay(profile.day ?? "");
      setMonth(profile.month ?? "");
      setYear(profile.year ?? "");
      setEra(profile.era === "BE" ? "BE" : "CE");
      setBirthTime(profile.birthTime ?? "");
      setTimeUnknown(Boolean(profile.timeUnknown));
      if (profile.topic) setTopic(profile.topic);
    }
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!loading) return;
    const id = window.setInterval(() => setQuote((n) => (n + 1) % t.quotes.length), 2600);
    return () => window.clearInterval(id);
  }, [loading, t.quotes.length]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  function switchLang(next: Lang) {
    setLang(next);
    saveLang(next);
    document.documentElement.lang = next;
  }

  function showToast(message: string) {
    setToast(message);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner(null);
    const dayN = Number(day);
    const monthN = Number(month);
    const yearN = Number(year);
    const ce = toCeYear(yearN, era);
    if (!day || !month || !year || ce === null) {
      showToast(!day || !month || !year ? t.needDate : t.yearRange);
      return;
    }
    if (!isRealDate(ce, monthN, dayN)) {
      showToast(t.badDate);
      return;
    }
    const screened = guardText(`${name}\n${question}`);
    if (screened !== "ok") {
      setBanner({ kind: screened });
      return;
    }

    setLoading(true);
    setQuote(0);
    paneRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });

    try {
      const result = await cast({
        data: {
          name: name.trim(),
          day: dayN,
          month: monthN,
          year: yearN,
          era,
          birthTime,
          timeUnknown,
          topic,
          question: question.trim(),
          lang,
        },
      });
      if (!result.ok) {
        if (result.reason === "care" || result.reason === "blocked") setBanner({ kind: result.reason });
        else showToast(t.failed);
        return;
      }
      setReading(result);
      setMeta({ name: name.trim(), topic, question: question.trim(), lang });
      const item: HistoryItem = {
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        at: Date.now(),
        name: name.trim(),
        topic,
        question: question.trim(),
        lang,
        reading: result,
      };
      pushHistory(item);
      setHistory(loadHistory());
    } catch {
      showToast(t.failed);
    } finally {
      setLoading(false);
    }
  }

  function remember() {
    saveProfile({
      name,
      day,
      month,
      year,
      era,
      birthTime,
      timeUnknown,
      topic,
      lang,
    });
    showToast(t.saved);
  }

  function wipe() {
    if (!armedClear) {
      setArmedClear(true);
      window.setTimeout(() => setArmedClear(false), 4000);
      return;
    }
    clearDevice();
    setName("");
    setDay("");
    setMonth("");
    setYear("");
    setEra("CE");
    setBirthTime("");
    setTimeUnknown(false);
    setTopic("overview");
    setQuestion("");
    setReading(null);
    setHistory([]);
    setBanner(null);
    setArmedClear(false);
    showToast(t.cleared);
  }

  async function copyReading() {
    if (!reading) return;
    const sign = signById(reading.facts.signId);
    const text = [
      lang === "th" ? sign.th : sign.en,
      reading.sections.natal,
      reading.sections.forecast,
      ...reading.sections.guidance.map((line) => `• ${line}`),
      reading.sections.note,
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function openHistory(item: HistoryItem) {
    setReading(item.reading);
    setMeta({ name: item.name, topic: item.topic, question: item.question, lang: item.lang });
    setBanner(null);
  }

  const yearN = Number(year);
  const eraHint =
    era === "CE" && yearN >= 2400 ? t.eraSuggestBe : era === "BE" && yearN > 0 && yearN < 2200 ? t.eraSuggestCe : "";

  return (
    <div className="relative min-h-screen">
      <Starfield />
      <div className="relative z-10 flex min-h-screen flex-col">
        <p className="border-b border-line bg-ink-2/90 px-4 py-2 text-center text-xs leading-relaxed text-care">
          {t.disclaimer}
        </p>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-panel">
                <Star className="size-5 text-gold" aria-hidden="true" />
              </div>
              <h1 className="gold-text text-4xl font-bold tracking-wide sm:text-5xl">AstroAI</h1>
              <p className="mt-2 text-sm text-mist">{t.subtitle}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dim">
                <span className="inline-flex items-center gap-1">
                  <Shield className="size-3.5 text-gold" aria-hidden="true" />
                  {t.stateless}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Lock className="size-3.5 text-gold" aria-hidden="true" />
                  {t.localOnly}
                </span>
              </p>
            </div>
            <div className="inline-flex self-start rounded-xl border border-line bg-ink-2 p-1" role="group" aria-label="Language">
              <LangButton active={lang === "th"} onClick={() => switchLang("th")}>
                ไทย
              </LangButton>
              <LangButton active={lang === "en"} onClick={() => switchLang("en")}>
                EN
              </LangButton>
            </div>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-12">
            <form
              onSubmit={onSubmit}
              className="glass glow-gold space-y-4 rounded-card p-5 lg:col-span-5"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line-soft pb-3">
                <h2 className="flex items-center gap-2 text-lg text-parchment">
                  <Sparkles className="size-4 text-gold" aria-hidden="true" />
                  {t.formTitle}
                </h2>
                <span className="rounded-full border border-line px-2 py-1 text-xs text-mist">{t.clientOnly}</span>
              </div>

              <Field label={t.name} hint={t.optional}>
                <input
                  value={name}
                  maxLength={60}
                  placeholder={t.namePh}
                  onChange={(event) => setName(event.target.value)}
                  className={fieldClass}
                />
              </Field>

              <fieldset>
                <legend className="mb-1 text-xs text-mist">
                  {t.birth} <span className="text-gold">*</span>
                </legend>
                <div className="grid grid-cols-12 gap-2">
                  <select
                    required
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    className={cn(fieldClass, "col-span-3")}
                    aria-label={t.day}
                  >
                    <option value="">{t.day}</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                    className={cn(fieldClass, "col-span-5")}
                    aria-label={t.month}
                  >
                    <option value="">{t.month}</option>
                    {t.months.map((label, index) => (
                      <option key={label} value={index + 1}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    inputMode="numeric"
                    value={year}
                    placeholder={t.yearPh}
                    onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={cn(fieldClass, "col-span-4")}
                    aria-label={t.yearPh}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-mist">
                  <label className="inline-flex min-h-11 items-center gap-2">
                    <input
                      type="radio"
                      name="era"
                      checked={era === "CE"}
                      onChange={() => setEra("CE")}
                      className="accent-gold"
                    />
                    {t.eraCe}
                  </label>
                  <label className="inline-flex min-h-11 items-center gap-2">
                    <input
                      type="radio"
                      name="era"
                      checked={era === "BE"}
                      onChange={() => setEra("BE")}
                      className="accent-gold"
                    />
                    {t.eraBe}
                  </label>
                </div>
                <p className="text-xs text-dim">{eraHint || t.eraHint}</p>
              </fieldset>

              <div>
                <label className="mb-1 block text-xs text-mist" htmlFor="birth-time">
                  {t.time}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    id="birth-time"
                    type="time"
                    value={birthTime}
                    disabled={timeUnknown}
                    onChange={(event) => setBirthTime(event.target.value)}
                    className={cn(fieldClass, timeUnknown && "opacity-40")}
                  />
                  <label className="flex min-h-11 items-center gap-2 rounded-xl border border-line-soft bg-ink-2 px-3 text-xs text-mist">
                    <input
                      type="checkbox"
                      checked={timeUnknown}
                      onChange={(event) => {
                        setTimeUnknown(event.target.checked);
                        if (event.target.checked) setBirthTime("");
                      }}
                      className="accent-gold"
                    />
                    {t.timeUnknown}
                  </label>
                </div>
              </div>

              <fieldset>
                <legend className="mb-1 text-xs text-mist">{t.topic}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {TOPICS.map((item) => {
                    const Icon = item.icon;
                    const active = topic === item.id;
                    return (
                      <label key={item.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="topic"
                          value={item.id}
                          checked={active}
                          onChange={() => setTopic(item.id)}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "flex min-h-11 items-center justify-center gap-2 rounded-xl border px-2 text-sm",
                            active
                              ? "border-gold bg-panel-2 text-gold-2"
                              : "border-line-soft bg-ink-2 text-mist",
                          )}
                        >
                          <Icon className="size-4" aria-hidden="true" />
                          {t.topics[item.id]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Field label={t.question} hint={t.optional}>
                <textarea
                  value={question}
                  maxLength={400}
                  rows={3}
                  placeholder={t.questionPh}
                  onChange={(event) => setQuestion(event.target.value)}
                  className={cn(fieldClass, "h-auto py-2")}
                />
              </Field>

              {banner ? (
                <div
                  className={cn(
                    "rounded-xl border px-3 py-3 text-sm",
                    banner.kind === "care"
                      ? "border-gold-deep bg-care-bg text-care"
                      : "border-danger bg-danger-bg text-danger",
                  )}
                  role="alert"
                >
                  <p className="font-medium">{banner.kind === "care" ? t.careTitle : t.blockedTitle}</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    {banner.kind === "care" ? t.careBody : t.blockedBody}
                  </p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="gold-fill flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold disabled:opacity-60"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                {loading ? t.submitting : t.submit}
              </button>

              <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-3 text-xs">
                <button type="button" onClick={remember} className="inline-flex min-h-11 items-center gap-1 text-mist hover:text-gold-2">
                  <Save className="size-3.5" aria-hidden="true" />
                  {t.save}
                </button>
                <button type="button" onClick={wipe} className="inline-flex min-h-11 items-center gap-1 text-dim hover:text-danger">
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  {armedClear ? t.clearConfirm : t.clear}
                </button>
              </div>
            </form>

            <section
              ref={paneRef}
              className="glass flex min-h-[32rem] flex-col rounded-card p-5 lg:col-span-7"
              aria-live="polite"
            >
              {loading ? (
                <Loading t={t} quote={quote} />
              ) : reading ? (
                <Reading
                  t={t}
                  uiLang={lang}
                  reading={reading}
                  meta={meta}
                  copied={copied}
                  onCopy={copyReading}
                  onReset={() => {
                    setReading(null);
                    setQuestion("");
                  }}
                />
              ) : (
                <Empty t={t} />
              )}

              <div className="mt-6 border-t border-line-soft pt-4">
                <h3 className="text-sm text-mist">{t.history}</h3>
                {history.length === 0 ? (
                  <p className="mt-2 text-xs text-dim">{t.historyEmpty}</p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {history.map((item) => {
                      const sign = signById(item.reading.facts.signId);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => openHistory(item)}
                            className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-line-soft bg-ink-2 px-3 py-2 text-left text-sm hover:border-gold"
                          >
                            <span className="text-parchment">
                              <span className="mr-2 text-gold" aria-hidden="true">
                                {sign.glyph}
                              </span>
                              {item.lang === "th" ? sign.th : sign.en}
                              <span className="text-dim"> · {copy[item.lang].topics[item.topic]}</span>
                            </span>
                            <span className="shrink-0 text-xs text-dim tabular-nums">
                              {new Date(item.at).toLocaleDateString(item.lang === "th" ? "th-TH" : "en-GB")}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-dim">{t.footer}</p>
            </section>
          </div>
        </main>

        <footer className="border-t border-line-soft px-4 py-4 text-center text-xs text-dim">
          <p>{t.foot1}</p>
          <p className="mt-1">{t.foot2}</p>
        </footer>
      </div>

      <div
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-xl border border-line bg-panel px-4 py-3 text-sm text-parchment shadow-lg transition",
          toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
        role="status"
      >
        {toast}
      </div>
    </div>
  );
}

const fieldClass =
  "h-11 w-full rounded-xl border border-line-soft bg-ink-2 px-3 text-sm text-parchment outline-none placeholder:text-dim focus-visible:border-gold";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-mist">
        {label} {hint ? <span className="text-dim">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg px-4 text-xs font-semibold",
        active ? "gold-fill" : "text-mist",
      )}
    >
      {children}
    </button>
  );
}

function Empty({ t }: { t: Copy }) {
  return (
    <div className="my-auto py-10 text-center">
      <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
        <span className="orbit absolute inset-0 rounded-full border border-gold/40" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-panel">
          <Star className="size-7 text-gold" aria-hidden="true" />
        </span>
      </div>
      <h3 className="text-xl text-parchment">{t.emptyTitle}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-mist">{t.emptyBody}</p>
    </div>
  );
}

function Loading({ t, quote }: { t: Copy; quote: number }) {
  return (
    <div className="my-auto py-12 text-center">
      <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center">
        <span className="orbit absolute inset-0 rounded-full border border-dashed border-gold/50" />
        <span className="orbit-reverse absolute inset-3 rounded-full border border-gold/30" />
        <Sparkles className="size-6 text-gold" aria-hidden="true" />
      </div>
      <h3 className="text-xl text-gold-2">{t.loadingTitle}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-mist italic">{t.quotes[quote]}</p>
    </div>
  );
}

function Reading({
  t,
  uiLang,
  reading,
  meta,
  copied,
  onCopy,
  onReset,
}: {
  t: Copy;
  uiLang: Lang;
  reading: CastOk;
  meta: { name: string; topic: Topic; question: string; lang: Lang };
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  const sign = signById(reading.facts.signId);
  const signName = uiLang === "th" ? sign.th : sign.en;
  const planet = uiLang === "th" ? sign.planetTh : sign.planetEn;
  const displayName = meta.name || t.seeker;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-ink-2 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-2xl text-gold">
            {sign.glyph}
          </span>
          <div>
            <h3 className="text-lg text-parchment">
              {signName}
              <span className="ml-2 text-sm text-dim">{uiLang === "th" ? sign.en : sign.th}</span>
            </h3>
            <p className="text-xs text-mist">
              {t.elements[reading.facts.element]} · {planet}
            </p>
          </div>
        </div>
        <div className="text-xs text-mist">
          <p className="text-parchment">{displayName}</p>
          <p>
            {t.topicLine}: {t.topics[meta.topic]}
          </p>
          <p className="tabular-nums">
            {reading.facts.day} {t.months[reading.facts.month - 1]} {reading.facts.ceYear}
          </p>
          <p>
            {t.life} {reading.facts.lifeNumber}
          </p>
        </div>
      </div>

      <p className="text-xs text-dim">{t.bands[reading.facts.timeBand]}</p>
      <p className="text-xs text-gold-2">
        {reading.source === "grok" ? t.sourceGrok : t.sourceChart}
        {meta.lang !== uiLang ? ` · ${t.langOfReading}: ${meta.lang === "th" ? "ไทย" : "EN"}` : ""}
      </p>

      <article className="space-y-4 text-sm text-parchment">
        <Section title={t.natal}>{reading.sections.natal}</Section>
        <Section title={t.forecast}>{reading.sections.forecast}</Section>
        <section>
          <h3 className="mb-2 text-base text-gold">{t.guidance}</h3>
          <ul className="list-disc space-y-1 pl-5 text-mist">
            {reading.sections.guidance.map((line, index) => (
              <li key={`${index}-${line}`}>{line}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-base text-gold">{t.tokens}</h3>
          <div className="flex flex-wrap gap-2">
            {reading.sections.colors.map((color) => (
              <span key={color} className="rounded-full border border-line px-3 py-1 text-xs text-gold-2">
                {color}
              </span>
            ))}
          </div>
          <p className="mt-2 text-mist">{reading.sections.items.join(" · ")}</p>
        </section>
        <p className="text-xs text-dim italic">{reading.sections.note}</p>
      </article>

      {meta.question ? <p className="text-xs text-mist">“{meta.question}”</p> : null}

      <div className="flex flex-wrap gap-2 border-t border-line-soft pt-4">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-soft bg-ink-2 px-4 text-sm text-parchment"
        >
          <CopyIcon className="size-4 text-gold" aria-hidden="true" />
          {copied ? t.copied : t.copy}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm text-gold-2"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {t.again}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h3 className="mb-1 text-base text-gold">{title}</h3>
      <p className="text-mist">{children}</p>
    </section>
  );
}
