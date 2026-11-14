"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

/* ---- EDIT ME: clinic details ---- */
const CLINIC = {
  phone: "+91 00000 00000",
  whatsapp: "910000000000", // country code + number, no symbols
  email: "hello@hmshomeopathy.example",
  address: "Add your clinic address here",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
};

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

function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const items = [["About", "#about"], ["Care", "#care"], ["Process", "#process"], ["Doctors", "#doctors"], ["FAQ", "#faq"]];
  return (
    <>
      <motion.nav className={`nav ${sc ? "scrolled" : ""}`} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
        <div className="wrap">
          <a href="#top" className="logo">
            <svg width="38" height="38" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#2f4a3a" /><path d="M50 80C32 66 28 44 50 24c22 20 18 42 0 56Z" fill="#7a9a6e" /><path d="M50 80V38" stroke="#f6f1e7" strokeWidth="3" /></svg>
            <span>HMS<small>Homeopathy Center</small></span>
          </a>
          <div className="links">
            {items.map(([t, h]) => <a key={t} href={h} className="l">{t}</a>)}
            <a href="#book" className="btn btn-primary">Book appointment</a>
          </div>
          <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}>☰</button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile" initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.6, ease }}>
            <button className="x" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
            {[...items, ["Book", "#book"]].map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const words = ["Healing", "that", "listens", "to", "the", "whole", "you."];
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Classical homeopathy · All ages</motion.span>
          <h1>
            {words.map((w, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                <motion.span style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.09, ease }}>
                  {i === 2 ? <em>{w}</em> : w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
            At HMS Homeopathy Center we take time to understand your story — body, mind and lifestyle — and
            prescribe gentle, individualised remedies for you and your family.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <a href="#book" className="btn btn-primary">Book a consultation →</a>
            <a href="#care" className="btn btn-ghost">Explore our care</a>
          </motion.div>
          <motion.div className="trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
            <div><Counter to={15} suffix="+" /><span>Years of practice</span></div>
            <div><Counter to={12000} suffix="+" /><span>Consultations</span></div>
            <div><Counter to={98} suffix="%" /><span>Patients return</span></div>
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
          <motion.div className="float-card fc1" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}><span className="ic">🌿</span><div><b>Natural remedies</b>Gentle &amp; non-toxic</div></motion.div>
          <motion.div className="float-card fc2" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}><span className="ic">💚</span><div><b>Whole-person care</b>Body · mind · life</div></motion.div>
        </motion.div>
      </div>
      <motion.div className="leaf" style={{ left: "46%", top: "14%" }} animate={{ rotate: [0, 12, 0], y: [0, -12, 0] }} transition={{ duration: 8, repeat: Infinity }}><Leaf r={-20} /></motion.div>
    </header>
  );
}

function Marquee() {
  const t = ["Individualised remedies", "Unhurried consultations", "Safe for children", "Chronic & acute care", "Whole-person approach", "Women's & family health"];
  const row = [...t, ...t];
  return <div className="marquee" aria-hidden><div className="track">{row.map((x, i) => <span key={i}>{x}</span>)}</div></div>;
}

