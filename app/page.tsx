"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

/* ---- EDIT ME: clinic details ---- */
const CLINIC = {
  phone: "+91 00000 00000",
  whatsapp: "910000000000", // country code + number, no symbols
  email: "hello@hmshomeopathy.example",
  address: "क्लिनिक का पता यहाँ जोड़ें · Add clinic address",
  hours: { hi: "सोम – शनि · सुबह 9:00 – शाम 7:00", en: "Mon – Sat · 9:00 AM – 7:00 PM" } as Bi,
};

type Lang = "hi" | "en";
type Bi = { hi: string; en: string };
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "hi", setLang: () => {} });
const useT = () => { const { lang } = useContext(LangCtx); return (b: Bi) => b[lang]; };

const ease = [0.22, 1, 0.36, 1] as const;
function Reveal({ children, delay = 0, y = 40, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1600, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <b ref={ref}>{n.toLocaleString()}{suffix}</b>;
}

const Leaf = ({ s = 80, r = 0, c = "#7a9a6e" }: { s?: number; r?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ transform: `rotate(${r}deg)` }}>
    <path d="M50 95C20 70 12 35 50 5c38 30 30 65 0 90Z" fill={c} />
    <path d="M50 95V20" stroke="#f6f1e7" strokeWidth="2" opacity=".6" />
  </svg>
);

function LangSwitch() {
  const { lang, setLang } = useContext(LangCtx);
  return (
    <div className="lang" role="group" aria-label="Language">
      <button className={lang === "hi" ? "on" : ""} onClick={() => setLang("hi")} lang="hi">हिंदी</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} lang="en">EN</button>
    </div>
  );
}

