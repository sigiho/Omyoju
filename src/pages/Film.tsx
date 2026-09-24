import { motion } from "motion/react";
import React from "react";
import { PageFrame } from "../components/PageFrame";

interface Video {
  id: string;
  title: string;
  caption: React.ReactNode;
  // 세로 영상(YouTube Shorts)
  vertical?: boolean;
}

const videos: Video[] = [
  {
    id: "e5Kz0VSZwkg",
    title: "OMYOJU — Hakgojae Art Center, 2026",
    caption: (
      <span className="inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em]">
        <img src="/images/hakgojae-white.png" alt="Hakgojae Art Center" width={1000} height={347} className="h-8 w-auto" />
        <span aria-hidden>·</span>
        <span>Seoul</span>
      </span>
    ),
  },
  { id: "JgI50gyz30s", title: "OMYOJU — Zall Art Museum, China, 2026", caption: "Zall Art Museum, China · 2026", vertical: true },
];

export const Film: React.FC<{ path: string }> = ({ path }) => (
  <PageFrame path={path} wide>
    <div className="space-y-24 md:space-y-32">
      {videos.map((v, i) => (
        <motion.figure
          key={v.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: i === 0 ? 0.3 : 0 }}
          className={`relative mx-auto ${v.vertical ? "w-full max-w-[340px] md:max-w-[380px]" : "max-w-6xl"}`}
        >
          <div className="absolute inset-x-0 -inset-y-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(212_175_55/0.1),transparent_70%)]" />
          <div
            className={`relative overflow-hidden border border-gold/20 bg-black shadow-[0_0_80px_rgba(212,175,55,0.08)] ${
              v.vertical ? "aspect-[9/16]" : "aspect-video"
            }`}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
              title={v.title}
              loading={i === 0 ? undefined : "lazy"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <figcaption className="mt-6 text-center font-serif text-xs uppercase tracking-[0.4em] text-obang-white">
            {v.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </PageFrame>
);
