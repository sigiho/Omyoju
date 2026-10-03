import { motion } from "motion/react";
import React, { useState } from "react";
import { Lightbox, LightboxItem } from "../components/Lightbox";
import { PageFrame } from "../components/PageFrame";
import { PLAN, spots, stairs, walls } from "../content/floorPlan";
import { fullSrc, thumbSrc, works } from "../content/works";

const entries = spots.map((spot) => ({ spot, work: works.find((w) => w.no === spot.no)! }));

const lightboxItems: LightboxItem[] = entries.map(({ spot, work }) => ({
  key: spot.no,
  src: fullSrc(work),
  w: work.w,
  h: work.h,
  title: work.title,
  detail: `${work.size} · ${work.year}`,
  note: work.material,
}));

export const FloorPlan: React.FC<{ path: string }> = ({ path }) => {
  // 도면의 번호와 목록 중 지금 가리키고 있는 위치
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const hoverProps = (n: number) => ({
    onMouseEnter: () => setHover(n),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(n),
    onBlur: () => setHover(null),
  });

  return (
    <PageFrame path={path} wide>
      <p className="-mt-6 mb-12 flex items-center justify-center gap-4 font-sans text-sm uppercase tracking-[0.3em] text-obang-white md:mb-16">
        <img src="/images/hakgojae-white.png" alt="Hakgojae Art Center" width={1000} height={347} className="h-8 w-auto" />
        <span aria-hidden>·</span>
        <span>1F</span>
      </p>

      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mx-auto max-w-5xl"
      >
        <div className="border border-white/10 bg-white/[0.02] p-5 md:p-10">
          <div className="relative" style={{ aspectRatio: `${PLAN.w} / ${PLAN.h}` }}>
            <svg viewBox={`0 0 ${PLAN.w} ${PLAN.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {stairs.map((x) => (
                <line key={x} x1={x} y1={548} x2={x} y2={PLAN.h} className="stroke-obang-white/30" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              ))}
              {walls.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-obang-white/80" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>

            {entries.map(({ spot, work }, i) => {
              const lit = hover === spot.n;
              return (
                <button
                  key={spot.n}
                  type="button"
                  onClick={() => setOpen(i)}
                  {...hoverProps(spot.n)}
                  style={{ left: `${(spot.x / PLAN.w) * 100}%`, top: `${(spot.y / PLAN.h) * 100}%` }}
                  className={`absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-sans text-[11px] leading-none tabular-nums transition-colors duration-300 md:h-9 md:w-9 md:text-sm ${
                    lit ? "border-gold bg-gold text-obang-black" : "border-gold/70 bg-obang-black text-gold hover:bg-gold hover:text-obang-black"
                  }`}
                  aria-label={`${spot.n}번 · ${work.title} 크게 보기`}
                >
                  {spot.n}
                </button>
              );
            })}
          </div>
        </div>
        <figcaption className="mt-5 text-center font-kr text-xs tracking-[0.15em] text-obang-white/50">
          번호를 누르면 작품을 크게 볼 수 있어요
        </figcaption>
      </motion.figure>

      <ol className="mx-auto mt-20 grid max-w-5xl gap-3 sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
        {entries.map(({ spot, work }, i) => {
          const lit = hover === spot.n;
          return (
            <li key={spot.n}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                {...hoverProps(spot.n)}
                className={`flex w-full items-center gap-4 border p-3 text-left transition-colors duration-300 ${
                  lit ? "border-gold/60 bg-gold/[0.06]" : "border-white/10 hover:border-gold/40"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-sans text-xs leading-none tabular-nums transition-colors duration-300 ${
                    lit ? "border-gold bg-gold text-obang-black" : "border-gold/60 text-gold"
                  }`}
                >
                  {spot.n}
                </span>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-black/40">
                  <img src={thumbSrc(work)} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[11px] uppercase tracking-[0.3em] text-gold/70">OMYOJU {work.no}</span>
                  <span className="mt-0.5 block font-kr text-[0.95rem] text-obang-white">{work.title}</span>
                  <span className="mt-0.5 block text-[11px] tracking-wide text-obang-white/50">
                    {work.size} · {work.year}
                  </span>
                  <span className="mt-0.5 block font-serif text-xs italic leading-snug text-obang-white/40">{work.material}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <Lightbox items={lightboxItems} index={open} onChange={setOpen} />
    </PageFrame>
  );
};
