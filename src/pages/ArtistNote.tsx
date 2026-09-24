import { motion } from "motion/react";
import React from "react";
import { PageFrame } from "../components/PageFrame";
import note from "../content/note.json";

export const ArtistNote: React.FC<{ path: string }> = ({ path }) => {
  const body = note.paragraphs.slice(0, -1);
  const closing = note.paragraphs[note.paragraphs.length - 1];

  return (
    <PageFrame path={path}>
      <div className="mx-auto max-w-[44rem] font-kr">
        <div className="mb-20 text-center">
          <p className="font-serif text-5xl text-gold/85 md:text-6xl">奧妙宙</p>
          <p className="mt-6 text-sm tracking-[0.5em] text-obang-white/55">{note.subtitle}</p>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent md:block" />
          <div className="space-y-10 text-[1.05rem] font-light leading-[2.15] text-obang-white/80 md:text-[1.12rem]">
            {body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="mt-24 text-center text-xl font-light italic leading-loose text-gold/90 md:text-2xl"
        >
          “{closing}”
        </motion.blockquote>
        <p className="mt-8 text-center text-sm tracking-[0.3em] text-obang-white/40">정익현</p>
      </div>
    </PageFrame>
  );
};
