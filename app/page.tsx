"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { CLINIC, CONDITIONS, BENEFITS, STEPS, STORIES, FAQS, NEARBY, type Bi } from "./content";

type Lang = "hi" | "en";
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
const useT = () => { const { lang } = useContext(LangCtx); return (b: Bi) => b[lang]; };
const ease = [0.22, 1, 0.36, 1] as const;
const tel = `tel:${CLINIC.phone.replace(/\s/g, "")}`;
const wa = (m?: string) => `https://wa.me/${CLINIC.whatsapp}${m ? `?text=${encodeURIComponent(m)}` : ""}`;

function Reveal({ children, delay = 0, y = 40, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.85, delay, ease }}>
      {children}
    </motion.div>
  );
}
const Head = ({ eyebrow, children, lead }: { eyebrow: string; children: React.ReactNode; lead?: string }) => (
  <Reveal><span className="eyebrow">{eyebrow}</span><h2>{children}</h2>{lead && <p className="lead">{lead}</p>}</Reveal>
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
    [{ hi: "तकलीफ़ें", en: "Conditions" }, "#care"], [{ hi: "फ़ायदे", en: "Benefits" }, "#benefits"],
    [{ hi: "डॉक्टर", en: "Doctor" }, "#doctor"], [{ hi: "क्लिनिक", en: "Clinic" }, "#visit"], [{ hi: "सवाल-जवाब", en: "FAQ" }, "#faq"],
  ];
  return (
    <>
      <div className="topbar"><span>📍 {t(CLINIC.town)}</span><span className="sep">·</span><span>🕘 {t(CLINIC.hours)}</span></div>
      <motion.nav className={`nav ${sc ? "scrolled" : ""}`} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
        <div className="wrap">
          <a href="#top" className="logo">
            <svg width="40" height="40" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#2f4a3a" /><path d="M50 80C32 66 28 44 50 24c22 20 18 42 0 56Z" fill="#7a9a6e" /><path d="M50 80V38" stroke="#f6f1e7" strokeWidth="3" /></svg>
            <span>HMS<small>{t({ hi: "होम्योपैथी सेंटर · बहादुरगंज", en: "Homeopathy Center · Bahadurganj" })}</small></span>
          </a>
          <div className="links">
            {items.map(([b, h]) => <a key={h} href={h} className="l">{t(b)}</a>)}
            <a href="#book" className="btn btn-primary">{t({ hi: "अपॉइंटमेंट बुक करें", en: "Book appointment" })}</a>
            <LangSwitch />
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
  const words = t({ hi: "बहादुरगंज में आपके परिवार का भरोसेमंद होम्योपैथी केंद्र", en: "Bahadurganj's trusted homeopathy center for your whole family" }).split(" ");
  const em = lang === "hi" ? [4, 5] : [2, 3];
  const chips: Bi[] = [{ hi: "बच्चे से बुज़ुर्ग तक", en: "Children to elders" }, { hi: "45+ मिनट का परामर्श", en: "45+ min consultation" }, { hi: "WhatsApp पर फॉलो-अप", en: "WhatsApp follow-ups" }, { hi: "सीमांचल के 4 जिलों से मरीज़", en: "Patients from 4 Seemanchal districts" }];
  return (
    <header className="hero" id="top">
      <div className="bgimg" style={{ backgroundImage: "url(/images/herbs3.jpg)", opacity: 0.2 }} />
      <div className="wrap">
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{t({ hi: "HMS होम्योपैथी सेंटर · किशनगंज, बिहार", en: "HMS Homeopathy Center · Kishanganj, Bihar" })}</motion.span>
          <h1>
            {words.map((w, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                <motion.span style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease }}>
                  {em.includes(i) ? <em>{w}</em> : w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
            {t({ hi: "बरसात की एलर्जी और त्वचा रोग से लेकर बच्चों की बार-बार की बीमारी और जोड़ों के दर्द तक — हम आपकी पूरी बात सुनकर सौम्य, व्यक्तिगत होम्योपैथिक इलाज देते हैं। अपने ही इलाक़े में।", en: "From monsoon allergies and skin problems to children's recurring illness and joint pain — we listen fully and offer gentle, personalised homeopathic care. Right here in your region." })}
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <a href="#book" className="btn btn-primary">{t({ hi: "अपॉइंटमेंट बुक करें →", en: "Book appointment →" })}</a>
            <a href={tel} className="btn btn-call">📞 {t({ hi: "अभी कॉल करें", en: "Call now" })}</a>
          </motion.div>
          <motion.ul className="chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            {chips.map((c) => <li key={c.en}>✓ {t(c)}</li>)}
          </motion.ul>
        </div>
        <motion.div className="photo-arch" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.4, ease }}>
          <img src="/images/consult.jpg" alt={t({ hi: "डॉक्टर मरीज़ से आराम से बात करते हुए", en: "Doctor consulting patiently with a patient" })} />
          <motion.div className="float-card fc1" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}><b>{t({ hi: "पहले सुनना", en: "Listening first" })}</b>{t({ hi: "फिर दवा चुनना", en: "then choosing the remedy" })}</motion.div>
          <motion.div className="float-card fc2" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}><b>📍 {t({ hi: "बहादुरगंज", en: "Bahadurganj" })}</b>{t({ hi: "किशनगंज, बिहार", en: "Kishanganj, Bihar" })}</motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function Marquee() {
  const t = useT();
  const row = [...NEARBY, ...NEARBY].map((x) => t(x));
  return <div className="marquee" aria-label={t({ hi: "सेवा क्षेत्र", en: "Areas we serve" })}><div className="track">{row.map((x, i) => <span key={i}>{x}</span>)}</div></div>;
}

