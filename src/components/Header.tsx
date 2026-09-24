import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { sections } from "../lib/sections";
import { Link } from "./Link";

export const Header: React.FC<{ path: string }> = ({ path }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled || open ? "bg-obang-black/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="오묘주 홈">
            <img src="/images/logo-gold.png" alt="" className="h-12 w-12 -my-2 object-contain transition-transform duration-700 group-hover:scale-105" />
            <span className="flex flex-col leading-none">
              <span className="font-kr text-lg tracking-[0.2em] text-gold">오묘주</span>
              <span className="mt-1 font-serif text-[11px] tracking-[0.45em] text-obang-white/50">奧妙宙 · O-MYO-JU</span>
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ol className="flex items-center gap-7">
              {sections.map((s, i) => {
                const active = path === s.path;
                return (
                  <li key={s.path}>
                    <Link
                      to={s.path}
                      className={`group flex items-baseline gap-1.5 text-[13px] tracking-[0.12em] transition-colors ${
                        active ? "text-gold" : "text-obang-white/55 hover:text-obang-white"
                      }`}
                    >
                      <span className="font-serif text-[11px] text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-kr">{s.ko}</span>
                      {s.detail && <span className="font-kr text-[11px] opacity-60">{s.detail}</span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-gold transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-gold transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-obang-black/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center px-8" aria-label="모바일 메뉴">
              <ol className="space-y-6">
                {sections.map((s, i) => (
                  <motion.li
                    key={s.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1, duration: 0.6 }}
                  >
                    <Link to={s.path} className="flex items-baseline gap-4">
                      <span className="w-6 font-serif text-sm text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`font-kr text-2xl ${path === s.path ? "text-gold" : "text-obang-white/85"}`}>
                        {s.ko}
                        {s.detail && <span className="ml-2 text-base opacity-60">{s.detail}</span>}
                      </span>
                      <span className="ml-auto font-serif text-xs uppercase tracking-[0.3em] text-obang-white/30">{s.en}</span>
                    </Link>
                  </motion.li>
                ))}
              </ol>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
