import { motion } from "motion/react";
import React, { useMemo } from "react";

export const ArtCanvas: React.FC = () => {
  // 페이지 이동으로 다시 렌더링될 때 빛 번짐 위치가 튀지 않도록 한 번만 계산합니다.
  const leaves = useMemo(
    () =>
      [...Array(12)].map(() => ({
        size: Math.random() * 500 + 300,
        left: Math.random() * 100,
        top: Math.random() * 100,
        dx: Math.random() * 50 - 25,
        dy: Math.random() * 50 - 25,
        duration: Math.random() * 20 + 20,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-obang-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--color-obang-blue) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0">
        {leaves.map((l, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[100px] ${i % 2 === 0 ? "gold-gradient" : "silver-gradient"}`}
            style={{ width: l.size, height: l.size, left: `${l.left}%`, top: `${l.top}%`, opacity: 0.05 }}
            animate={{ x: [0, l.dx, 0], y: [0, l.dy, 0], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: l.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[150px]"
        style={{ width: "50vw", height: "50vw" }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