function Nav() {
  const t = useT();
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const items: [Bi, string][] = [
    [{ hi: "हमारे बारे में", en: "About" }, "#about"], [{ hi: "उपचार", en: "Care" }, "#care"],
    [{ hi: "सेवा क्षेत्र", en: "Areas" }, "#areas"], [{ hi: "प्रक्रिया", en: "Process" }, "#process"],
    [{ hi: "सवाल-जवाब", en: "FAQ" }, "#faq"],
  ];
  return (
    <>
      <motion.nav className={`nav ${sc ? "scrolled" : ""}`} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
        <div className="wrap">
          <a href="#top" className="logo">
            <svg width="38" height="38" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#2f4a3a" /><path d="M50 80C32 66 28 44 50 24c22 20 18 42 0 56Z" fill="#7a9a6e" /><path d="M50 80V38" stroke="#f6f1e7" strokeWidth="3" /></svg>
            <span>HMS<small>{t({ hi: "होम्योपैथी सेंटर · सीमांचल", en: "Homeopathy Center · Seemanchal" })}</small></span>
          </a>
          <div className="links">
            {items.map(([b, h]) => <a key={h} href={h} className="l">{t(b)}</a>)}
            <LangSwitch />
            <a href="#book" className="btn btn-primary">{t({ hi: "अपॉइंटमेंट बुक करें", en: "Book appointment" })}</a>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(true)}>☰</button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile" initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.6, ease }}>
            <button className="x" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            {items.map(([b, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t(b)}</a>)}
            <a href="#book" onClick={() => setOpen(false)}>{t({ hi: "अपॉइंटमेंट", en: "Book" })}</a>
            <LangSwitch />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const t = useT();
  const { lang } = useContext(LangCtx);
  const words = t({ hi: "सीमांचल के हर परिवार के लिए सौम्य उपचार", en: "Gentle healing for every Seemanchal family." }).split(" ");
  const emIdx = lang === "hi" ? 6 : 1;
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{t({ hi: "क्लासिकल होम्योपैथी · हर उम्र के लिए", en: "Classical homeopathy · All ages" })}</motion.span>
          <h1>
            {words.map((w, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                <motion.span style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.09, ease }}>
                  {i === emIdx ? <em>{w}</em> : w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
            {t({ hi: "HMS होम्योपैथी सेंटर में हम आपकी पूरी कहानी — शरीर, मन और जीवनशैली — ध्यान से सुनते हैं, फिर आपके और आपके परिवार के लिए सुरक्षित, व्यक्तिगत दवा चुनते हैं।", en: "At HMS Homeopathy Center we take time to understand your story — body, mind and lifestyle — and prescribe gentle, individualised remedies for you and your family." })}
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <a href="#book" className="btn btn-primary">{t({ hi: "परामर्श बुक करें →", en: "Book a consultation →" })}</a>
            <a href={`tel:${CLINIC.phone.replace(/\s/g, "")}`} className="btn btn-call">📞 {t({ hi: "अभी कॉल करें", en: "Call now" })}</a>
            <a href="#care" className="btn btn-ghost">{t({ hi: "उपचार देखें", en: "Explore our care" })}</a>
          </motion.div>
          <motion.div className="trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
            <div><Counter to={4} /><span>{t({ hi: "जिलों में सेवा", en: "Districts served" })}</span></div>
            <div><Counter to={45} suffix="+" /><span>{t({ hi: "मिनट की पहली मुलाक़ात", en: "Min first consultation" })}</span></div>
            <div><Counter to={6} /><span>{t({ hi: "प्रमुख उपचार क्षेत्र", en: "Core areas of care" })}</span></div>
          </motion.div>
        </div>

        <motion.div className="art" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease }}>
          <div className="blob" />
          <svg viewBox="0 0 400 400" fill="none">
            <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "50%", originY: "90%" }}>
              <path d="M200 340V150" stroke="#f6f1e7" strokeWidth="5" strokeLinecap="round" />
              {[[200, 130, 0, 70], [200, 190, -48, 56], [200, 190, 48, 56], [200, 250, -52, 50], [200, 250, 52, 50]].map(([x, y, r, l], i) => (
                <motion.path key={i} d={`M${x} ${y + 60}C${x - 30} ${y + 30} ${x - 24} ${y - l / 2} ${x} ${y - l}c24 20 30 46 0 ${l + 60}Z`} fill={i % 2 ? "#cfe0c2" : "#e9f1de"}
                  transform={`rotate(${r} ${x} ${y + 60})`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 + i * 0.15, duration: 0.8, ease }} style={{ transformOrigin: `${x}px ${y + 60}px` }} />
              ))}
            </motion.g>
            {[[90, 300, 16], [120, 330, 11], [310, 310, 14], [280, 340, 9]].map(([x, y, r], i) => (
              <motion.circle key={i} cx={x} cy={y} r={r} fill="#f6f1e7" animate={{ y: [0, -14, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }} />
            ))}
            <motion.circle cx="320" cy="90" r="34" fill="#c9794a" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity }} />
          </svg>
          <motion.div className="float-card fc1" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}><span className="ic">🌿</span><div><b>{t({ hi: "प्राकृतिक दवाएँ", en: "Natural remedies" })}</b>{t({ hi: "सौम्य और सुरक्षित", en: "Gentle & non-toxic" })}</div></motion.div>
          <motion.div className="float-card fc2" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}><span className="ic">💚</span><div><b>{t({ hi: "संपूर्ण देखभाल", en: "Whole-person care" })}</b>{t({ hi: "शरीर · मन · जीवन", en: "Body · mind · life" })}</div></motion.div>
        </motion.div>
      </div>
      <motion.div className="leaf" style={{ left: "46%", top: "14%" }} animate={{ rotate: [0, 12, 0], y: [0, -12, 0] }} transition={{ duration: 8, repeat: Infinity }}><Leaf r={-20} /></motion.div>
    </header>
  );
}

function Marquee() {
  const t = useT();
  const items: Bi[] = [{ hi: "व्यक्तिगत दवा", en: "Individualised remedies" }, { hi: "पूर्णिया", en: "Purnia" }, { hi: "बिना जल्दबाज़ी का परामर्श", en: "Unhurried consultations" }, { hi: "अररिया", en: "Araria" }, { hi: "बच्चों के लिए सुरक्षित", en: "Safe for children" }, { hi: "किशनगंज", en: "Kishanganj" }, { hi: "पुराने और नए रोग", en: "Chronic & acute care" }, { hi: "कटिहार", en: "Katihar" }];
  const row = [...items, ...items];
  return <div className="marquee" aria-hidden><div className="track">{row.map((x, i) => <span key={i}>{t(x)}</span>)}</div></div>;
}