function About() {
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
          <Reveal><span className="eyebrow">About HMS</span><h2>A calmer, more <em>personal</em> way to heal</h2>
            <p className="lead">Homeopathy treats the person, not just the diagnosis. Every consultation at HMS is unhurried, so your remedy fits you — your symptoms, temperament, sleep, digestion and stress.</p></Reveal>
          <div className="pillars">
            {[["🔍", "Deep case-taking", "A detailed first visit to understand your complete health story."], ["🌱", "Gentle remedies", "Highly diluted medicines, suitable for infants to seniors."], ["🤝", "Ongoing partnership", "Regular follow-ups to track progress and refine your plan."]].map(([i, h, p], k) => (
              <Reveal key={h} delay={k * 0.12} y={24}><div className="pillar"><i>{i}</i><div><h3>{h}</h3><p>{p}</p></div></div></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CARE = [
  ["🧒", "Child & infant health", "Recurrent colds, allergies, digestion and growth support, gently."],
  ["🌸", "Women's health", "Hormonal balance, cycles, PCOS support and wellbeing through life stages."],
  ["🧴", "Skin & hair", "Eczema, acne, psoriasis and hair concerns from the inside out."],
  ["🫁", "Allergy & respiratory", "Seasonal allergies, sinus troubles and recurring cough or asthma care."],
  ["🍃", "Digestive health", "Acidity, IBS, constipation and food sensitivities."],
  ["🧠", "Stress & sleep", "Anxiety, low mood, burnout and restless nights, with compassionate support."],
];
function Care() {
  return (
    <section className="treat" id="care">
      <div className="wrap">
        <div className="head"><Reveal><span className="eyebrow">Areas of care</span><h2>Support for the whole <em>family</em></h2></Reveal>
          <Reveal delay={0.1}><p className="lead">Homeopathy can complement your overall healthcare. Always tell us about any ongoing treatment.</p></Reveal></div>
        <div className="grid">
          {CARE.map(([e, h, p], i) => (
            <Reveal key={h} delay={(i % 3) * 0.1}><div className="card"><span className="em">{e}</span><h3>{h}</h3><p>{p}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const s = [["Book", "Choose a time online or on WhatsApp — in-clinic or video."], ["Consult", "A relaxed, in-depth conversation about you, not just symptoms."], ["Prescribe", "A remedy and plan individualised to your constitution."], ["Follow up", "Regular reviews to track progress and adjust with care."]];
  return (
    <section className="process" id="process">
      <div className="wrap">
        <Reveal><span className="eyebrow">How it works</span><h2>Four simple steps to <em>feeling better</em></h2><p className="lead">No rush, no jargon — just clear guidance at every stage.</p></Reveal>
        <div className="steps">
          {s.map(([h, p], i) => <Reveal key={h} delay={i * 0.12}><div className="step"><span className="n">0{i + 1}</span><h3>{h}</h3><p>{p}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  const d = [["Dr. Name Surname", "BHMS · Lead Homeopath", "#dde8d1"], ["Dr. Name Surname", "BHMS, MD (Hom) · Paediatric care", "#f3dcc7"], ["Dr. Name Surname", "BHMS · Women's health", "#e9dfca"]];
  return (
    <section id="doctors">
      <div className="wrap">
        <div className="head"><Reveal><span className="eyebrow">Our physicians</span><h2>Care from <em>people</em> who listen</h2></Reveal></div>
        <div className="docs">
          {d.map(([n, r, c], i) => (
            <Reveal key={i} delay={i * 0.12}><div className="doc">
              <div className="avatar" style={{ background: c }}><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18" fill="#2f4a3a" opacity=".85" /><path d="M14 100c0-26 16-40 36-40s36 14 36 40Z" fill="#2f4a3a" opacity=".85" /></svg></div>
              <h3>{n}</h3><p>{r}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [["I finally felt heard. The consultation was unlike anything I'd experienced before.", "Patient — add real name"], ["Gentle care for my daughter's recurring allergies. We love the follow-up support.", "Parent — add real name"], ["Clear, patient and caring. I'd recommend HMS to my whole family.", "Patient — add real name"]];
  return (
    <section className="test">
      <div className="wrap">
        <Reveal><span className="eyebrow">Kind words</span><h2>Families who <em>trust</em> us</h2></Reveal>
        <div className="tgrid" style={{ marginTop: 44 }}>
          {t.map(([q, a], i) => <Reveal key={i} delay={i * 0.12}><div className="quote"><div className="stars">★★★★★</div><p>“{q}”</p><small>{a}</small></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [o, setO] = useState<number | null>(0);
  const f = [["What is homeopathy?", "Homeopathy is a system of medicine that uses highly diluted substances, selected to match the whole person's pattern of symptoms."], ["Is it suitable for children and during pregnancy?", "Homeopathic remedies are commonly used for all ages. Your physician will personalise advice for children, pregnancy and breastfeeding."], ["How long is the first consultation?", "Typically 45–60 minutes so we can understand your full health history and lifestyle."], ["Can I continue my current medicines?", "Please do not stop prescribed medication without your doctor's advice. Homeopathy is often used alongside conventional care."], ["Do you offer online consultations?", "Yes — video consultations are available for follow-ups and for patients who cannot visit in person."]];
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Reveal><span className="eyebrow">Questions</span><h2>Good to <em>know</em></h2><p className="lead">Can't find your answer? Message us on WhatsApp and we'll be glad to help.</p></Reveal>
        <div>
          {f.map(([q, a], i) => (
            <div key={i} className={`q ${o === i ? "open" : ""}`}>
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i}>{q}<span className="pl">+</span></button>
              <AnimatePresence initial={false}>{o === i && <motion.div className="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p>{a}</p></motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const msg = `Hello HMS Homeopathy Center, I'd like to book an appointment.\nName: ${d.name}\nPhone: ${d.phone}\nPreferred date: ${d.date}\nType: ${d.type}\nConcern: ${d.concern || "-"}`;
    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  }
  return (
    <section className="book" id="book">
      <div className="wrap">
        <Reveal><span className="eyebrow" style={{ color: "#cfe0c2" }}>Book an appointment</span><h2>Begin your <em>healing</em> journey</h2>
          <p className="lead">Share a few details and we'll confirm your slot on WhatsApp.</p>
          <div className="info"><div>📍 {CLINIC.address}</div><div>📞 {CLINIC.phone}</div><div>✉️ {CLINIC.email}</div><div>🕘 {CLINIC.hours}</div></div></Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={submit}>
            <div className="two"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required type="tel" placeholder="Mobile number" /></label></div>
            <div className="two"><label>Preferred date<input name="date" type="date" required /></label><label>Visit type<select name="type"><option>In-clinic</option><option>Video consultation</option></select></label></div>
            <label>Health concern (optional)<textarea name="concern" rows={3} placeholder="Briefly describe what brings you in" /></label>
            <button className="btn btn-primary" type="submit" style={{ justifyContent: "center" }}>Request appointment →</button>
            {sent && <div className="ok">Thank you! Complete your request in WhatsApp — we'll confirm shortly.</div>}
            <p className="note">Homeopathy is a complementary approach. It is not a substitute for emergency or conventional medical care.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Nav /><Hero /><Marquee /><About /><Care /><Process /><Doctors /><Testimonials /><FAQ /><Book />
      <footer><div className="wrap"><span>© {new Date().getFullYear()} HMS Homeopathy Center. All rights reserved.</span><span>Gentle care · Natural healing</span></div></footer>
      <a className="wa" href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}
