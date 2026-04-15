import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Modality } from "@google/genai";

// 언어별로 음성을 캐시 — 서버 인스턴스가 살아있는 동안 유지됨
const audioCache = new Map<string, string>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "text is required" });
  }

  // 캐시에 있으면 즉시 반환
  const cached = audioCache.get(text);
  if (cached) {
    return res.status(200).json({ audio: cached });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [
        {
          parts: [
            {
              text: `Read this philosophical text with a calm, meditative, and deep tone: ${text}`,
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: "No audio generated" });
    }

    // 캐시에 저장
    audioCache.set(text, base64Audio);

    return res.status(200).json({ audio: base64Audio });
  } catch (error) {
    console.error("TTS error:", error);
    return res.status(500).json({ error: "TTS generation failed" });
  }
}
