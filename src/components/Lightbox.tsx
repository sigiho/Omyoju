import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect } from "react";

export interface LightboxItem {
  key: string;
  src: string;
  w: number;
  h: number;
  // 작품 번호 (예: OMYOJU 16) — 위쪽 순서 표시와 작품 번호가 다를 수 있어 따로 보여줍니다.
  label?: string;
  title: string;
  detail: string;
  note?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onChange: (i: number | null) => void;
}

/** 작품을 크게 보여주는 화면. 좌우 화살표와 ←/→ · Esc 키로 넘기고 닫습니다. */
export const Lightbox: React.FC<LightboxProps> = ({ items, index, onChange }) => {
  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onChange, step]);

  const item = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] flex flex-col bg-obang-black/[0.97]"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} 상세`}
          onClick={() => onChange(null)}
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-5 md:px-10 short:h-12">
            <span className="font-serif text-sm tracking-[0.3em] text-gold/70">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button type="button" className="text-3xl font-extralight text-obang-white/60 hover:text-gold" aria-label="닫기">
              ×
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.key}
                src={item.src}
                alt={item.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="max-h-full max-w-full object-contain shadow-[0_0_120px_rgba(212,175,55,0.08)]"
                style={{ aspectRatio: `${item.w} / ${item.h}` }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 p-4 text-3xl font-extralight text-obang-white/50 hover:text-gold md:left-6"
              aria-label="이전 작품"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-4 text-3xl font-extralight text-obang-white/50 hover:text-gold md:right-6"
              aria-label="다음 작품"
            >
              ›
            </button>
          </div>

          <div className="shrink-0 px-6 py-8 text-center short:py-3" onClick={(e) => e.stopPropagation()}>
            {item.label && <p className="mb-2 font-serif text-xs uppercase tracking-[0.3em] text-gold/70">{item.label}</p>}
            <p className="font-kr text-xl text-obang-white md:text-2xl">{item.title}</p>
            <p className="mt-3 font-kr text-sm text-obang-white/55">{item.detail}</p>
            {item.note && <p className="mt-1 font-serif text-sm italic text-obang-white/35 short:hidden">{item.note}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
