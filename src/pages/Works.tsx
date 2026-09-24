import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PageFrame } from "../components/PageFrame";
import { fullSrc, mediumLabel, thumbSrc, Work, works } from "../content/works";

function useColumnCount() {
  const get = () => (window.innerWidth >= 1100 ? 3 : window.innerWidth >= 340 ? 2 : 1);
  const [n, setN] = useState(get);
  useEffect(() => {
    const onResize = () => setN(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return n;
}

// 각 작품을 그때그때 가장 짧은 열에 넣어, 세로 길이에 따라 서로 맞물리도록 배치합니다.
function distribute(items: Work[], columns: number) {
  const cols: Work[][] = Array.from({ length: columns }, () => []);
  const heights = Array(columns).fill(0);
  // 두 번째 열은 살짝 내려서 시작해 격자 느낌을 덜어냅니다.
  if (columns > 1) heights[1] = 0.35;
  items.forEach((w) => {
    const target = heights.indexOf(Math.min(...heights));
    cols[target].push(w);
    heights[target] += w.h / w.w + 0.22; // 0.22 ≈ 캡션과 간격
  });
  return cols;
}

const Caption: React.FC<{ work: Work }> = ({ work }) => (
  <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mt-4">
    <span className="font-serif text-xs text-gold/60">{work.no}</span>
    <span className="font-kr text-sm text-obang-white/85 md:text-[0.95rem]">{work.title}</span>
    <span className="w-full text-[11px] tracking-wide text-obang-white/40 md:ml-auto md:w-auto">{work.size}</span>
  </div>
);

export const Works: React.FC<{ path: string }> = ({ path }) => {
  const columns = useColumnCount();
  const cols = useMemo(() => distribute(works, columns), [columns]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <PageFrame path={path} wide>
      <p className="mx-auto -mt-8 mb-20 text-center font-serif text-sm uppercase tracking-[0.4em] text-obang-white/40">
        {works.length} Works · 2025 — 2026
      </p>

      <div className="flex items-start gap-4 md:gap-10">
        {cols.map((col, ci) => (
          <div key={ci} className={`flex min-w-0 flex-1 flex-col gap-10 md:gap-20 ${columns > 1 && ci === 1 ? "pt-20 md:pt-40" : ""}`}>
            {col.map((w) => (
              <motion.button
                key={w.no}
                type="button"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                onClick={() => setActive(works.indexOf(w))}
                className="group block w-full text-left"
                aria-label={`${w.no} ${w.title} 크게 보기`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={thumbSrc(w)}
                    alt={`${w.title}, ${w.size}`}
                    loading="lazy"
                    style={{ aspectRatio: `${w.w} / ${w.h}` }}
                    className="w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-700 group-hover:bg-gold/5" />
                </div>
                <Caption work={w} />
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      <Lightbox index={active} onChange={setActive} />
    </PageFrame>
  );
};

const Lightbox: React.FC<{ index: number | null; onChange: (i: number | null) => void }> = ({ index, onChange }) => {
  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + works.length) % works.length);
    },
    [index, onChange]
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

  const w = index === null ? null : works[index];

  return (
    <AnimatePresence>
      {w && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] flex flex-col bg-obang-black/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${w.title} 상세`}
          onClick={() => onChange(null)}
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-5 md:px-10">
            <span className="font-serif text-sm tracking-[0.3em] text-gold/70">
              {w.no} / {String(works.length).padStart(2, "0")}
            </span>
            <button type="button" className="text-3xl font-extralight text-obang-white/60 hover:text-gold" aria-label="닫기">
              ×
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <AnimatePresence mode="wait">
              <motion.img
                key={w.no}
                src={fullSrc(w)}
                alt={`${w.title}, ${w.size}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="max-h-full max-w-full object-contain shadow-[0_0_120px_rgba(212,175,55,0.08)]"
                style={{ aspectRatio: `${w.w} / ${w.h}` }}
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

          <div className="shrink-0 px-6 py-8 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-kr text-xl text-obang-white md:text-2xl">{w.title}</p>
            <p className="mt-3 font-kr text-sm text-obang-white/55">
              {mediumLabel[w.medium].ko} · {w.size}
              {w.year ? ` · ${w.year}` : ""}
            </p>
            <p className="mt-1 font-serif text-sm italic text-obang-white/35">{mediumLabel[w.medium].en}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
