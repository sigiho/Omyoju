// 사이트에 보여지는 순서 그대로입니다.
export interface Section {
  path: string;
  ko: string;
  en: string;
  detail?: string;
}

export const sections: Section[] = [
  { path: "/film", ko: "영상", en: "Film" },
  { path: "/critique/lee-jinmyung", ko: "평론", en: "Critique", detail: "이진명" },
  { path: "/critique/lan-ganwu", ko: "평론", en: "Critique", detail: "란간우" },
  { path: "/artist-note", ko: "작가노트", en: "Artist's Note" },
  { path: "/profile", ko: "작가 프로필", en: "Profile" },
  { path: "/works", ko: "작품", en: "Works" },
];

export function sectionIndex(path: string) {
  return sections.findIndex((s) => s.path === path);
}
