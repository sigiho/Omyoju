import { motion } from "motion/react";
import { Play, Volume2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { generateSpeech } from "../services/geminiService";
import { Translation } from "../translations";

interface PhilosophySectionProps {
  title: string;
  subtitle: string;
  content: string;
  ttsLabels: Translation["ttsButton"];
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ title, subtitle, content, ttsLabels }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const [audioBuffer, setAudioBuffer] = useState<string | null>(null);

  // Pre-fetch audio when content changes
  React.useEffect(() => {
    // Stop current playback if content changes
    if (audioSource) {
      audioSource.stop();
      setIsPlaying(false);
      setAudioSource(null);
    }

    const prefetchAudio = async () => {
      setAudioBuffer(null);
      try {
        const base64 = await generateSpeech(content);
        if (base64) {
          setAudioBuffer(base64);
        }
      } catch (error) {
        console.error("Pre-fetch TTS failed:", error);
      }
    };
    prefetchAudio();

    // Cleanup on unmount
    return () => {
      if (audioSource) {
        audioSource.stop();
      }
    };
  }, [content]);

  const handlePlayTTS = async () => {
    if (isPlaying && audioSource) {
      audioSource.stop();
      setIsPlaying(false);
      return;
    }

    if (audioBuffer) {
      await playPcm(audioBuffer);
    } else {
      // Fallback if not pre-fetched yet
      setIsLoading(true);
      try {
        const base64 = await generateSpeech(content);
        if (base64) {
          setAudioBuffer(base64);
          await playPcm(base64);
        }
      } catch (error) {
        console.error("TTS failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const playPcm = async (base64: string) => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    setAudioCtx(context);
    
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const data = new Int16Array(bytes.buffer);
    const floatData = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) {
      floatData[i] = data[i] / 32768.0;
    }

    const buffer = context.createBuffer(1, floatData.length, 24000);
    buffer.getChannelData(0).set(floatData);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
    setAudioSource(source);
    setIsPlaying(true);
    source.onended = () => {
      setIsPlaying(false);
      setAudioSource(null);
    };
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

function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
}
