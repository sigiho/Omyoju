import { motion } from "motion/react";
import { Play, Volume2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Translation } from "../translations";

interface PhilosophySectionProps {
  title: string;
  subtitle: string;
  content: string;
  ttsLabels: Translation["ttsButton"];
  lang: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ title, subtitle, content, ttsLabels, lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // 언어가 바뀌면 재생 중지
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, [lang]);

  const handlePlayTTS = async () => {
    // 재생 중이면 멈추기
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const audio = new Audio(`/audio/${lang}.mp3`);
      audioRef.current = audio;
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        console.error('오디오 재생 실패');
      };
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('재생 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-gold text-sm uppercase tracking-[0.4em] mb-4">
          {subtitle}
        </h2>
        <h1
          className="font-serif text-4xl md:text-6xl text-obang-white mb-8 tracking-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="h-px w-24 bg-gold/30 mx-auto mb-8" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayTTS}
          disabled={isLoading}
          className="mx-auto flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-gold" />
          ) : isPlaying ? (
            <Volume2 className="w-5 h-5 text-gold animate-pulse" />
          ) : (
            <Play className="w-5 h-5 text-gold group-hover:fill-gold transition-all" />
          )}
          <span className="font-serif text-gold tracking-widest uppercase text-xs">
            {isPlaying ? ttsLabels.playing : ttsLabels.idle}
          </span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block" />

        <div className="font-serif text-xl md:text-2xl leading-relaxed text-obang-white/80 space-y-8 italic">
          {content.split("\n\n").map((para, idx) => (
            <p key={idx} className="first-letter:text-4xl first-letter:text-gold first-letter:mr-2 first-letter:float-left">
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
