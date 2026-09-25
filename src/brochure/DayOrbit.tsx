import logoMark from "../assets/wellsprings-logo.png";
import { IconCrop, pageSrc } from "./Piece";

const SRC = pageSrc(5);

const NODES: { id: string; label: string; ring: 1 | 2 | 3; angle: number; cx: number; cy: number }[] = [
  { id: "science", label: "Science labs", ring: 1, angle: 0, cx: 0.515, cy: 0.517 },
  { id: "library", label: "Library", ring: 1, angle: 60, cx: 0.634, cy: 0.554 },
  { id: "robotics", label: "Robotics", ring: 1, angle: 120, cx: 0.634, cy: 0.63 },
  { id: "speaking", label: "Public speaking", ring: 1, angle: 180, cx: 0.516, cy: 0.67 },
  { id: "computer", label: "Computer lab", ring: 1, angle: 240, cx: 0.398, cy: 0.63 },
  { id: "vocational", label: "Vocational", ring: 1, angle: 300, cx: 0.411, cy: 0.541 },
  { id: "art", label: "Art & craft", ring: 2, angle: 30, cx: 0.431, cy: 0.462 },
  { id: "sports", label: "10+ sports", ring: 2, angle: 90, cx: 0.622, cy: 0.469 },
  { id: "yoga", label: "Yoga", ring: 2, angle: 150, cx: 0.764, cy: 0.581 },
  { id: "music", label: "Music", ring: 2, angle: 210, cx: 0.639, cy: 0.71 },
  { id: "dance", label: "Dance", ring: 2, angle: 270, cx: 0.378, cy: 0.704 },
  { id: "theatre", label: "Theatre", ring: 2, angle: 330, cx: 0.31, cy: 0.51 },
  { id: "competitions", label: "Competitions", ring: 3, angle: 180, cx: 0.606, cy: 0.785 },
  { id: "house", label: "House events", ring: 3, angle: 252, cx: 0.207, cy: 0.693 },
  { id: "scouts", label: "Scouts & Guides", ring: 3, angle: 324, cx: 0.192, cy: 0.507 },
  { id: "clubs", label: "Clubs", ring: 3, angle: 36, cx: 0.307, cy: 0.428 },
  { id: "trips", label: "Field trips", ring: 3, angle: 108, cx: 0.793, cy: 0.464 },
];

const RADIUS: Record<1 | 2 | 3, string> = { 1: "20cqw", 2: "32cqw", 3: "42cqw" };
const DURATION: Record<1 | 2 | 3, string> = { 1: "92s", 2: "118s", 3: "146s" };

export function DayOrbit({ active }: { active: boolean }) {
  return (
    <div className="br-board absolute inset-x-[5%] top-[20%] bottom-[6%] rounded-[18px] bg-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[40cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#e07a5f]/70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[64cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#b89b3e]/75" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[84cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#3f6b45]/70" />

      <img className="br-orbit-logo" src={logoMark} alt="Wellsprings Academy" />

      {NODES.map((node) => {
        const angle = node.angle;
        return (
          <div
            key={node.id}
            className={`br-rotor ${active ? "is-spinning" : ""}`}
            style={{
              ["--start" as string]: `${angle}deg`,
              ["--dur" as string]: DURATION[node.ring],
            }}
          >
            <div
              className="br-orbit"
              style={{
                ["--r" as string]: RADIUS[node.ring],
                ["--start" as string]: `${angle}deg`,
                ["--dur" as string]: DURATION[node.ring],
              }}
            >
              <span className="br-orbit-icon">
                <IconCrop src={SRC} cx={node.cx} cy={node.cy} diameter={0.034} />
              </span>
              <span className="br-orbit-label">{node.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
