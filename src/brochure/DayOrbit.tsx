import logoMark from "../assets/wellsprings-logo.png";
import { IconCrop, pageSrc } from "./Piece";

const SRC = pageSrc(5);

const NODES: { id: string; label: string; ring: 1 | 2 | 3; angle: number; cx: number; cy: number }[] = [
  { id: "science", label: "Science labs", ring: 1, angle: 0, cx: 0.5158, cy: 0.5157 },
  { id: "library", label: "Library", ring: 1, angle: 60, cx: 0.6339, cy: 0.554 },
  { id: "robotics", label: "Robotics", ring: 1, angle: 120, cx: 0.634, cy: 0.6301 },
  { id: "speaking", label: "Public speaking", ring: 1, angle: 180, cx: 0.5158, cy: 0.6681 },
  { id: "computer", label: "Computer lab", ring: 1, angle: 240, cx: 0.3978, cy: 0.6302 },
  { id: "vocational", label: "Vocational", ring: 1, angle: 300, cx: 0.4117, cy: 0.5428 },
  { id: "art", label: "Art & craft", ring: 2, angle: 30, cx: 0.4309, cy: 0.4622 },
  { id: "sports", label: "10+ sports", ring: 2, angle: 90, cx: 0.6207, cy: 0.4668 },
  { id: "yoga", label: "Yoga", ring: 2, angle: 150, cx: 0.7631, cy: 0.5802 },
  { id: "music", label: "Music", ring: 2, angle: 210, cx: 0.6398, cy: 0.7116 },
  { id: "dance", label: "Dance", ring: 2, angle: 270, cx: 0.374, cy: 0.7054 },
  { id: "theatre", label: "Theatre", ring: 2, angle: 330, cx: 0.3128, cy: 0.5122 },
  { id: "competitions", label: "Competitions", ring: 3, angle: 180, cx: 0.6088, cy: 0.786 },
  { id: "house", label: "House events", ring: 3, angle: 252, cx: 0.2041, cy: 0.6922 },
  { id: "scouts", label: "Scouts & Guides", ring: 3, angle: 324, cx: 0.1898, cy: 0.5073 },
  { id: "clubs", label: "Clubs", ring: 3, angle: 36, cx: 0.3093, cy: 0.4278 },
  { id: "trips", label: "Field trips", ring: 3, angle: 108, cx: 0.7915, cy: 0.4632 },
];

const RADIUS: Record<1 | 2 | 3, string> = { 1: "20cqw", 2: "32cqw", 3: "42cqw" };
const DURATION: Record<1 | 2 | 3, string> = { 1: "92s", 2: "118s", 3: "146s" };

export function DayOrbit({ active }: { active: boolean }) {
  return (
    <div className="br-board">
      <div className="br-ring is-inner" />
      <div className="br-ring is-mid" />
      <div className="br-ring is-outer" />

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
                <IconCrop src={SRC} cx={node.cx} cy={node.cy} diameter={0.066} />
              </span>
              <span className="br-orbit-label">{node.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
