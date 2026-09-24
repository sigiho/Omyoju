import { motion } from "motion/react";
import React from "react";
import { sectionIndex, sections } from "../lib/sections";
import { Link } from "./Link";

export const ObangDots: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex justify-center gap-6 ${className}`} aria-hidden>
    {["bg-obang-blue", "bg-obang-red", "bg-obang-yellow", "bg-obang-white", "bg-obang-black"].map((c) => (
      <div key={c} className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20">
        <div className={`h-1.5 w-1.5 rounded-full ${c} ${c === "bg-obang-black" ? "ring-1 ring-gold/40" : ""}`} />
      </div>
    ))}
  </div>
);

interface PageFrameProps {
  path: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}

/** 각 섹션 페이지의 공통 머리말과 이전/다음 이동. */
export const PageFrame: React.FC<PageFrameProps> = ({ path, title, children, wide }) => {
  const i = sectionIndex(path);
  const s = sections[i];
  const prev = sections[i - 1];
  const next = sections[i + 1];

  return (
    <div className="pt-36 md:pt-44">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mx-auto mb-16 max-w-4xl px-6 text-center md:mb-24"
      >
        <p className="mb-5 font-serif text-xs uppercase tracking-[0.5em] text-gold/70">
          {String(i + 1).padStart(2, "0")} — {s.en}
        </p>
        <h1 className="font-kr text-3xl font-light tracking-[0.15em] text-obang-white md:text-5xl">
          {title ?? s.ko}
        </h1>
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </motion.header>

      <div className={`mx-auto px-5 md:px-10 ${wide ? "max-w-[1400px]" : "max-w-5xl"}`}>{children}</div>

      <nav className="mx-auto mt-32 max-w-5xl px-6 pb-16" aria-label="이전 · 다음">
        <ObangDots className="mb-16 opacity-80" />
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
          <div>
            <Link to={prev ? prev.path : "/"} className="group inline-flex flex-col gap-2">
              <span className="font-serif text-[11px] uppercase tracking-[0.4em] text-obang-white/35 transition-colors group-hover:text-gold">
                ← {prev ? "Prev" : "Home"}
              </span>
              <span className="font-kr text-sm text-obang-white/70 transition-colors group-hover:text-obang-white md:text-base">
                {prev ? `${prev.ko}${prev.detail ? ` · ${prev.detail}` : ""}` : "오묘주"}
              </span>
            </Link>
          </div>
          {next && (
            <div className="text-right">
              <Link to={next.path} className="group inline-flex flex-col items-end gap-2">
                <span className="font-serif text-[11px] uppercase tracking-[0.4em] text-obang-white/35 transition-colors group-hover:text-gold">
                  Next →
                </span>
                <span className="font-kr text-sm text-obang-white/70 transition-colors group-hover:text-obang-white md:text-base">
                  {next.ko}
                  {next.detail ? ` · ${next.detail}` : ""}
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
