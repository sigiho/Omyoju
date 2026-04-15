export async function generateSpeech(text: string): Promise<string | null> {
  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.audio || null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
}
