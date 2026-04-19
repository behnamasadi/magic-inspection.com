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
    tagline: "Photographic AI for cultural heritage and environment modeling.",
    image: "",
    posterImage: "/media-engineering.svg",
    posterHeadline: "",
    bullets: [],
    card: { bottom: "100%", left: "4.53%" },
    boardTransform: `${BOARD_CENTER} translate(-7.53%, 2%)`,
    wedgeCorner: "bottom-center",
    wedgeColor: "ember",
  },
  {
    id: "engineering",
    title: "Field capture",
    tagline:
      "Purpose-built rigs for heritage sites and outdoor environments — handheld scanners, drone payloads, and sensor heads a single operator can deploy.",
    image: "/media-engineering.svg",
    posterImage: "/media-engineering.svg",
    posterHeadline:
      "Every site is different. We tailor the rig to the terrain, the lighting, and the surface you need to capture.",
    bullets: [
      "Work inside churches, caves, ruins, and dense urban fabric without scaffolding.",
      "Multi-sensor heads combining RGB, near-IR, thermal, and lidar for surface and subsurface context.",
      "Weather-sealed kits for campaigns in rain, dust, heat, and humidity.",
      "Lightweight enough for a single operator, rugged enough for a full field day.",
    ],
    card: { right: "92%", top: "16%" },
    boardTransform: `${BOARD_CENTER} translate(-4.75%, -18.45%)`,
    wedgeCorner: "top-right",
    wedgeColor: "flame",
  },
  {
    id: "intelligence",
    title: "3D reconstruction",
    tagline:
      "Photogrammetry and neural reconstruction that turn ordinary captures into survey-grade models — and flag what changed since the last visit.",
    image: "/media-intelligence.svg",
    posterImage: "/media-intelligence.svg",
    posterHeadline:
      "From frescoes to façades, reconstruct heritage and environment assets to millimeter precision.",
    bullets: [
      "Generate textured meshes, point clouds, and Gaussian splats from standard photo/video captures.",
      "Detect cracks, biological growth, moisture ingress, and material loss automatically.",
      "Align every new capture to a master model so change over time becomes measurable.",
      "Run on-device for rapid previews, or offload to the cloud for full-resolution outputs.",
    ],
    card: { left: "13.5%", top: "38%" },
    boardTransform: `${BOARD_CENTER} translate(-16.73%, -40.6%)`,
    wedgeCorner: "top-left",
    wedgeColor: "flame",
  },
  {
    id: "automation",
    title: "Campaign pipeline",
    tagline:
      "Batch processing for entire survey campaigns. Upload a day&apos;s footage, get models, reports, and flagged anomalies the next morning.",
    image: "/media-automation.svg",
    posterImage: "/media-automation.svg",
    posterHeadline:
      "Monitoring a monument or a landscape isn&apos;t a one-off. We turn recurring inspections into a scheduled, hands-off workflow.",
    bullets: [
      "Schedule monthly or seasonal surveys of the same site and get auto-comparisons in return.",
      "Pipeline templates tuned for heritage conservation, built-environment, and ecology work.",
      "Automatic report generation — measurements, tilt analysis, and material condition maps.",
      "Alerts when any tracked metric crosses a threshold you set.",
    ],
    card: { right: "98.8%", top: "59.2%" },
    boardTransform: `${BOARD_CENTER} translate(2.05%, -61.85%)`,
    wedgeCorner: "top-right",
    wedgeColor: "peach",
  },
  {
    id: "engagement",
    title: "Collaboration",
    tagline:
      "One platform for conservators, engineers, researchers, and stakeholders — explore, annotate, and compare surveys across years.",
    image: "/media-engagement.svg",
    posterImage: "/media-engagement.svg",
    posterHeadline:
      "Heritage and environment work spans institutions and decades. The platform is built for that timescale.",
    bullets: [
      "Browser-based viewer for 3D models, 360° photospheres, and time-lapse comparisons.",
      "Spatial annotations tied to precise coordinates for condition reports and treatment notes.",
      "Role-based access for museums, agencies, universities, and external consultants.",
      "Export to GIS, BIM, and standard conservation tool formats.",
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