function About() {
  const t = useT();
  return (
    <section className="about" id="about">
      <div className="wrap">
        <Reveal>
          <div className="about-art">
            <svg viewBox="0 0 400 500" fill="none">
              <motion.path d="M200 480V180" stroke="#2f4a3a" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
              {[[200, 150, 0], [200, 250, -55], [200, 250, 55], [200, 340, -60], [200, 340, 60]].map(([x, y, r], i) => (
                <motion.path key={i} d={`M${x} ${y + 70}C${x - 50} ${y + 30} ${x - 40} ${y - 30} ${x} ${y - 70}c40 40 50 90 0 140Z`} fill={i % 2 ? "#2f4a3a" : "#f6f1e7"} opacity={i % 2 ? 0.85 : 0.95}
                  transform={`rotate(${r} ${x} ${y + 70})`} style={{ transformOrigin: `${x}px ${y + 70}px` }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.2, duration: 0.8, ease }} />
              ))}
            </svg>
          </div>
        </Reveal>
        <div>
          <Reveal><span className="eyebrow">{t({ hi: "HMS के बारे में", en: "About HMS" })}</span><h2>{t({ hi: "इलाज का एक शांत और ", en: "A calmer, more " })}<em>{t({ hi: "अपना-सा", en: "personal" })}</em>{t({ hi: " तरीका", en: " way to heal" })}</h2>
            <p className="lead">{t({ hi: "होम्योपैथी केवल बीमारी नहीं, पूरे इंसान का इलाज करती है। HMS में हर परामर्श आराम से होता है, ताकि दवा आपके लक्षण, स्वभाव, नींद, पाचन और तनाव के अनुसार चुनी जा सके।", en: "Homeopathy treats the person, not just the diagnosis. Every consultation at HMS is unhurried, so your remedy fits you — your symptoms, temperament, sleep, digestion and stress." })}</p></Reveal>
          <div className="pillars">
            {([["🔍", { hi: "गहराई से केस-टेकिंग", en: "Deep case-taking" }, { hi: "पहली मुलाक़ात में आपकी पूरी सेहत की कहानी विस्तार से समझी जाती है।", en: "A detailed first visit to understand your complete health story." }], ["🌱", { hi: "सौम्य दवाएँ", en: "Gentle remedies" }, { hi: "अत्यंत सूक्ष्म मात्रा की दवाएँ, शिशु से बुज़ुर्ग तक के लिए उपयुक्त।", en: "Highly diluted medicines, suitable for infants to seniors." }], ["🤝", { hi: "लगातार साथ", en: "Ongoing partnership" }, { hi: "नियमित फॉलो-अप से प्रगति देखी जाती है और योजना बेहतर बनाई जाती है।", en: "Regular follow-ups to track progress and refine your plan." }]] as [string, Bi, Bi][]).map(([i, h, p], k) => (
              <Reveal key={h.en} delay={k * 0.12} y={24}><div className="pillar"><i>{i}</i><div><h3>{t(h)}</h3><p>{t(p)}</p></div></div></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CARE: [string, Bi, Bi][] = [
  ["🧒", { hi: "बच्चों और शिशुओं का स्वास्थ्य", en: "Child & infant health" }, { hi: "बार-बार सर्दी-ज़ुकाम, एलर्जी, पाचन और विकास में सौम्य सहयोग।", en: "Recurrent colds, allergies, digestion and growth support, gently." }],
  ["🌸", { hi: "महिलाओं का स्वास्थ्य", en: "Women's health" }, { hi: "मासिक चक्र, हार्मोन संतुलन, PCOS और जीवन के हर पड़ाव पर सहारा।", en: "Hormonal balance, cycles, PCOS support and wellbeing through life stages." }],
  ["🧴", { hi: "त्वचा और बाल", en: "Skin & hair" }, { hi: "एक्ज़िमा, मुंहासे, सोरायसिस और बालों की समस्याओं में भीतर से देखभाल।", en: "Eczema, acne, psoriasis and hair concerns from the inside out." }],
  ["🫁", { hi: "एलर्जी और साँस की तकलीफ़", en: "Allergy & respiratory" }, { hi: "मौसमी एलर्जी, साइनस, बार-बार खाँसी और दमा में देखभाल।", en: "Seasonal allergies, sinus troubles and recurring cough or asthma care." }],
  ["🍃", { hi: "पाचन स्वास्थ्य", en: "Digestive health" }, { hi: "एसिडिटी, IBS, कब्ज़ और खाने से जुड़ी संवेदनशीलता।", en: "Acidity, IBS, constipation and food sensitivities." }],
  ["🧠", { hi: "तनाव और नींद", en: "Stress & sleep" }, { hi: "चिंता, उदासी, थकान और बेचैन रातों में संवेदनशील सहयोग।", en: "Anxiety, low mood, burnout and restless nights, with compassionate support." }],
];
function Care() {
  const t = useT();
  return (
    <section className="treat" id="care">
      <div className="wrap">
        <div className="head"><Reveal><span className="eyebrow">{t({ hi: "उपचार क्षेत्र", en: "Areas of care" })}</span><h2>{t({ hi: "पूरे ", en: "Support for the whole " })}<em>{t({ hi: "परिवार", en: "family" })}</em>{t({ hi: " के लिए सहारा", en: "" })}</h2></Reveal>
          <Reveal delay={0.1}><p className="lead">{t({ hi: "होम्योपैथी आपकी समग्र चिकित्सा का पूरक हो सकती है। चल रहे इलाज के बारे में डॉक्टर को ज़रूर बताएँ।", en: "Homeopathy can complement your overall healthcare. Always tell us about any ongoing treatment." })}</p></Reveal></div>
        <div className="grid">
          {CARE.map(([e, h, p], i) => (
            <Reveal key={h.en} delay={(i % 3) * 0.1}><div className="card"><span className="em">{e}</span><h3>{t(h)}</h3><p>{t(p)}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const t = useT();
  const d: [Bi, string][] = [[{ hi: "पूर्णिया", en: "Purnia" }, "Purnia"], [{ hi: "अररिया", en: "Araria" }, "Araria"], [{ hi: "किशनगंज", en: "Kishanganj" }, "Kishanganj"], [{ hi: "कटिहार", en: "Katihar" }, "Katihar"]];
  return (
    <section className="dist" id="areas">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t({ hi: "हमारा सेवा क्षेत्र", en: "Where we serve" })}</span>
          <h2>{t({ hi: "पूरे ", en: "All of " })}<em>{t({ hi: "सीमांचल", en: "Seemanchal" })}</em>{t({ hi: " के लिए", en: ", close to home" })}</h2>
          <p className="lead">{t({ hi: "पूर्णिया, अररिया, किशनगंज और कटिहार के मरीज़ क्लिनिक आ सकते हैं या वीडियो/WhatsApp के ज़रिये फॉलो-अप ले सकते हैं।", en: "Patients from Purnia, Araria, Kishanganj and Katihar can visit the clinic or follow up by video and WhatsApp." })}</p></Reveal>
        <div className="dgrid">
          {d.map(([b, en], i) => <Reveal key={en} delay={i * 0.1}><div className="dcard"><span className="pin">📍</span><h3>{b.hi}</h3><small>{en}</small></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const t = useT();
  const s: [Bi, Bi][] = [[{ hi: "बुक करें", en: "Book" }, { hi: "WhatsApp, कॉल या फ़ॉर्म से समय चुनें — क्लिनिक या वीडियो।", en: "Choose a time online or on WhatsApp — in-clinic or video." }], [{ hi: "परामर्श", en: "Consult" }, { hi: "आराम से लंबी बातचीत — सिर्फ़ लक्षण नहीं, आपके बारे में।", en: "A relaxed, in-depth conversation about you, not just symptoms." }], [{ hi: "दवा", en: "Prescribe" }, { hi: "आपकी प्रकृति के अनुसार चुनी गई व्यक्तिगत दवा और योजना।", en: "A remedy and plan individualised to your constitution." }], [{ hi: "फॉलो-अप", en: "Follow up" }, { hi: "नियमित समीक्षा से प्रगति देखी जाती है और ज़रूरत अनुसार बदलाव होते हैं।", en: "Regular reviews to track progress and adjust with care." }]];
  return (
    <section className="process" id="process">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t({ hi: "कैसे काम करता है", en: "How it works" })}</span><h2>{t({ hi: "बेहतर महसूस करने के ", en: "Four simple steps to " })}<em>{t({ hi: "चार आसान कदम", en: "feeling better" })}</em></h2><p className="lead">{t({ hi: "कोई जल्दबाज़ी नहीं, कोई कठिन शब्द नहीं — हर कदम पर साफ़ मार्गदर्शन।", en: "No rush, no jargon — just clear guidance at every stage." })}</p></Reveal>
        <div className="steps">
          {s.map(([h, p], i) => <Reveal key={h.en} delay={i * 0.12}><div className="step"><span className="n">0{i + 1}</span><h3>{t(h)}</h3><p>{t(p)}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  const t = useT();
  const d: [Bi, Bi, string][] = [[{ hi: "डॉ. नाम उपनाम", en: "Dr. Name Surname" }, { hi: "BHMS · मुख्य होम्योपैथ", en: "BHMS · Lead Homeopath" }, "#dde8d1"], [{ hi: "डॉ. नाम उपनाम", en: "Dr. Name Surname" }, { hi: "BHMS · बाल रोग देखभाल", en: "BHMS · Paediatric care" }, "#f3dcc7"], [{ hi: "डॉ. नाम उपनाम", en: "Dr. Name Surname" }, { hi: "BHMS · महिला स्वास्थ्य", en: "BHMS · Women's health" }, "#e9dfca"]];
  return (
    <section id="doctors">
      <div className="wrap">
        <div className="head"><Reveal><span className="eyebrow">{t({ hi: "हमारे चिकित्सक", en: "Our physicians" })}</span><h2>{t({ hi: "ऐसे ", en: "Care from " })}<em>{t({ hi: "लोग", en: "people" })}</em>{t({ hi: " जो आपकी सुनते हैं", en: " who listen" })}</h2></Reveal></div>
        <div className="docs">
          {d.map(([n, r, c], i) => (
            <Reveal key={i} delay={i * 0.12}><div className="doc">
              <div className="avatar" style={{ background: c }}><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18" fill="#2f4a3a" opacity=".85" /><path d="M14 100c0-26 16-40 36-40s36 14 36 40Z" fill="#2f4a3a" opacity=".85" /></svg></div>
              <h3>{t(n)}</h3><p>{t(r)}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useT();
  const q: [Bi, Bi][] = [[{ hi: "पहली बार लगा कि डॉक्टर ने सच में मेरी बात सुनी। परामर्श बिल्कुल अलग अनुभव था।", en: "I finally felt heard. The consultation was unlike anything I'd experienced before." }, { hi: "मरीज़ — असली नाम जोड़ें", en: "Patient — add real name" }], [{ hi: "बेटी की बार-बार होने वाली एलर्जी में सौम्य देखभाल मिली। फॉलो-अप भी बहुत अच्छा है।", en: "Gentle care for my daughter's recurring allergies. We love the follow-up support." }, { hi: "अभिभावक — असली नाम जोड़ें", en: "Parent — add real name" }], [{ hi: "साफ़, धैर्य से समझाने वाले और अपनापन। पूरे परिवार को HMS की सलाह दूँगा।", en: "Clear, patient and caring. I'd recommend HMS to my whole family." }, { hi: "मरीज़ — असली नाम जोड़ें", en: "Patient — add real name" }]];
  return (
    <section className="test">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t({ hi: "मरीज़ों के शब्द", en: "Kind words" })}</span><h2>{t({ hi: "परिवारों का ", en: "Families who " })}<em>{t({ hi: "भरोसा", en: "trust" })}</em>{t({ hi: "", en: " us" })}</h2></Reveal>
        <div className="tgrid" style={{ marginTop: 44 }}>
          {q.map(([x, a], i) => <Reveal key={i} delay={i * 0.12}><div className="quote"><div className="stars">★★★★★</div><p>“{t(x)}”</p><small>{t(a)}</small></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useT();
  const [o, setO] = useState<number | null>(0);
  const f: [Bi, Bi][] = [
    [{ hi: "होम्योपैथी क्या है?", en: "What is homeopathy?" }, { hi: "होम्योपैथी एक चिकित्सा पद्धति है जिसमें अत्यंत सूक्ष्म मात्रा की दवाएँ, पूरे व्यक्ति के लक्षणों के पैटर्न के अनुसार चुनी जाती हैं।", en: "Homeopathy is a system of medicine that uses highly diluted substances, selected to match the whole person's pattern of symptoms." }],
    [{ hi: "क्या यह बच्चों और गर्भावस्था में सुरक्षित है?", en: "Is it suitable for children and during pregnancy?" }, { hi: "होम्योपैथिक दवाएँ आमतौर पर सभी उम्र में दी जाती हैं। बच्चों, गर्भावस्था और स्तनपान के लिए डॉक्टर आपको व्यक्तिगत सलाह देंगे।", en: "Homeopathic remedies are commonly used for all ages. Your physician will personalise advice for children, pregnancy and breastfeeding." }],
    [{ hi: "पहला परामर्श कितना लंबा होता है?", en: "How long is the first consultation?" }, { hi: "आमतौर पर 45–60 मिनट, ताकि आपकी पूरी सेहत-कहानी और जीवनशैली समझी जा सके।", en: "Typically 45–60 minutes so we can understand your full health history and lifestyle." }],
    [{ hi: "क्या मैं अपनी मौजूदा दवाएँ जारी रख सकता/सकती हूँ?", en: "Can I continue my current medicines?" }, { hi: "कृपया डॉक्टर की सलाह के बिना कोई दवा बंद न करें। होम्योपैथी अक्सर सामान्य इलाज के साथ ली जाती है।", en: "Please do not stop prescribed medication without your doctor's advice. Homeopathy is often used alongside conventional care." }],
    [{ hi: "क्या ऑनलाइन परामर्श उपलब्ध है?", en: "Do you offer online consultations?" }, { hi: "हाँ — जो मरीज़ क्लिनिक नहीं आ सकते, उनके लिए वीडियो/WhatsApp पर फॉलो-अप उपलब्ध है।", en: "Yes — video consultations are available for follow-ups and for patients who cannot visit in person." }],
  ];
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t({ hi: "आपके सवाल", en: "Questions" })}</span><h2>{t({ hi: "जानना ", en: "Good to " })}<em>{t({ hi: "ज़रूरी", en: "know" })}</em></h2><p className="lead">{t({ hi: "जवाब नहीं मिला? WhatsApp पर पूछिए, हम खुशी से मदद करेंगे।", en: "Can't find your answer? Message us on WhatsApp and we'll be glad to help." })}</p></Reveal>
        <div>
          {f.map(([q, a], i) => (
            <div key={i} className={`q ${o === i ? "open" : ""}`}>
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i}>{t(q)}<span className="pl">+</span></button>
              <AnimatePresence initial={false}>{o === i && <motion.div className="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p>{t(a)}</p></motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  const t = useT();
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const msg = `नमस्ते HMS होम्योपैथी सेंटर, मैं अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।\nनाम: ${d.name}\nफ़ोन: ${d.phone}\nशहर/जिला: ${d.city}\nतारीख: ${d.date}\nप्रकार: ${d.type}\nसमस्या: ${d.concern || "-"}`;
    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  }
  return (
    <section className="book" id="book">
      <div className="wrap">
        <Reveal><span className="eyebrow" style={{ color: "#cfe0c2" }}>{t({ hi: "अपॉइंटमेंट बुक करें", en: "Book an appointment" })}</span><h2>{t({ hi: "अपनी ", en: "Begin your " })}<em>{t({ hi: "सेहत", en: "healing" })}</em>{t({ hi: " की यात्रा शुरू करें", en: " journey" })}</h2>
          <p className="lead">{t({ hi: "कुछ जानकारी भेजें, हम WhatsApp पर आपका समय पक्का करेंगे।", en: "Share a few details and we'll confirm your slot on WhatsApp." })}</p>
          <div className="info"><div>📍 {CLINIC.address}</div><div>📞 <a href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>{CLINIC.phone}</a></div><div>✉️ {CLINIC.email}</div><div>🕘 {t(CLINIC.hours)}</div></div></Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={submit}>
            <div className="two"><label>{t({ hi: "पूरा नाम", en: "Full name" })}<input name="name" required placeholder={t({ hi: "आपका नाम", en: "Your name" })} /></label><label>{t({ hi: "मोबाइल नंबर", en: "Phone" })}<input name="phone" required type="tel" inputMode="tel" placeholder={t({ hi: "मोबाइल नंबर", en: "Mobile number" })} /></label></div>
            <div className="two"><label>{t({ hi: "शहर / जिला", en: "Town / district" })}<select name="city"><option>पूर्णिया</option><option>अररिया</option><option>किशनगंज</option><option>कटिहार</option><option>{t({ hi: "अन्य", en: "Other" })}</option></select></label><label>{t({ hi: "पसंदीदा तारीख", en: "Preferred date" })}<input name="date" type="date" required /></label></div>
            <label>{t({ hi: "परामर्श का प्रकार", en: "Visit type" })}<select name="type"><option>{t({ hi: "क्लिनिक में", en: "In-clinic" })}</option><option>{t({ hi: "वीडियो परामर्श", en: "Video consultation" })}</option></select></label>
            <label>{t({ hi: "स्वास्थ्य समस्या (वैकल्पिक)", en: "Health concern (optional)" })}<textarea name="concern" rows={3} placeholder={t({ hi: "संक्षेप में बताएँ कि क्या तकलीफ़ है", en: "Briefly describe what brings you in" })} /></label>
            <button className="btn btn-primary" type="submit" style={{ justifyContent: "center" }}>{t({ hi: "WhatsApp पर अनुरोध भेजें →", en: "Request on WhatsApp →" })}</button>
            {sent && <div className="ok">{t({ hi: "धन्यवाद! WhatsApp में संदेश भेजकर अनुरोध पूरा करें — हम जल्द पुष्टि करेंगे।", en: "Thank you! Complete your request in WhatsApp — we'll confirm shortly." })}</div>}
            <p className="note">{t({ hi: "होम्योपैथी एक पूरक चिकित्सा पद्धति है। यह आपातकालीन या सामान्य चिकित्सा का विकल्प नहीं है।", en: "Homeopathy is a complementary approach. It is not a substitute for emergency or conventional medical care." })}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Page() {
  const [lang, setLangState] = useState<Lang>("hi");
  useEffect(() => {
    try { const l = localStorage.getItem("hms-lang"); if (l === "en" || l === "hi") setLangState(l); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem("hms-lang", l); } catch {} };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <motion.div className="progress" style={{ scaleX }} />
      <Nav /><Hero /><Marquee /><About /><Care /><Areas /><Process /><Doctors /><Testimonials /><FAQ /><Book />
      <footer><div className="wrap"><span>© {new Date().getFullYear()} HMS Homeopathy Center · {lang === "hi" ? "सीमांचल, बिहार" : "Seemanchal, Bihar"}</span><span>{lang === "hi" ? "सौम्य देखभाल · प्राकृतिक उपचार" : "Gentle care · Natural healing"}</span></div></footer>
      <a className="btn btn-call callfab" href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>📞 {lang === "hi" ? "कॉल" : "Call"}</a>
      <a className="wa" href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </LangCtx.Provider>
  );
}
