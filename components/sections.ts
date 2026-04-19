export type SectionId =
  | "intro"
  | "engineering"
  | "intelligence"
  | "automation"
  | "engagement"
  | "outro";

export type WedgeCorner = "none" | "top-right" | "top-left" | "bottom-center";
export type WedgeColor = "ember" | "flame" | "peach" | "none";

export type Position = {
  x: number;   // vw
  y: number;   // dvh
  scale: number;
};

export type Section = {
  id: SectionId;
  title: string;
  tagline: string;
  image: string;
  posterImage: string;
  posterHeadline: string;
  bullets: string[];
  position: Position;
  wedgeCorner: WedgeCorner;
  wedgeColor: WedgeColor;
};

// Each section's position is the point on the board that will be centered in
// the viewport when that section is active. Units: x in vw, y in dvh. Scale
// is applied to the whole board so each transition can zoom in or out.
//
// Path is a serpentine with alternating zoom: right/in → left/out → right/in →
// left/out → center/zoom-way-out. This gives the WayOut "travel the canvas"
// feel but differentiates by using scale changes on every step.
export const sections: Section[] = [
  {
    id: "intro",
    title: "MAGIC INSPECTION",
    tagline: "Photographic AI for cultural heritage and environment modeling.",
    image: "",
    posterImage: "/media-engineering.svg",
    posterHeadline: "",
    bullets: [],
    position: { x: 0, y: 0, scale: 1.0 },
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
    position: { x: -110, y: -160, scale: 1.0 },
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
    position: { x: -110, y: -300, scale: 0.95 },
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
    position: { x: 120, y: -450, scale: 1.08 },
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
    position: { x: -105, y: -690, scale: 0.95 },
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
    // Dramatic pull-back: board scales to 13% (matching WayOut's outro)
    // and recenters midway through the zig-zag so all sections are visible
    // at once with the logo at viewport center.
    position: { x: -20, y: -370, scale: 0.13 },
    wedgeCorner: "none",
    wedgeColor: "none",
  },
];
