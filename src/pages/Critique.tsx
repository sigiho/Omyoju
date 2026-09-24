import React, { useEffect, useState } from "react";
import { Essay, EssayText, LangToggle } from "../components/Essay";
import { PageFrame } from "../components/PageFrame";
import lan from "../content/critique-lan.json";
import lee from "../content/critique-lee.json";

export const CritiqueLee: React.FC<{ path: string }> = ({ path }) => {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const text: EssayText = lee[lang];

  return (
    <PageFrame path={path} title="평론 · 이진명">
      <div className="mb-16 flex justify-center">
        <LangToggle
          options={[
            { code: "ko", label: "한국어" },
            { code: "en", label: "English" },
          ]}
          value={lang}
          onChange={(c) => setLang(c as "ko" | "en")}
        />
      </div>
      <Essay id="lee" text={text} lang={lang} fontClass={lang === "en" ? "font-serif [&_p]:text-[1.18rem]" : "font-kr"} />
    </PageFrame>
  );
};

const ZH_FONT_URL = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400&display=swap";

// 중국어 글꼴은 크기가 커서 中文 탭을 처음 열 때만 불러옵니다.
function loadChineseFont() {
  if (document.getElementById("font-zh")) return;
  const link = document.createElement("link");
  link.id = "font-zh";
  link.rel = "stylesheet";
  link.href = ZH_FONT_URL;
  document.head.appendChild(link);
}

export const CritiqueLan: React.FC<{ path: string }> = ({ path }) => {
  const [lang, setLang] = useState<"ko" | "zh">("ko");

  useEffect(() => {
    if (lang === "zh") loadChineseFont();
  }, [lang]);
  const text: EssayText = lan[lang];

  return (
    <PageFrame path={path} title="평론 · 란간우">
      <div className="mb-16 flex justify-center">
        <LangToggle
          options={[
            { code: "ko", label: "한국어" },
            { code: "zh", label: "中文" },
          ]}
          value={lang}
          onChange={(c) => setLang(c as "ko" | "zh")}
        />
      </div>
      <Essay id="lan" text={text} lang={lang === "zh" ? "zh-Hans" : "ko"} fontClass={lang === "zh" ? "font-zh [word-break:normal]" : "font-kr"} />
    </PageFrame>
  );
};
