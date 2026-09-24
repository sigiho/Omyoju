import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { ArtCanvas } from "./components/ArtCanvas";
import { Header } from "./components/Header";
import { usePath } from "./lib/router";
import { sections } from "./lib/sections";
import { ArtistNote } from "./pages/ArtistNote";
import { CritiqueLan, CritiqueLee } from "./pages/Critique";
import { Film } from "./pages/Film";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Works } from "./pages/Works";

const pages: Record<string, React.FC<{ path: string }>> = {
  "/film": Film,
  "/critique/lee-jinmyung": CritiqueLee,
  "/critique/lan-ganwu": CritiqueLan,
  "/artist-note": ArtistNote,
  "/profile": Profile,
  "/works": Works,
};

export default function App() {
  const rawPath = usePath();
  const path = rawPath.replace(/\/+$/, "") || "/";
  const Page = pages[path];

  useEffect(() => {
    const s = sections.find((x) => x.path === path);
    document.title = s ? `${s.ko}${s.detail ? ` · ${s.detail}` : ""} — 오묘주 奧妙宙` : "오묘주 奧妙宙 — 정익현";
  }, [path]);

  return (
    <div className="relative min-h-screen">
      <ArtCanvas />
      <Header path={path} />

      {/* 이전 페이지가 사라진 뒤에 맨 위로 바로 이동합니다. 부드러운 스크롤로 긴 페이지를 거슬러 오르면 휴대폰에서 버벅입니다. */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
        <motion.main
          key={Page ? path : "/"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Page ? <Page path={path} /> : <Home />}
        </motion.main>
      </AnimatePresence>

      <footer className="relative border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/images/logo-gold.png" alt="" className="h-9 w-9 object-contain opacity-80" />
            <span className="font-kr text-xs tracking-[0.3em] text-obang-white/40">오묘주 奧妙宙 · 정익현</span>
          </div>
          <img src="/images/hakgojae.png" alt="Hakgojae Art Center" className="h-7 w-auto opacity-50 invert" />
        </div>
      </footer>
    </div>
  );
}
