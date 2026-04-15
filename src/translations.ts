export type Language = 'ko' | 'en' | 'ja' | 'zh';

export interface Translation {
  heroTitle: string;
  heroSubtitle: string;
  sectionTitle: string;
  sectionSubtitle: string;
  content: string;
  footerQuote: string;
  scrollEnter: string;
  navRail: string;
  ttsButton: {
    idle: string;
    loading: string;
    playing: string;
  };
}

export const translations: Record<Language, Translation> = {
  ko: {
    heroTitle: "奧妙宙",
    heroSubtitle: "오묘주",
    sectionTitle: "오묘주(奧妙宙) :<br />빛이 머무는 경계",
    sectionSubtitle: "그 회귀의 운동",
    content: `“색은 극에 이르러 스스로를 비우고, 형상은 가득 차 무형으로 스며든다.”

‘오묘주(奧妙宙)’는 서로 다른 빛들이 하나의 근원으로 귀일(歸一)하는 찰나를 탐구하는 나의 회화적 우주다. 나의 작업은 한국 전통의 오방색과 오간색을 현대적으로 재해석하는 지점에서 발아한다. 각기 고유한 상징과 개별성을 지닌 색들은 화면 위에서 서로를 지배하거나 배척하지 않는다. 대신 서로에게 침윤(Infiltration)하고 스며들며, 마침내 하나의 거대한 빛으로 빚어진다. 이 과정은 단순한 시각적 ‘섞임’이 아니다. ‘차이’가 소멸되는 것이 아니라, 그 다름이 온전한 조화를 이루며 공존하는 고차원적 상태의 구현이다.

여기서 ‘빛’은 단순히 시각적 결과물이 아닌, 존재를 발생시키는 근원적 에너지다. 그것은 이름 붙여지기 전의 세계, 즉 언어 이전의 순수한 상태를 암시한다. 이러한 사유는 『도덕경』이 설파하는 도(道)의 질서와 깊이 맞닿아 있다. 유와 무, 밝음과 어둠, 드러남과 숨음은 대립하는 것이 아니라 상생하는 관계다. “되돌아감이 곧 운동(反者道之動)”이라는 철학처럼, 화면 위의 모든 흐름은 결국 하나의 근원을 향해 회귀한다.

이러한 조형적 탐구는 2016년, 화면 안에 금색의 물성을 본격적으로 도입하면서부터 하나의 전환점을 맞이했다. 처음 금은 빛을 상징하는 하나의 재료적 선택이었지만, 시간이 흐르며 그것은 점차 화면의 구조를 형성하고 감각의 밀도를 조직하는 본질적 요소로 확장되었다. 이듬해부터는 금박과 은박을 화면 전면에 일정한 밀도로 축적·부착하는 텍스처 작업을 통해, 빛이 단순히 표현되는 차원을 넘어 화면 자체가 하나의 발광하는 장(場)이 되도록 하는 대형 작업으로 발전하였다.

이 과정에서 금과 은은 장식적 효과를 위한 표면이 아니라, 시간의 층위와 감각의 퇴적, 그리고 존재의 울림을 머금는 조형 언어로 자리 잡았다. 반복적이고도 수행적인 부착 행위는 물질을 화면 위에 얹는 일이자, 동시에 보이지 않는 감각과 침묵의 결을 축적하는 과정이다. 그 결과 화면은 평면의 한계를 넘어, 빛과 침묵, 물성과 무형이 공존하는 깊은 정신적 공간으로 확장되었다.

2023년 서울 초대전과 대구 전시를 거치며 나의 고유한 시각 언어이자 독자적인 작품 세계로 보다 분명하게 인식되기 시작했다. 금과 은, 색과 침묵, 전통과 현대를 하나의 화면 안에서 긴장과 조화로 통합해내는 방식은 단순한 재료의 실험을 넘어 미학적 정체성으로 자리매김하였다.

작품 속 금박과 은박은 그 전이(Transition)의 순간을 포착하는 핵심적 물성이다. 그것은 빛을 과시하기 위한 화려한 장식이 아니라, 빛이 머무는 경계이자 침묵의 표면이다. 무언가를 설명하기보다 감각하게 하고, 억지로 드러내기보다 관람자의 시선이 그 위에 머물게 하는 장치인 셈이다.

이번 작업에서 나는 평면이라는 물리적 한계를 넘어, 서로 다른 물성들이 화면 안에서 상호작용하는 유기적 결합에 집중했다. 안료의 깊은 색채와 금·은박의 이질적 성질이 충돌을 멈추고 하나의 빛으로 수렴될 때, 캔버스는 단순한 바탕을 넘어 무한한 정신적 깊이를 지닌 공간으로 확장된다. 이는 전통의 유전자가 현대적 조형 언어와 만나 새로운 생명력을 얻는 과정이기도 하다.

‘오묘주’는 특정 전통에 대한 단순한 오마주가 아니다. 동서양의 사유, 전통의 물성과 현대적 감각, 침묵과 울림이 하나의 빛 안에서 공존하는 우주관이다. 이곳에서 아름다움은 정의되지 않는다. 말해지는 순간 본래의 도를 벗어나기 때문이다.

나는 나의 회화가 만물의 회귀가 머무는 심연의 고요이자, 끝없는 사유의 장이 되기를 희망한다.`,
    footerQuote: "나는 나의 회화가 만물의 회귀가 머무는 심연의 고요이자, 끝없는 사유의 장이 되기를 희망한다.",
    scrollEnter: "아래로 스크롤하여 입장",
    navRail: "빛의 수렴",
    ttsButton: {
      idle: "작가 노트 듣기",
      loading: "침묵을 부르는 중...",
      playing: "공명 중..."
    }
  },
  en: {
    heroTitle: "奧妙宙",
    heroSubtitle: "O-Myo-Ju",
    sectionTitle: "O-Myo-Ju (奧妙宙):<br />The Boundary Where Light Lingers",
    sectionSubtitle: "The Movement of Regression",
    content: `“At its zenith, color empties itself; at its fullness, form permeates into the formless.”

‘O-Myo-Ju’ is my pictorial universe, exploring the moment when diverse lights converge into a single source. My work sprouts from the modern reinterpretation of Korea's traditional Obang-saek (five cardinal colors) and Ogan-saek (interstitial colors). Each color, possessing its own unique symbolism and individuality, does not dominate or exclude one another on the canvas. Instead, they undergo infiltration and permeate into each other, ultimately being sculpted into one colossal light. This process is not a mere visual ‘mixing.’ It is the realization of a higher-dimensional state where ‘difference’ is not extinguished but where that very alterity achieves complete harmony and coexistence.

Here, ‘light’ is not simply a visual result, but the primordial energy that brings existence into being. It alludes to a world before it is named—a pure state prior to language. Such contemplation is deeply intertwined with the order of Tao as expounded in the Tao Te Ching. Being and non-being, brightness and darkness, revealing and concealing are not in opposition but in a relationship of mutual generation. Like the philosophy that “Returning is the movement of the Tao (反者道之動),” every flow upon the canvas eventually regresses toward a single origin.

This formative exploration reached a turning point in 2016 when I began to formally introduce the materiality of gold into the frame. Initially, gold was a choice of material to symbolize light, but over time, it expanded into an essential element that forms the structure of the canvas and organizes the density of sensation. From the following year, through textural work involving the accumulation and attachment of gold and silver leaves at a consistent density across the surface, my work evolved into large-scale pieces where light transcends mere representation, and the canvas itself becomes a luminous field.

In this process, gold and silver became not decorative surfaces but a formative language that embraces layers of time, the sedimentation of senses, and the resonance of existence. The repetitive and performative act of attachment is both the laying of matter upon the canvas and the simultaneous accumulation of invisible grains of sensation and silence. As a result, the canvas extends beyond the limits of a flat surface into a deep spiritual space where light and silence, materiality and the formless, coexist.

Through an invitational exhibition in Seoul and an exhibition in Daegu in 2023, this approach began to be clearly recognized as my unique visual language and independent artistic world. The method of integrating gold and silver, color and silence, and tradition and modernity into a single frame through tension and harmony has established itself as an aesthetic identity beyond simple material experimentation.

The gold and silver leaves in the work are the core physical properties that capture that moment of transition. They are not brilliant decorations meant to flaunt light, but the boundaries where light lingers and the surfaces of silence. They serve as a device that allows the viewer to sense rather than explains, and encourages the viewer’s gaze to dwell upon them rather than forcing a revelation.

In this body of work, I focused on the organic union where different materialities interact within the frame, transcending the physical limitations of a flat plane. When the deep hues of pigment and the heterogeneous nature of gold and silver leaf cease their conflict and converge into a single light, the canvas expands beyond a mere support into a space of infinite spiritual depth. This is also the process by which the genes of tradition encounter a modern formative language and gain new vitality.

‘O-Myo-Ju’ is not a simple homage to a specific tradition. It is a worldview where Eastern and Western thought, traditional materiality and modern sensibility, and silence and resonance coexist within a single light.

Here, beauty is not defined. The moment it is spoken, it departs from the original Tao.

I hope my painting becomes the stillness of the abyss where the return of all things dwells, and a field of endless contemplation.`,
    footerQuote: "I hope my painting becomes the stillness of the abyss where the return of all things dwells, and a field of endless contemplation.",
    scrollEnter: "Scroll to Enter",
    navRail: "Convergence of Light",
    ttsButton: {
      idle: "Listen to Artist's Note",
      loading: "Invoking Silence...",
      playing: "Resonating..."
    }
  },
  ja: {
    heroTitle: "奧妙宙",
    heroSubtitle: "奥妙宙",
    sectionTitle: "奥妙宙（オミョジュ）：<br />光が留まる境界",
    sectionSubtitle: "その回帰の運動",
    content: `「色は極まりて自らを空じ、形は満ちて無形へと浸透する。」

『奥妙宙（オミョジュ）』は、異なる光が一つの根源へと帰一（きいつ）する刹那を探求する、私の絵画的宇宙である。私の作業は、韓国伝統の五方色（オバンセク）と五間色（オガンセク）を現代的に再解釈する地点から発芽する。それぞれ固有の象徴と個別性を持つ色たちは、画面の上で互いを支配したり排斥したりしない。代わりに、互いに浸透（Infiltration）し、染み込み合い、ついに一つの巨大な光へと形作られる。この過程は単なる視覚的な「混ざり合い」ではない。「差異」が消滅するのではなく、その違いが完全な調和を成して共存する、高次元な状態の具現である。

ここで「光」は単なる視覚的な結果物ではなく、存在を発生させる根源的なエネルギーである。それは名付けられる前の世界、すなわち言語以前の純粋な状態を暗示する。このような思索は、『道徳経』が説く道（タオ）の秩序と深く結びついている。有と無、明るさと暗さ、あらわになることと隠れることは、対立するのではなく相生する関係にある。「反（かえ）るは道の動（反者道之動）」という哲学のように、画面の上のすべての流れは、結局一つの根源に向かって回帰する。

このような造形的探求は、2016年に画面の中に金色の物性を本格的に導入したことから、一つの転換点を迎えた。最初、金は光を象徴する材料的選択に過ぎなかったが、時間が経つにつれ、それは次第に画面の構造を形成し、感覚の密度を組織する本質的な要素へと拡張されていった。翌年からは、金箔と銀箔を画面全面に一定の密度で積み重ねて貼り付けるテクスチャー作業を通じて、光が単なる表現の次元を超え、画面そのものが一つの発光する場となる大型作品へと発展した。

この過程で金と銀は、装飾的な効果のための表面ではなく、時間の層位と感覚の堆積、そして存在の響きを湛える造形言語として定着した。反復的かつ遂行的な貼付行為は、物質を画面の上に積み重ねる行為であると同時に、見えない感覚と沈黙の織目を蓄積していく過程でもある。その結果、画面は平面の限界を超え、光と沈黙、物性と無形が共存する深い精神的な空間へと拡張された。

2023年のソウル招待展と大邱展示を経て、私固有の視覚言語であり独立した作品世界として、より明確に認識されるようになった。金と銀、色彩と沈黙、伝統と現代を一つの画面の中で緊張と調和によって統合する方法は、単なる材料の実験を超えた美学的アイデンティティとして確立された。

作品の中の金箔と銀箔は、その転移（Transition）の瞬間を捉える核心的な物性だ。それは光を誇示するための華やかな装飾ではなく、光が留まる境界であり、沈黙の表面である。何かを説明するよりは感じさせ、無理にさらけ出すよりは観覧者の視線がその上に留まるようにする装置なのである。

今回の作業で私は、平面という物理的な限界を超え、異なる物性たちが画面の中で相互作用する有機的な結合に集中した。顔料の深い色彩と金・銀箔の異質な性質が衝突を止め、一つの光へと収束するとき、キャンバスは単なる土台を超えて、無限の精神的な深みを持つ空間へと拡張される。これは伝統の遺伝子が現代的な造形言語と出会い、新たな生命力を得る過程でもある。

「奥妙宙」は、特定の伝統に対する単純なオマージュではない。東洋と西洋の思索、伝統の物性と現代的な感覚、沈黙と響きが、一つの光の中で共存する宇宙観である。

ここにおいて、美しさは定義されない。語られた瞬間に、本来の道から外れるからだ。

私は、自分の絵画が万物の回帰が留まる深淵の静寂であり、終わりのない思索の場となることを希望する。`,
    footerQuote: "私は、自分の絵画が万物の回帰が留まる深淵の静寂であり、終わりのない思索の場となることを希望する。",
    scrollEnter: "下にスクロールして入場",
    navRail: "光の収束",
    ttsButton: {
      idle: "作家ノートを聞く",
      loading: "沈黙を呼び出し中...",
      playing: "共鳴中..."
    }
  },
  zh: {
    heroTitle: "奧妙宙",
    heroSubtitle: "奥妙宙",
    sectionTitle: "奥妙宙 (O-Myo-Ju)：<br />光停留的边界",
    sectionSubtitle: "及其回归之运动",
    content: `“色至极而自空，形至盈而入无。”

‘奥妙宙’是我的绘画宇宙，探索不同的光归一于同一根源的瞬间。我的作品萌芽于对韩国传统“五方色”与“五间色”的现代诠释。每种颜色都拥有其固有的象征与个别性，它们在画面上并不相互支配或排斥。相反，它们相互渗透 (Infiltration)，最终凝聚成一道宏大的光。这一过程并非简单的视觉“混合”，而是一种更高维度的呈现——“差异”并非消失，而是达成完美的和谐共生。

在这里，“光”不仅是视觉上的产物，更是产生存在的根源能量。它暗示着被命名之前的世界，即语言之前的纯粹状态。这种思索与《道德经》所阐述的“道”之秩序深度契合。有与无、明与暗、显与隐，并非对立，而是共生关系。正如“反者道之动”的哲学所言，画面上的一切流动最终都向着同一个根源回归。

这种造型上的探索在2016年迎来了转折点，当时我开始在画面中正式引入金色的物性。起初，金只是象征光的一种材料选择，但随着时间的推移，它逐渐扩展为构建画面结构、组织感官密度的本质要素。从次年开始，通过在画面全景以恒定密度堆积和粘贴金箔与银箔的肌理创作，我的作品发展为大型创作，使光超越了单纯的表达维度，让画面本身成为了一个发光的场。

在这一过程中，金与银不再是追求装饰效果的表面，而是成为了承载时间层级、感官沉积以及存在共鸣的造型语言。重复性且履行性的粘贴行为，既是将物质置于画面之上的工作，也是积累无形感官与沉默纹理的过程。其结果是，画面超越了平面的局限，扩展为一个光与沉默、物性与无形共存的深邃精神空间。

经过2023年的首尔个展和大邱展览，这种方式开始被更清晰地公认为我独有的视觉语言和独立的作品世界。将金与银、色彩与沉默、传统与现代在同一个画面中通过紧张与和谐进行整合的方式，已超越了简单的材料实验，确立为一种美学身份。

作品中的金箔与银箔是捕捉那一转变 (Transition) 瞬间的核心物性。它们并非为了夸耀光芒而存在的华丽装饰，而是光停留的边界，是沉默的表面。它们与其说是在解释什么，不如说是让人去感悟；与其说是强行显露，不如说是作为一种让观众的视线停留其上的装置。

在这次创作中，我专注于超越平面的物理局限，使不同的物性在画面中产生有机结合的互动。当颜料的深沉色彩与金银箔的异质属性停止冲突，聚拢为一道光时，画布便超越了单纯的底色，扩展为具有无限精神深度的空间。这也是传统的基因与现代造型语言相遇，获得新生命力的过程。

“奥妙宙”并非对特定传统的简单致敬。它是东西方思辨、传统物性与现代感官、沉默与共鸣在同一道光中共存的宇宙观。

在这里，美不被定义。因为在被言说的瞬间，便已背离了本原之“道”。

我希望我的绘画能成为万物回归所停留的深渊之静，成为一片无尽的思索之地。`,
    footerQuote: "我希望我的绘画能成为万物回归所停留的深渊之静，成为一片无尽的思索之地。",
    scrollEnter: "向下滚动进入",
    navRail: "光的汇聚",
    ttsButton: {
      idle: "聆听作家笔记",
      loading: "唤起沉默中...",
      playing: "共鸣中..."
    }
  }
};
