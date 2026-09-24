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
      <div className="mb-16 flex flex-col items-center gap-10">
        <figure className="flex items-center gap-5">
          <img
            src="/images/lan-ganwu.jpg"
            alt="란간우(兰干武) 소개"
            className="h-40 w-auto border border-white/10 object-cover opacity-90"
          />
          <figcaption className="text-left">
            <p className="font-zh text-xl text-gold">兰干武</p>
            <p className="mt-1 font-kr text-sm text-obang-white/60">란간우 · Lan Ganwu</p>
          </figcaption>
        </figure>
        <LangToggle
          options={[
            { code: "ko", label: "한국어" },
            { code: "zh", label: "中文" },
          ]}
          value={lang}
          onChange={(c) => setLang(c as "ko" | "zh")}
        />
      </div>
      <Essay id="lan" text={text} lang={lang === "zh" ? "zh-Hans" : "ko"} fontClass={lang === "zh" ? "font-zh" : "font-kr"} />
    </PageFrame>
  );
};
