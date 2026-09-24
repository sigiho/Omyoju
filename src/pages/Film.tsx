import { motion } from "motion/react";
import React from "react";
import { PageFrame } from "../components/PageFrame";

const VIDEO_ID = "e5Kz0VSZwkg";

export const Film: React.FC<{ path: string }> = ({ path }) => (
  <PageFrame path={path} wide>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="relative mx-auto max-w-6xl"
    >
      <div className="absolute inset-x-0 -inset-y-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(212_175_55/0.1),transparent_70%)]" />
      <div className="relative aspect-video overflow-hidden border border-gold/20 bg-black shadow-[0_0_80px_rgba(212,175,55,0.08)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
          title="오묘주 — 정익현 작가 영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="mt-6 text-center font-serif text-xs uppercase tracking-[0.4em] text-obang-white/35">
        O-Myo-Ju · Jung Ik-hyun
      </p>
    </motion.div>
  </PageFrame>
);