function Conditions() {
  const t = useT();
  return (
    <section className="treat" id="care">
      <div className="bgimg" style={{ backgroundImage: "url(/images/herbs2.jpg)", opacity: 0.07 }} />
      <div className="wrap">
        <Head eyebrow={t({ hi: "सीमांचल की आम तकलीफ़ें", en: "Common health problems in Seemanchal" })} lead={t({ hi: "यहाँ की नमी, बरसात-बाढ़, खेती-मज़दूरी और पानी की स्थिति से जुड़ी ये तकलीफ़ें हमारे क्लिनिक में सबसे ज़्यादा देखी जाती हैं। होम्योपैथी इनमें सहायक देखभाल दे सकती है।", en: "These problems, linked to local humidity, monsoon floods, farm labour and water quality, are what we see most. Homeopathy can offer supportive care for them." })}>
          {t({ hi: "ये तकलीफ़ें आपके घर में भी हैं? ", en: "Do these problems sound " })}<em>{t({ hi: "हम मदद कर सकते हैं", en: "familiar? We can help" })}</em>
        </Head>
        <div className="cgrid">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.title.en} delay={(i % 3) * 0.1}>
              <article className="ccard">
                <div className="cimg"><img src={c.img} alt={t(c.title)} loading="lazy" /></div>
                <div className="cbody">
                  <h3>{t(c.title)}</h3>
                  <p className="why">{t(c.why)}</p>
                  <ul>{c.signs.map((s) => <li key={s.en}>{t(s)}</li>)}</ul>
                  <a href="#book" className="more">{t({ hi: "इसके लिए परामर्श लें →", en: "Consult for this →" })}</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="note" style={{ marginTop: 28, textAlign: "center" }}>{t({ hi: "हर व्यक्ति अलग होता है और परिणाम अलग-अलग हो सकते हैं। गंभीर या आपातकालीन स्थिति में तुरंत नज़दीकी अस्पताल जाएँ।", en: "Every person is different and results vary. In a serious or emergency situation, go to the nearest hospital immediately." })}</p>
      </div>
    </section>
  );
}

