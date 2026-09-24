import React, { useState } from "react";
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

export const CritiqueLan: React.FC<{ path: string }> = ({ path }) => {
  const [lang, setLang] = useState<"ko" | "zh">("ko");
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
