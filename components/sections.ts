export type SectionId =
  | "intro"
  | "engineering"
  | "intelligence"
  | "automation"
  | "engagement"
  | "outro";

export type WedgeCorner = "none" | "top-right" | "top-left" | "bottom-center";
export type WedgeColor = "ember" | "flame" | "peach" | "none";

export type Section = {
  id: SectionId;
  title: string;
  tagline: string;
  image: string;
  posterImage: string;
  posterHeadline: string;
  bullets: string[];
  card: { top?: string; left?: string; right?: string; bottom?: string };
  boardTransform: string;
  wedgeCorner: WedgeCorner;
  wedgeColor: WedgeColor;
};

const BOARD_CENTER = "translate(50vw, 50dvh)";
const PLACEHOLDER = "/placeholder.svg";

export const sections: Section[] = [
  {
    id: "intro",
    title: "MAGIC INSPECTION",
    tagline: "Placeholder tagline for the company.",
    image: "",
    posterImage: PLACEHOLDER,
    posterHeadline: "",
    bullets: [],
    card: { bottom: "100%", left: "4.53%" },
    boardTransform: `${BOARD_CENTER} translate(-7.53%, 2%)`,
    wedgeCorner: "bottom-center",
    wedgeColor: "ember",
  },
  {
    id: "engineering",
    title: "Engineering",
    tagline:
      "Placeholder description for the engineering capability. Replace with real content.",
    image: PLACEHOLDER,
    posterImage: PLACEHOLDER,
    posterHeadline: "Placeholder headline for the engineering poster.",
    bullets: [
      "Placeholder bullet describing an engineering capability.",
      "Placeholder bullet describing an engineering capability.",
      "Placeholder bullet describing an engineering capability.",
      "Placeholder bullet describing an engineering capability.",
    ],
    card: { right: "92%", top: "16%" },
    boardTransform: `${BOARD_CENTER} translate(-4.75%, -18.45%)`,
    wedgeCorner: "top-right",
    wedgeColor: "flame",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    tagline:
      "Placeholder description for the intelligence capability. Replace with real content.",
    image: PLACEHOLDER,
    posterImage: PLACEHOLDER,
    posterHeadline: "Placeholder headline for the intelligence poster.",
    bullets: [
      "Placeholder bullet describing an intelligence capability.",
      "Placeholder bullet describing an intelligence capability.",
      "Placeholder bullet describing an intelligence capability.",
      "Placeholder bullet describing an intelligence capability.",
    ],
    card: { left: "13.5%", top: "38%" },
    boardTransform: `${BOARD_CENTER} translate(-16.73%, -40.6%)`,
    wedgeCorner: "top-left",
    wedgeColor: "flame",
  },
  {
    id: "automation",
    title: "Automation",
    tagline:
      "Placeholder description for the automation capability. Replace with real content.",
    image: PLACEHOLDER,
    posterImage: PLACEHOLDER,
    posterHeadline: "Placeholder headline for the automation poster.",
    bullets: [
      "Placeholder bullet describing an automation capability.",
      "Placeholder bullet describing an automation capability.",
      "Placeholder bullet describing an automation capability.",
      "Placeholder bullet describing an automation capability.",
    ],
    card: { right: "98.8%", top: "59.2%" },
    boardTransform: `${BOARD_CENTER} translate(2.05%, -61.85%)`,
    wedgeCorner: "top-right",
    wedgeColor: "peach",
  },
  {
    id: "engagement",
    title: "Engagement",
    tagline:
      "Placeholder description for the engagement capability. Replace with real content.",
    image: PLACEHOLDER,
    posterImage: PLACEHOLDER,
    posterHeadline: "Placeholder headline for the engagement poster.",
    bullets: [
      "Placeholder bullet describing an engagement capability.",
      "Placeholder bullet describing an engagement capability.",
      "Placeholder bullet describing an engagement capability.",
      "Placeholder bullet describing an engagement capability.",
    ],
    card: { left: "13%", top: "93.4%" },
    boardTransform: `${BOARD_CENTER} translate(-16.25%, -96.2%)`,
    wedgeCorner: "top-left",
    wedgeColor: "peach",
  },
  {
    id: "outro",
    title: "",
    tagline: "",
    image: "",
    posterImage: "",
    posterHeadline: "",
    bullets: [],
    card: {},
    boardTransform: `${BOARD_CENTER} translate(-45.84%, -53.8%) scale(0.13)`,
    wedgeCorner: "none",
    wedgeColor: "none",
  },
];

export type Arrow = {
  id: string;
  owner: SectionId;
  direction: "next" | "previous";
  style: React.CSSProperties;
  svgMarginTop: string;
};

export const arrows: Arrow[] = [
  {
    id: "intro-next",
    owner: "intro",
    direction: "next",
    style: { left: "6.74%", top: "0.2%", transform: "rotate(0deg)" },
    svgMarginTop: "calc(20dvh - 20%)",
  },
  {
    id: "engineering-previous",
    owner: "engineering",
    direction: "previous",
    style: { left: "6.74%", top: "4%", transform: "rotate(180deg)" },
    svgMarginTop: "calc(20dvh - 40%)",
  },
  {
    id: "engineering-next",
    owner: "engineering",
    direction: "next",
    style: { left: "8.4%", top: "16.2%", transform: "rotate(317deg)" },
    svgMarginTop: "50%",
  },
  {
    id: "intelligence-previous",
    owner: "intelligence",
    direction: "previous",
    style: { left: "12.45%", top: "28%", transform: "rotate(137.5deg)" },
    svgMarginTop: "calc(35dvh - 50%)",
  },
  {
    id: "intelligence-next",
    owner: "intelligence",
    direction: "next",
    style: { left: "12%", top: "37.1%", transform: "rotate(62deg)" },
    svgMarginTop: "95%",
  },
  {
    id: "automation-previous",
    owner: "automation",
    direction: "previous",
    style: { left: "2%", top: "51.8%", transform: "rotate(242deg)" },
    svgMarginTop: "35%",
  },
  {
    id: "automation-next",
    owner: "automation",
    direction: "next",
    style: { left: "1.9%", top: "60.2%", transform: "rotate(313deg)" },
    svgMarginTop: "32%",
  },
  {
    id: "engagement-previous",
    owner: "engagement",
    direction: "previous",
    style: { left: "11.42%", top: "84%", transform: "rotate(133deg)" },
    svgMarginTop: "calc(30dvh - 35%)",
  },
  {
    id: "engagement-next",
    owner: "engagement",
    direction: "next",
    style: { left: "14.25%", top: "81.4%", transform: "rotate(180deg)" },
    svgMarginTop: "calc(30dvh - 64%)",
  },
];
