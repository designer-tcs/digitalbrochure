import type { Box, PieceKind } from "./Piece";

export type Layer = {
  box: Box;
  kind?: PieceKind;
  delay?: number;
  hover?: boolean;
};

export type Scene = {
  id: string;
  label: string;
  paper: string;
  layers: Layer[];
  orbit?: boolean;
};

const foot = (delay: number): Layer => ({ box: [0.04, 0.955, 0.92, 0.035], kind: "fade", delay });

export const SCENES: Scene[] = [
  {
    id: "cover",
    label: "Cover",
    paper: "#fbf8f3",
    layers: [
      { box: [0, 0, 1, 0.445], kind: "zoom", delay: 0 },
      { box: [0, 0.445, 1, 0.1], kind: "fade", delay: 160 },
      { box: [0, 0.545, 1, 0.085], kind: "rise", delay: 380 },
      { box: [0, 0.63, 1, 0.08], kind: "rise", delay: 540 },
      { box: [0, 0.71, 1, 0.09], kind: "rise", delay: 700 },
      { box: [0, 0.8, 1, 0.145], kind: "rise", delay: 880 },
      { box: [0, 0.945, 1, 0.055], kind: "fade", delay: 1040 },
    ],
  },
  {
    id: "welcome",
    label: "Welcome",
    paper: "#f7f3ec",
    layers: [
      { box: [0, 0, 1, 0.345], kind: "zoom", delay: 0 },
      { box: [0.06, 0.355, 0.88, 0.145], kind: "rise", delay: 120 },
      { box: [0.083, 0.456, 0.274, 0.103], kind: "rise", delay: 280, hover: true },
      { box: [0.363, 0.456, 0.274, 0.103], kind: "rise", delay: 400, hover: true },
      { box: [0.646, 0.456, 0.274, 0.103], kind: "rise", delay: 520, hover: true },
      { box: [0.06, 0.645, 0.88, 0.145], kind: "rise", delay: 740 },
      { box: [0.06, 0.8, 0.88, 0.14], kind: "rise", delay: 920 },
      foot(1040),
    ],
  },
  {
    id: "philosophy",
    label: "Think, Build, Belong",
    paper: "#f7f3ec",
    layers: [
      { box: [0.06, 0.025, 0.88, 0.15], kind: "rise", delay: 0 },
      { box: [0.08, 0.185, 0.84, 0.3], kind: "fade", delay: 180 },
      { box: [0.06, 0.137, 0.274, 0.325], kind: "mask", delay: 360, hover: true },
      { box: [0.357, 0.137, 0.274, 0.325], kind: "mask", delay: 500, hover: true },
      { box: [0.654, 0.137, 0.274, 0.325], kind: "mask", delay: 640, hover: true },
      foot(900),
    ],
  },
  {
    id: "believe",
    label: "What we believe",
    paper: "#455566",
    layers: [
      { box: [0.02, 0.01, 0.42, 0.16], kind: "quote", delay: 0 },
      { box: [0.55, 0.42, 0.42, 0.22], kind: "quote", delay: 160 },
      { box: [0.07, 0.16, 0.86, 0.44], kind: "rise", delay: 220 },
      { box: [0, 0.6, 1, 0.36], kind: "mask", delay: 520 },
      foot(800),
    ],
  },
  {
    id: "day",
    label: "Life at Wellsprings",
    paper: "#fbf7f0",
    orbit: true,
    layers: [
      { box: [0, 0, 1, 0.25], kind: "rise", delay: 0 },
      foot(400),
    ],
  },
  {
    id: "why",
    label: "Why Wellsprings",
    paper: "#f7f3ec",
    layers: [
      { box: [0, 0, 1, 0.33], kind: "zoom", delay: 0 },
      { box: [0.06, 0.34, 0.88, 0.13], kind: "rise", delay: 80 },
      { box: [0.074, 0.437, 0.42, 0.185], kind: "rise", delay: 220, hover: true },
      { box: [0.506, 0.437, 0.42, 0.185], kind: "rise", delay: 340, hover: true },
      { box: [0.074, 0.633, 0.42, 0.183], kind: "rise", delay: 460, hover: true },
      { box: [0.506, 0.633, 0.42, 0.183], kind: "rise", delay: 580, hover: true },
      { box: [0.074, 0.828, 0.851, 0.116], kind: "rise", delay: 720, hover: true },
      foot(860),
    ],
  },
  {
    id: "campus",
    label: "Campus and facilities",
    paper: "#f7f3ec",
    layers: [
      { box: [0.06, 0.02, 0.88, 0.11], kind: "rise", delay: 0 },
      { box: [0.074, 0.092, 0.417, 0.161], kind: "rise", delay: 120, hover: true },
      { box: [0.506, 0.092, 0.42, 0.161], kind: "rise", delay: 200, hover: true },
      { box: [0.074, 0.262, 0.417, 0.161], kind: "rise", delay: 280, hover: true },
      { box: [0.506, 0.262, 0.42, 0.161], kind: "rise", delay: 360, hover: true },
      { box: [0.074, 0.434, 0.417, 0.159], kind: "rise", delay: 440, hover: true },
      { box: [0.506, 0.434, 0.42, 0.159], kind: "rise", delay: 520, hover: true },
      { box: [0.074, 0.603, 0.417, 0.164], kind: "rise", delay: 600, hover: true },
      { box: [0.506, 0.603, 0.42, 0.164], kind: "rise", delay: 680, hover: true },
      { box: [0, 0.77, 1, 0.185], kind: "mask", delay: 780 },
      foot(900),
    ],
  },
  {
    id: "sports",
    label: "Sports and performing arts",
    paper: "#f7f3ec",
    layers: [
      { box: [0, 0, 1, 0.3], kind: "zoom", delay: 0 },
      { box: [0.06, 0.31, 0.55, 0.045], kind: "fade", delay: 80 },
      { box: [0.06, 0.355, 0.2, 0.05], kind: "rise", delay: 160 },
      { box: [0.26, 0.355, 0.24, 0.05], kind: "rise", delay: 280 },
      { box: [0.5, 0.355, 0.28, 0.05], kind: "rise", delay: 400 },
      { box: [0.76, 0.355, 0.2, 0.05], kind: "rise", delay: 520 },
      { box: [0.074, 0.355, 0.417, 0.204], kind: "rise", delay: 300, hover: true },
      { box: [0.506, 0.355, 0.42, 0.202], kind: "rise", delay: 400, hover: true },
      { box: [0.074, 0.567, 0.42, 0.167], kind: "rise", delay: 500, hover: true },
      { box: [0.506, 0.567, 0.42, 0.166], kind: "rise", delay: 600, hover: true },
      { box: [0.074, 0.744, 0.417, 0.183], kind: "rise", delay: 700, hover: true },
      { box: [0.509, 0.744, 0.42, 0.183], kind: "rise", delay: 800, hover: true },
      foot(920),
    ],
  },
  {
    id: "after-school",
    label: "After-school",
    paper: "#f7f3ec",
    layers: [
      { box: [0.05, 0.02, 0.9, 0.12], kind: "rise", delay: 0 },
      { box: [0, 0.145, 1, 0.077], kind: "rise", delay: 140, hover: true },
      { box: [0, 0.226, 1, 0.077], kind: "rise", delay: 280, hover: true },
      { box: [0, 0.307, 1, 0.077], kind: "rise", delay: 420, hover: true },
      { box: [0, 0.389, 1, 0.077], kind: "rise", delay: 560, hover: true },
      { box: [0, 0.471, 1, 0.076], kind: "rise", delay: 700, hover: true },
      { box: [0, 0.547, 1, 0.408], kind: "mask", delay: 860 },
      foot(1000),
    ],
  },
  {
    id: "beyond",
    label: "Beyond the classroom",
    paper: "#f7f3ec",
    layers: [
      { box: [0, 0, 1, 0.26], kind: "zoom", delay: 0 },
      { box: [0.06, 0.27, 0.88, 0.1], kind: "rise", delay: 80 },
      { box: [0.074, 0.36, 0.417, 0.174], kind: "rise", delay: 180, hover: true },
      { box: [0.506, 0.36, 0.42, 0.174], kind: "rise", delay: 280, hover: true },
      { box: [0.074, 0.545, 0.417, 0.183], kind: "rise", delay: 380, hover: true },
      { box: [0.506, 0.545, 0.42, 0.183], kind: "rise", delay: 480, hover: true },
      { box: [0.06, 0.73, 0.5, 0.03], kind: "fade", delay: 600 },
      { box: [0.073, 0.763, 0.28, 0.184], kind: "rise", delay: 680, hover: true },
      { box: [0.361, 0.763, 0.28, 0.184], kind: "rise", delay: 780, hover: true },
      { box: [0.65, 0.763, 0.28, 0.184], kind: "rise", delay: 880, hover: true },
      foot(980),
    ],
  },
  {
    id: "scouts",
    label: "Scouts and guides",
    paper: "#f7f3ec",
    layers: [
      { box: [0.06, 0.02, 0.88, 0.12], kind: "rise", delay: 0 },
      { box: [0.074, 0.124, 0.417, 0.183], kind: "rise", delay: 140, hover: true },
      { box: [0.506, 0.124, 0.42, 0.183], kind: "rise", delay: 240, hover: true },
      { box: [0.074, 0.318, 0.417, 0.183], kind: "rise", delay: 340, hover: true },
      { box: [0.506, 0.318, 0.42, 0.183], kind: "rise", delay: 440, hover: true },
      { box: [0.074, 0.513, 0.851, 0.116], kind: "rise", delay: 560, hover: true },
      { box: [0, 0.63, 1, 0.32], kind: "mask", delay: 680 },
      foot(860),
    ],
  },
  {
    id: "support",
    label: "Learning support",
    paper: "#f7f3ec",
    layers: [
      { box: [0, 0, 1, 0.3], kind: "zoom", delay: 0 },
      { box: [0.06, 0.31, 0.88, 0.12], kind: "rise", delay: 80 },
      { box: [0.073, 0.437, 0.421, 0.183], kind: "rise", delay: 220, hover: true },
      { box: [0.506, 0.437, 0.421, 0.183], kind: "rise", delay: 320, hover: true },
      { box: [0.073, 0.632, 0.42, 0.174], kind: "rise", delay: 420, hover: true },
      { box: [0.506, 0.632, 0.42, 0.174], kind: "rise", delay: 520, hover: true },
      { box: [0.074, 0.815, 0.851, 0.129], kind: "rise", delay: 660, hover: true },
      foot(800),
    ],
  },
  {
    id: "competing",
    label: "On competing",
    paper: "#e67d68",
    layers: [
      { box: [0.04, 0.02, 0.36, 0.14], kind: "quote", delay: 0 },
      { box: [0.58, 0.4, 0.38, 0.2], kind: "quote", delay: 140 },
      { box: [0.07, 0.18, 0.86, 0.4], kind: "rise", delay: 200 },
      { box: [0, 0.6, 1, 0.36], kind: "mask", delay: 480 },
      foot(760),
    ],
  },
  {
    id: "visit",
    label: "Visit us",
    paper: "#3d4c5c",
    layers: [
      { box: [0.06, 0.03, 0.88, 0.2], kind: "rise", delay: 0 },
      { box: [0.06, 0.24, 0.86, 0.1], kind: "rise", delay: 220 },
      { box: [0.06, 0.35, 0.7, 0.12], kind: "rise", delay: 400 },
      { box: [0.06, 0.48, 0.72, 0.07], kind: "rise", delay: 560 },
      { box: [0.05, 0.56, 0.9, 0.12], kind: "fade", delay: 680 },
      { box: [0.05, 0.69, 0.44, 0.1], kind: "rise", delay: 760 },
      { box: [0.51, 0.69, 0.44, 0.1], kind: "rise", delay: 840 },
      { box: [0.05, 0.8, 0.42, 0.12], kind: "rise", delay: 900 },
      { box: [0.55, 0.78, 0.4, 0.14], kind: "fade", delay: 980 },
      foot(1080),
    ],
  },
];
