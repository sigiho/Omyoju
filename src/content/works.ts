export interface Work {
  no: string;
  title: string;
  size: string;
  // 재료와 연도는 전시 작품 배치표(도면_작품 배치.xlsx)를 따릅니다.
  // 배치표에 없는 11 · 14 · 15 · 17번은 파일명에 적힌 정보를 씁니다.
  material: string;
  year: number;
  // 썸네일 픽셀 크기 — 맞물림(masonry) 배치를 계산할 때 사용합니다.
  w: number;
  h: number;
  ext: "jpg" | "png";
}

export const works: Work[] = [
  { no: "01", title: "오묘주 그 너머", size: "105×105cm (70S)", material: "Korean ink, acrylic, gold leaf on canvas", year: 2026, w: 799, h: 800, ext: "jpg" },
  { no: "02", title: "빛의 귀일", size: "130×130cm (100S)", material: "Korean ink, acrylic, gold leaf on canvas", year: 2026, w: 800, h: 796, ext: "jpg" },
  { no: "03", title: "빛의 귀일", size: "130×130cm (100S)", material: "Acrylic, gold leaf on canvas", year: 2026, w: 800, h: 796, ext: "jpg" },
  { no: "04", title: "침묵의 빛", size: "130×130cm (100S)", material: "Korean ink, acrylic, gold leaf on canvas", year: 2026, w: 792, h: 800, ext: "jpg" },
  { no: "05", title: "그 너머의 빛", size: "212×149cm (150M)", material: "Korean ink, silver leaf on traditional Korean paper", year: 2022, w: 533, h: 800, ext: "jpg" },
  { no: "06", title: "고요의 빛", size: "212×149cm (150M)", material: "Korean ink, acrylic, gold leaf on traditional Korean paper", year: 2026, w: 560, h: 800, ext: "jpg" },
  { no: "07", title: "그 너머의 빛", size: "212×149cm (150M)", material: "Korean ink, acrylic, gold leaf on traditional Korean paper", year: 2026, w: 557, h: 800, ext: "jpg" },
  { no: "08", title: "빛과 색 사이", size: "91×73cm (30F)", material: "Acrylic, gold leaf on canvas", year: 2026, w: 664, h: 800, ext: "jpg" },
  { no: "09", title: "여백의 우주", size: "원형 60호", material: "Acrylic, gold leaf, silver leaf on canvas", year: 2026, w: 799, h: 800, ext: "png" },
  { no: "10", title: "빛과 색 사이", size: "91×73cm (30F)", material: "Acrylic, silver leaf on canvas", year: 2026, w: 632, h: 800, ext: "jpg" },
  { no: "11", title: "빛과 색 사이", size: "91×61cm (30M)", material: "Mixed media on canvas", year: 2026, w: 534, h: 800, ext: "jpg" },
  { no: "12", title: "오방의 숨결", size: "73×61cm (20F)", material: "Acrylic, gold leaf, silver leaf on canvas", year: 2026, w: 533, h: 800, ext: "jpg" },
  { no: "13", title: "오방의 숨결", size: "53×46cm (10F)", material: "Acrylic, gold leaf on canvas", year: 2026, w: 533, h: 800, ext: "jpg" },
  { no: "14", title: "오방의 숨결", size: "46×38cm (8F)", material: "Mixed media on canvas", year: 2026, w: 533, h: 800, ext: "jpg" },
  { no: "15", title: "오방의 숨결", size: "46×38cm (8F)", material: "Mixed media on canvas", year: 2026, w: 533, h: 800, ext: "jpg" },
  { no: "16", title: "고요의 빛", size: "46×38cm (8F)", material: "Acrylic, gold leaf on canvas", year: 2026, w: 531, h: 800, ext: "jpg" },
  { no: "17", title: "감각의 층위", size: "73×61cm (20F)", material: "Mixed media on canvas", year: 2025, w: 668, h: 800, ext: "jpg" },
];

export const thumbSrc = (w: Work) => `/works/thumb/${w.no}.${w.ext}`;
export const fullSrc = (w: Work) => `/works/${w.no}.${w.ext}`;
