import { motion } from "motion/react";
import React from "react";
import { PageFrame } from "../components/PageFrame";
import { profile } from "../content/profile";

export const Profile: React.FC<{ path: string }> = ({ path }) => (
  <PageFrame path={path} wide>
    <motion.figure
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, delay: 0.2 }}
      className="relative mx-auto max-w-6xl overflow-hidden"
    >
      <img
        src="/images/profile.jpg"
        alt="정익현 작가"
        className="aspect-[4/5] w-full object-cover object-[62%_center] sm:aspect-[3/2]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obang-black via-transparent to-transparent" />
      <figcaption className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
        <p className="font-kr text-3xl font-light tracking-[0.3em] text-obang-white md:text-5xl">{profile.name}</p>
        <p className="mt-3 font-serif text-sm uppercase tracking-[0.45em] text-gold/80 md:text-base">{profile.nameEn}</p>
      </figcaption>
    </motion.figure>

    <div className="mx-auto mt-20 grid max-w-5xl gap-14 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-20">
      <div>
        <p className="font-serif text-xs uppercase tracking-[0.5em] text-gold/70">Artist</p>
        <p className="mt-4 font-kr text-lg text-obang-white/80">{profile.role}</p>
        <div className="mt-6 h-px w-16 bg-gold/30" />
      </div>

      <div className="font-kr">
        <div className="space-y-8 text-[1.05rem] font-light leading-[2.1] text-obang-white/80">
          {profile.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="mb-6 text-sm tracking-[0.3em] text-gold/80">작품소장</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] text-obang-white/65">
            {profile.collections.map((c) => (
              <li key={c} className="flex items-center gap-6">
                {c}
              </li>
            ))}
            <li className="text-obang-white/40">외 다수</li>
          </ul>
        </div>
      </div>
    </div>
  </PageFrame>
);
