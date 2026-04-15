import { motion } from "motion/react";
import React from "react";

export const ArtCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-obang-black">
      {/* Static deep background glow to prevent flickering */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--color-obang-blue) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Logo in the background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <img 
          src="logo.png" // Ensure the file is named 'logo.png' and uploaded to the root directory
          alt="O-Myo-Ju Logo"
          className="w-[60vw] max-w-[800px] h-auto"
          referrerPolicy="no-referrer"
          onError={(e) => {
            console.warn("Logo not found at /logo.png");
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Gold and Silver "Leaves" - Slower and more subtle to prevent flickering */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[100px] ${
              i % 2 === 0 ? "gold-gradient" : "silver-gradient"
            }`}
            style={{
              width: Math.random() * 500 + 300,
              height: Math.random() * 500 + 300,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Central Light Source - Very slow pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[150px]"
        style={{ width: "50vw", height: "50vw" }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grainy texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
