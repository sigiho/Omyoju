import { ArtCanvas } from "./components/ArtCanvas";
import { PhilosophySection } from "./components/PhilosophySection";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { translations, Language } from "./translations";
import { Globe } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>('ko');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const t = translations[lang];

  const languages: { code: Language; label: string }[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '简体中文' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <ArtCanvas />

      {/* Language Switcher */}
      <div className="fixed top-8 right-8 z-[100] flex items-center gap-2">
        <div className="glass-morphism rounded-full px-4 py-2 flex gap-4">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`text-[10px] uppercase tracking-widest transition-all hover:text-gold ${
                lang === l.code ? 'text-gold font-bold' : 'text-obang-white/40'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-gold">
          <Globe className="w-4 h-4" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          <motion.div
            key={lang + "title"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 blur-3xl bg-gold/20 rounded-full" />
            <span className="font-serif text-8xl md:text-[12rem] text-gold/80 leading-none tracking-tighter mix-blend-screen">
              {t.heroTitle}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={lang + "subtitle"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="font-serif text-2xl md:text-3xl text-obang-white/60 tracking-[0.3em] uppercase"
            >
              {t.heroSubtitle}
            </motion.h2>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold/40">{t.scrollEnter}</span>
            <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative">
        <PhilosophySection
          key={lang + "content"}
          title={t.sectionTitle}
          subtitle={t.sectionSubtitle}
          content={t.content}
          ttsLabels={t.ttsButton}
          lang={lang}
        />
      </section>

      {/* Footer / Closing */}
      <section className="h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center max-w-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lang + "footer"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-serif text-2xl md:text-3xl text-obang-white/40 italic mb-12"
            >
              "{t.footerQuote}"
            </motion.p>
          </AnimatePresence>
          <div className="flex justify-center gap-8">
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-obang-blue" />
            </div>
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-obang-red" />
            </div>
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-obang-yellow" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Navigation Rail */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 mix-blend-difference">
        <div className="w-px h-24 bg-white/20 mx-auto" />
        <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-white/40">
          {t.navRail}
        </span>
        <div className="w-px h-24 bg-white/20 mx-auto" />
      </div>
    </div>
  );
}
