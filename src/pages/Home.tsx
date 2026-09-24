import { motion, useScroll, useTransform } from "motion/react";
import React from "react";
import { Link } from "../components/Link";
import { ObangDots } from "../components/PageFrame";
import { thumbSrc, works } from "../content/works";
import { sections } from "../lib/sections";

// 목차 옆에 보이는 대표 이미지
const previews = ["03", "12", "05", "09", "01", "14"].map((no) => works.find((w) => w.no === no)!);

export const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <div>
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 short:py-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative mx-auto mb-10 w-fit short:mb-4"
          >
            <div className="absolute -inset-12 bg-[radial-gradient(circle,rgb(212_175_55/0.2),transparent_65%)]" />
            <img src="/images/logo-gold.png" alt="오묘주 로고" className="relative mx-auto w-44 md:w-56 short:w-24" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="font-serif text-6xl leading-none tracking-tight text-gold/85 md:text-8xl short:text-5xl"
          >
            奧妙宙
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1 }}
            className="mt-8 font-kr text-sm short:mt-4 tracking-[0.6em] text-obang-white/60 md:text-base"
          >
            빛과 감각이 귀일하는 우주
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.4 }}
            className="mt-4 font-serif text-sm uppercase tracking-[0.5em] text-obang-white/40"
          >
            Jung Ik-hyun · 정익현
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 short:hidden"
        >
          <span className="font-serif text-[10px] uppercase tracking-[0.5em] text-gold/50">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-gold/40 to-transparent" />
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-40 pt-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="mx-auto mb-24 max-w-2xl text-center font-kr text-lg font-light italic leading-loose text-obang-white/60 md:text-xl"
        >
          “〈오묘주〉는 빛과 색, 감각과 존재가 서로를 품으며
          <br className="hidden md:block" /> 하나의 아름다움으로 귀일하는 나의 작은 우주다.”
        </motion.p>

        <ol className="border-t border-white/10">
          {sections.map((s, i) => (
            <motion.li
              key={s.path}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.06 }}
              className="border-b border-white/10"
            >
              <Link to={s.path} className="group relative flex items-center gap-5 py-7 md:gap-10 md:py-9">
                <span className="w-8 font-serif text-sm text-gold/60 md:text-base">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-kr text-xl font-light tracking-[0.1em] text-obang-white/85 transition-colors duration-500 group-hover:text-gold md:text-3xl">
                  {s.ko}
                  {s.detail && <span className="ml-3 text-base text-obang-white/45 md:text-lg">{s.detail}</span>}
                </span>
                <span className="ml-auto hidden font-serif text-sm uppercase tracking-[0.35em] text-obang-white/30 sm:block">
                  {s.en}
                </span>
                <img
                  src={thumbSrc(previews[i])}
                  alt=""
                  loading="lazy"
                  className="pointer-events-none absolute right-40 top-1/2 hidden h-28 w-20 -translate-y-1/2 rotate-3 object-cover opacity-0 shadow-2xl transition-all duration-700 group-hover:rotate-0 group-hover:opacity-100 md:block"
                />
                <span className="text-gold/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold">→</span>
              </Link>
            </motion.li>
          ))}
        </ol>

        <ObangDots className="mt-28" />
      </section>
    </div>
  );
};
