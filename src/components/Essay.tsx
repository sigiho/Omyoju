import { AnimatePresence, motion } from "motion/react";
import React from "react";

export interface EssayText {
  title: string;
  byline: string;
  paragraphs: string[];
  footnotes?: string[];
}

interface LangOption {
  code: string;
  label: string;
}

/** 두 언어를 오가는 버튼. 평론 페이지에서 사용합니다. */
export const LangToggle: React.FC<{ options: LangOption[]; value: string; onChange: (code: string) => void }> = ({
  options,
  value,
  onChange,
}) => (
  <div className="glass-morphism inline-flex rounded-full p-1" role="tablist" aria-label="언어 선택">
    {options.map((o) => (
      <button
        key={o.code}
        type="button"
        role="tab"
        aria-selected={value === o.code}
        onClick={() => onChange(o.code)}
        className={`rounded-full px-5 py-2 text-xs tracking-[0.2em] transition-all duration-500 ${
          value === o.code ? "bg-gold/15 text-gold" : "text-obang-white/45 hover:text-obang-white"
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

function renderWithNotes(text: string, id: string) {
  return text.split(/(\[\^\d+\])/).map((part, i) => {
    const m = part.match(/^\[\^(\d+)\]$/);
    if (!m) return part;
    return (
      <sup key={i} className="ml-0.5 font-sans text-[0.65em] text-gold">
        <a href={`#${id}-fn-${m[1]}`} id={`${id}-ref-${m[1]}`} className="scroll-mt-32 hover:underline">
          {m[1]}
        </a>
      </sup>
    );
  });
}

interface EssayProps {
  id: string;
  text: EssayText;
  lang: string;
  fontClass?: string;
}

export const Essay: React.FC<EssayProps> = ({ id, text, lang, fontClass = "font-kr" }) => (
  <AnimatePresence mode="wait">
    <motion.article
      key={lang}
      lang={lang}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.7 }}
      className={`mx-auto max-w-[44rem] ${fontClass}`}
    >
      <h2 className="text-center text-2xl font-light leading-relaxed text-gold md:text-[1.85rem]">{text.title}</h2>
      <p className="mt-5 text-center text-sm tracking-[0.15em] text-obang-white/50">{text.byline}</p>

      <div className="relative mt-16">
        <div className="absolute -left-10 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent md:block" />
        <div className="space-y-8 text-[1.02rem] font-light leading-[2.05] text-obang-white/80 md:text-[1.08rem]">
          {text.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0 && lang === "en"
                  ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:text-gold"
                  : ""
              }
            >
              {renderWithNotes(p, id)}
            </p>
          ))}
        </div>
      </div>

      {text.footnotes && text.footnotes.length > 0 && (
        <ol className="mt-16 space-y-3 border-t border-white/10 pt-8 text-[13px] leading-relaxed text-obang-white/45">
          {text.footnotes.map((f, i) => (
            <li key={i} id={`${id}-fn-${i + 1}`} className="flex gap-3 scroll-mt-28">
              <a href={`#${id}-ref-${i + 1}`} className="shrink-0 text-gold/70 hover:text-gold">
                {i + 1}
              </a>
              <span>{f}</span>
            </li>
          ))}
        </ol>
      )}
    </motion.article>
  </AnimatePresence>
);
