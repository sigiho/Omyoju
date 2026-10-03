import { motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { Lightbox, LightboxItem } from "../components/Lightbox";
import { PageFrame } from "../components/PageFrame";
import { fullSrc, thumbSrc, Work, works } from "../content/works";

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

const years = works.map((w) => w.year);
const firstYear = Math.min(...years);
const lastYear = Math.max(...years);

const lightboxItems: LightboxItem[] = works.map((w) => ({
  key: w.no,
  src: fullSrc(w),
  w: w.w,
  h: w.h,
  title: w.title,
  detail: `${w.size} · ${w.year}`,
  note: w.material,
}));

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
        {works.length} Works · {firstYear} — {lastYear}
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

      <Lightbox items={lightboxItems} index={active} onChange={setActive} />
    </PageFrame>
  );
};
