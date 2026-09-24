import React from "react";

// 배경의 금빛 · 은빛 번짐. blur 필터 대신 radial-gradient만 써서 휴대폰에서도 가볍게 그려집니다.
export const ArtCanvas: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obang-black" aria-hidden>
    <div className="art-glow-base absolute inset-0" />
    <div className="art-glow-drift absolute inset-0" />
  </div>
);