function Benefits() {
  const t = useT();
  return (
    <section className="benefits" id="benefits">
      <div className="bgimg" style={{ backgroundImage: "url(/images/herbs1.jpg)", opacity: 0.13 }} />
      <div className="wrap">
        <Head eyebrow={t({ hi: "होम्योपैथी के फ़ायदे", en: "Why homeopathy" })} lead={t({ hi: "आपके परिवार के लिए होम्योपैथी क्यों एक अच्छा विकल्प हो सकती है:", en: "Why homeopathy can be a good option for your family:" })}>
          {t({ hi: "सौम्य इलाज, ", en: "Gentle care, " })}<em>{t({ hi: "पूरे परिवार", en: "for the whole family" })}</em>{t({ hi: " के लिए", en: "" })}
        </Head>
        <div className="bgrid">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t.en} delay={(i % 3) * 0.1}>
              <div className="bcard"><span className="bn">0{i + 1}</span><h3>{t(b.t)}</h3><p>{t(b.d)}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const t = useT();
  return (
    <section className="process" id="process">
      <div className="wrap">
        <Head eyebrow={t({ hi: "कैसे काम करता है", en: "How it works" })} lead={t({ hi: "कोई जल्दबाज़ी नहीं, कोई कठिन शब्द नहीं।", en: "No rush, no jargon." })}>
          {t({ hi: "बेहतर महसूस करने के ", en: "Four simple steps to " })}<em>{t({ hi: "चार आसान कदम", en: "feeling better" })}</em>
        </Head>
        <div className="steps">
          {STEPS.map((s, i) => <Reveal key={s.t.en} delay={i * 0.12}><div className="step"><span className="n">0{i + 1}</span><h3>{t(s.t)}</h3><p>{t(s.d)}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Doctor() {
  const t = useT();
  const vals: Bi[] = [{ hi: "पहले पूरी बात सुनना, फिर दवा", en: "Listen fully, then prescribe" }, { hi: "साफ़ भाषा में समझाना — हिंदी, उर्दू या सुरजापुरी में", en: "Explain clearly — in Hindi, Urdu or Surjapuri" }, { hi: "ज़रूरत पड़े तो आधुनिक इलाज की सलाह देना", en: "Refer for conventional care whenever needed" }];
  return (
    <section id="doctor" className="doctor">
      <div className="wrap">
        <Reveal>
          <div className="dphoto"><img src="/images/consult2.jpg" alt={t({ hi: "डॉक्टर मरीज़ की रिपोर्ट देखते हुए", en: "Doctor reviewing a patient's report" })} loading="lazy" /><span className="tag">{t({ hi: "नमूना फ़ोटो — असली फ़ोटो से बदलें", en: "Sample photo — replace with real" })}</span></div>
        </Reveal>
        <div>
          <Head eyebrow={t({ hi: "हमारे चिकित्सक", en: "Meet your doctor" })}>
            {t({ hi: "अपने ही इलाक़े का ", en: "A doctor from " })}<em>{t({ hi: "अपना डॉक्टर", en: "your own region" })}</em>
          </Head>
          <Reveal delay={0.1}>
            <h3 className="dname">{t({ hi: "डॉ. [नाम यहाँ जोड़ें], BHMS", en: "Dr. [Add name], BHMS" })}</h3>
            <p className="dsub">{t({ hi: "होम्योपैथिक चिकित्सक · पंजीकरण संख्या: [जोड़ें]", en: "Homeopathic physician · Reg. No.: [add]" })}</p>
            <blockquote>
              {t({ hi: "“मेरा बचपन बहादुरगंज के पास ही बीता। मैंने देखा कि इलाज के लिए हमारे यहाँ के परिवारों को कितनी दूर जाना पड़ता है, और डॉक्टर के पास सुनने का समय कितना कम होता है। यही बात मुझे होम्योपैथी तक लाई, जहाँ मरीज़ की पूरी कहानी सुनना ही इलाज का पहला कदम है। BHMS के बाद मैंने तय किया कि अपने ही इलाक़े लौटकर HMS शुरू करूँगा, ताकि सीमांचल के परिवारों को घर के पास भरोसेमंद और बिना जल्दबाज़ी वाली होम्योपैथिक देखभाल मिल सके।”", en: "“I grew up near Bahadurganj. I saw how far families here travel for treatment, and how little time doctors have to listen. That led me to homeopathy, where hearing the patient's whole story is the first step of treatment. After BHMS I decided to return home and start HMS, so Seemanchal families get trustworthy, unhurried homeopathic care close to home.”" })}
            </blockquote>
            <p className="note">{t({ hi: "यह एक नमूना कहानी है — कृपया डॉक्टर की असली कहानी और योग्यता से बदलें।", en: "This is a sample story — please replace it with the doctor's real story and credentials." })}</p>
            <ul className="vals">{vals.map((v) => <li key={v.en}>✓ {t(v)}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const t = useT();
  return (
    <section className="test">
      <div className="wrap">
        <Head eyebrow={t({ hi: "मरीज़ों के अनुभव", en: "Patient experiences" })}>{t({ hi: "परिवारों का ", en: "Families who " })}<em>{t({ hi: "भरोसा", en: "trust" })}</em>{t({ hi: "", en: " us" })}</Head>
        <div className="tgrid">
          {STORIES.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="quote">
                <p>“{t(s.q)}”</p>
                <div className="qwho"><img src={s.img} alt="" loading="lazy" /><small>{t(s.who)}</small></div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="note" style={{ marginTop: 24, textAlign: "center" }}>{t({ hi: "ये नमूना अनुभव हैं। असली मरीज़ों की अनुमति से उनके शब्द और फ़ोटो जोड़ें।", en: "These are sample stories. Replace with real patients' words and photos, with their permission." })}</p>
      </div>
    </section>
  );
}

function Visit() {
  const t = useT();
  return (
    <section id="visit" className="visit">
      <div className="wrap">
        <div>
          <Head eyebrow={t({ hi: "हमारा क्लिनिक", en: "Visit the clinic" })} lead={t({ hi: "बहादुरगंज (किशनगंज) में स्थित। आसपास के सभी इलाक़ों से आसानी से पहुँचें।", en: "Located in Bahadurganj (Kishanganj). Easy to reach from all nearby areas." })}>
            {t({ hi: "आइए, ", en: "Come see us in " })}<em>{t({ hi: "बहादुरगंज", en: "Bahadurganj" })}</em>{t({ hi: " में मिलें", en: "" })}
          </Head>
          <Reveal delay={0.1}>
            <ul className="vinfo">
              <li><b>📍 {t({ hi: "पता", en: "Address" })}</b>{t(CLINIC.town)}<br /><small>{t(CLINIC.landmark)}</small></li>
              <li><b>🕘 {t({ hi: "समय", en: "Hours" })}</b>{t(CLINIC.hours)}</li>
              <li><b>📞 {t({ hi: "फ़ोन / WhatsApp", en: "Phone / WhatsApp" })}</b><a href={tel}>{CLINIC.phone}</a></li>
            </ul>
            <div className="cta-row"><a className="btn btn-primary" href={CLINIC.mapsLink} target="_blank" rel="noreferrer">{t({ hi: "रास्ता देखें →", en: "Get directions →" })}</a><a className="btn btn-ghost" href={wa("Hello HMS Homeopathy Center")} target="_blank" rel="noreferrer">WhatsApp</a></div>
            <p className="near">{t({ hi: "इन इलाक़ों से आते हैं मरीज़:", en: "Patients come from:" })} {NEARBY.map((n) => t(n)).join(" · ")}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="map"><iframe title="HMS Homeopathy Center, Bahadurganj, Kishanganj" src={CLINIC.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useT();
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Head eyebrow={t({ hi: "आपके सवाल", en: "Questions" })} lead={t({ hi: "जवाब नहीं मिला? WhatsApp पर पूछिए।", en: "Can't find your answer? Ask us on WhatsApp." })}>{t({ hi: "जानना ", en: "Good to " })}<em>{t({ hi: "ज़रूरी", en: "know" })}</em></Head>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} className={`q ${o === i ? "open" : ""}`}>
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i}>{t(f.q)}<span className="pl">+</span></button>
              <AnimatePresence initial={false}>{o === i && <motion.div className="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p>{t(f.a)}</p></motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  const t = useT();
  const { lang } = useContext(LangCtx);
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const msg = lang === "hi"
      ? `नमस्ते HMS होम्योपैथी सेंटर, मैं अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।\nनाम: ${d.name}\nफ़ोन: ${d.phone}\nइलाक़ा: ${d.city}\nतारीख: ${d.date}\nप्रकार: ${d.type}\nसमस्या: ${d.concern || "-"}`
      : `Hello HMS Homeopathy Center, I'd like to book an appointment.\nName: ${d.name}\nPhone: ${d.phone}\nArea: ${d.city}\nDate: ${d.date}\nType: ${d.type}\nConcern: ${d.concern || "-"}`;
    window.open(wa(msg), "_blank");
    setSent(true);
  }
  return (
    <section className="book" id="book">
      <div className="bgimg" style={{ backgroundImage: "url(/images/pills.jpg)", opacity: 0.1 }} />
      <div className="wrap">
        <Reveal>
          <span className="eyebrow" style={{ color: "#cfe0c2" }}>{t({ hi: "आज ही शुरुआत करें", en: "Start today" })}</span>
          <h2>{t({ hi: "अपनी ", en: "Begin your " })}<em>{t({ hi: "सेहत", en: "healing" })}</em>{t({ hi: " की यात्रा शुरू करें", en: " journey" })}</h2>
          <p className="lead">{t({ hi: "कुछ जानकारी भेजें, हम WhatsApp पर आपका समय पक्का करेंगे। या सीधे कॉल करें।", en: "Send a few details and we'll confirm your slot on WhatsApp. Or simply call us." })}</p>
          <div className="info"><div>📍 {t(CLINIC.town)}</div><div>📞 <a href={tel}>{CLINIC.phone}</a></div><div>🕘 {t(CLINIC.hours)}</div></div>
        </Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={submit}>
            <div className="two"><label>{t({ hi: "पूरा नाम", en: "Full name" })}<input name="name" required placeholder={t({ hi: "आपका नाम", en: "Your name" })} /></label><label>{t({ hi: "मोबाइल नंबर", en: "Phone" })}<input name="phone" required type="tel" inputMode="tel" placeholder={t({ hi: "मोबाइल नंबर", en: "Mobile number" })} /></label></div>
            <div className="two"><label>{t({ hi: "इलाक़ा", en: "Area" })}<select name="city">{NEARBY.map((n) => <option key={n.en} value={n.en}>{t(n)}</option>)}<option>{t({ hi: "अन्य", en: "Other" })}</option></select></label><label>{t({ hi: "पसंदीदा तारीख", en: "Preferred date" })}<input name="date" type="date" required /></label></div>
            <label>{t({ hi: "परामर्श का प्रकार", en: "Visit type" })}<select name="type"><option>{t({ hi: "क्लिनिक में (बहादुरगंज)", en: "In-clinic (Bahadurganj)" })}</option><option>{t({ hi: "वीडियो / WhatsApp", en: "Video / WhatsApp" })}</option></select></label>
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

const SCHEMA = {
  "@context": "https://schema.org", "@type": "MedicalClinic", name: "HMS Homeopathy Center",
  description: "Homeopathic clinic in Bahadurganj, Kishanganj, Bihar serving Seemanchal.",
  medicalSpecialty: "Homeopathy", address: { "@type": "PostalAddress", addressLocality: "Bahadurganj", addressRegion: "Bihar", addressCountry: "IN" },
  areaServed: ["Kishanganj", "Araria", "Purnia", "Katihar"],
};

export default function Page() {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => { try { const l = localStorage.getItem("hms-lang"); if (l === "en" || l === "hi") setLangState(l); } catch {} }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem("hms-lang", l); } catch {} };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const hi = lang === "hi";
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <motion.div className="progress" style={{ scaleX }} />
      <Nav /><Hero /><Marquee /><Conditions /><Benefits /><Process /><Doctor /><Stories /><Visit /><FAQ /><Book />
      <footer><div className="wrap"><span>© {new Date().getFullYear()} HMS Homeopathy Center · {hi ? "बहादुरगंज, किशनगंज, बिहार" : "Bahadurganj, Kishanganj, Bihar"}</span><span>{hi ? "तस्वीरें: Pexels" : "Photos: Pexels"}</span></div></footer>
      <div className="mbar">
        <a href={tel}>📞 {hi ? "कॉल" : "Call"}</a>
        <a href={wa("Hello HMS Homeopathy Center")} target="_blank" rel="noreferrer">💬 WhatsApp</a>
        <a href="#book" className="b">{hi ? "बुक करें" : "Book"}</a>
      </div>
    </LangCtx.Provider>
  );
}
