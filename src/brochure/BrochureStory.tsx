import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DayOrbit } from "./DayOrbit";
import { pageSrc, type Box } from "./Piece";
import { SCENES, type Layer, type Scene } from "./pages";
import { VisitClose } from "./VisitClose";
import "./brochure.css";

function Veil({ layer, paper }: { layer: Layer; paper: string }) {
  const [l, t, w, h] = layer.box;
  return (
    <div
      className="br-veil"
      style={{
        left: `${l * 100}%`,
        top: `${t * 100}%`,
        width: `${w * 100}%`,
        height: `${h * 100}%`,
        background: paper,
        ["--d" as string]: `${layer.delay ?? 0}ms`,
      }}
    />
  );
}

function CardLift({ src, box }: { src: string; box: Box }) {
  const [l, t, w, h] = box;
  return (
    <div
      className="br-card"
      style={{ left: `${l * 100}%`, top: `${t * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          width: `${(1 / w) * 100}%`,
          height: `${(1 / h) * 100}%`,
          left: `${(-l / w) * 100}%`,
          top: `${(-t / h) * 100}%`,
          maxWidth: "none",
        }}
      />
    </div>
  );
}

const LAST = SCENES.length - 1;
const TURN_AT = 0.28;
const FLICK = 0.55;

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pose(progress: number, dir: 1 | -1) {
  const amount = Math.max(0, Math.min(progress, 1));
  const swing = dir * amount * 180;
  const bend = Math.sin(amount * Math.PI) * 9;
  return {
    origin: dir === 1 ? "right center" : "left center",
    transform: `rotateY(${swing}deg) rotateX(${bend}deg)`,
    shade: String(Math.sin(amount * Math.PI)),
  };
}

function ScenePage({
  scene,
  index,
  spinning,
  seen,
}: {
  scene: Scene;
  index: number;
  spinning: boolean;
  seen: boolean;
}) {
  return (
    <section
      data-scene={scene.id}
      aria-label={scene.label}
      className={`br-scene is-leaf is-in${seen ? " is-seen" : ""}`}
    >
      {scene.id === "visit" ? (
        <div className="br-stage">
          <VisitClose />
        </div>
      ) : (
        <div className="br-stage" style={{ background: scene.paper }}>
          <img className="br-base" src={pageSrc(index + 1)} alt="" draggable={false} />
          {scene.layers.map((layer, layerIndex) => (
            <Veil key={`${scene.id}-${layerIndex}`} layer={layer} paper={scene.paper} />
          ))}
          {scene.layers
            .filter((layer) => layer.hover)
            .map((layer, layerIndex) => (
              <CardLift key={`${scene.id}-card-${layerIndex}`} src={pageSrc(index + 1)} box={layer.box} />
            ))}
          {scene.orbit && <DayOrbit active={spinning} />}
        </div>
      )}
    </section>
  );
}

export function BrochureStory() {
  const leafRef = useRef<HTMLDivElement>(null);
  const castRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [under, setUnder] = useState<number | null>(null);
  const [intro, setIntro] = useState(true);
  const indexRef = useRef(0);
  const underRef = useRef<number | null>(null);
  const busy = useRef(false);
  const intent = useRef<"commit" | "cancel" | null>(null);
  const pending = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const progressRef = useRef(0);
  const queued = useRef<{ progress: number; dir: 1 | -1 } | null>(null);
  const drag = useRef<{
    x: number;
    y: number;
    t: number;
    pointerId: number;
    on: boolean;
    width: number;
  } | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const id = window.setTimeout(() => setIntro(false), 1400);
    return () => window.clearTimeout(id);
  }, []);

  useLayoutEffect(() => {
    const leaf = leafRef.current;
    if (!leaf) return;
    leaf.style.visibility = "";
    leaf.style.transition = "none";
    leaf.style.transform = "none";
    leaf.style.setProperty("--shade", "0");
    busy.current = false;
  }, [index]);

  function showUnder(next: number | null) {
    underRef.current = next;
    setUnder(next);
  }

  function apply(progress: number, dir: 1 | -1, animate: boolean) {
    const leaf = leafRef.current;
    const cast = castRef.current;
    if (!leaf) return;
    const frame = pose(progress, dir);
    leaf.style.transition = animate ? "transform 560ms cubic-bezier(0.22, 0.7, 0.2, 1)" : "none";
    leaf.style.transformOrigin = frame.origin;
    leaf.style.transform = frame.transform;
    if (cast) {
      cast.style.setProperty("--shade", frame.shade);
      cast.classList.toggle("is-next", dir === 1);
      cast.classList.toggle("is-prev", dir === -1);
    }
    leaf.style.setProperty("--shade", frame.shade);
    progressRef.current = progress;
  }

  function commit(next: number) {
    const leaf = leafRef.current;
    intent.current = null;
    queued.current = null;
    if (leaf) {
      leaf.style.visibility = "hidden";
      leaf.style.transition = "none";
      leaf.style.transform = "none";
    }
    progressRef.current = 0;
    showUnder(null);
    setIndex(next);
  }

  useEffect(() => {
    const job = queued.current;
    if (!job || under == null) return;
    queued.current = null;
    apply(job.progress, job.dir, true);
  }, [under]);

  function canTurn(dir: 1 | -1) {
    const current = indexRef.current;
    return (dir === 1 && current < LAST) || (dir === -1 && current > 0);
  }

  function track(dir: 1 | -1) {
    dirRef.current = dir;
    if (!canTurn(dir)) {
      if (underRef.current != null) showUnder(null);
      return false;
    }
    const target = indexRef.current + dir;
    if (underRef.current !== target) showUnder(target);
    return true;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || busy.current) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      t: performance.now(),
      pointerId: event.pointerId,
      on: false,
      width: leafRef.current?.getBoundingClientRect().width || 1,
    };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || start.pointerId !== event.pointerId || busy.current) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.on) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
      start.on = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const dir: 1 | -1 = dx >= 0 ? 1 : -1;
    const allowed = track(dir);
    const travel = Math.abs(dx) / start.width;
    apply(allowed ? Math.min(1, travel) : Math.min(0.1, travel * 0.3), dir, false);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    drag.current = null;
    if (!start?.on) return;
    const dx = event.clientX - start.x;
    const dt = Math.max(1, performance.now() - start.t);
    const dir: 1 | -1 = dx >= 0 ? 1 : -1;
    const allowed = canTurn(dir);
    const flicked = Math.abs(dx) > 36 && Math.abs(dx) / dt > FLICK;
    const passed = Math.abs(dx) > start.width * TURN_AT || flicked;
    if (allowed && passed && prefersStill()) {
      commit(indexRef.current + dir);
      return;
    }
    if (allowed && passed) {
      pending.current = indexRef.current + dir;
      if (progressRef.current > 0.98) {
        commit(pending.current);
        return;
      }
      busy.current = true;
      intent.current = "commit";
      dirRef.current = dir;
      if (underRef.current !== pending.current) {
        queued.current = { progress: 1, dir };
        showUnder(pending.current);
      } else {
        apply(1, dir, true);
      }
      window.setTimeout(() => {
        if (intent.current === "commit") commit(pending.current);
      }, 700);
      return;
    }
    if (Math.abs(dx) < 2) {
      apply(0, dir, false);
      showUnder(null);
      return;
    }
    busy.current = true;
    intent.current = "cancel";
    apply(0, dir, true);
  }

  function onPointerCancel() {
    if (!drag.current?.on) {
      drag.current = null;
      return;
    }
    drag.current = null;
    busy.current = true;
    intent.current = "cancel";
    apply(0, dirRef.current, true);
  }

  function onLeafEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform" || event.target !== leafRef.current) return;
    const leaf = leafRef.current;
    if (!leaf || !intent.current) return;
    if (intent.current === "commit") {
      commit(pending.current);
      return;
    }
    intent.current = null;
    showUnder(null);
    busy.current = false;
  }

  function go(target: number) {
    if (target === indexRef.current || busy.current || target < 0 || target > LAST) return;
    const dir: 1 | -1 = target > indexRef.current ? 1 : -1;
    if (prefersStill()) {
      setIndex(target);
      return;
    }
    busy.current = true;
    pending.current = target;
    intent.current = "commit";
    dirRef.current = dir;
    queued.current = { progress: 1, dir };
    showUnder(target);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") go(indexRef.current + 1);
      if (event.key === "ArrowLeft") go(indexRef.current - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const front = SCENES[index];
  const beneath = under == null ? null : SCENES[under];

  return (
    <div className="br-app">
      <div className="br-top">
        <a className="br-mark" href="https://www.wellspringsacademy.in">
          Wellsprings
        </a>
        <p className="br-kicker-site">School brochure</p>
      </div>

      <div
        className="br-deck"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className="br-turn">
          {beneath && (
            <div className="br-sheet">
              <ScenePage scene={beneath} index={under!} spinning={false} seen />
              <div ref={castRef} className={`br-cast ${dirRef.current === 1 ? "is-next" : "is-prev"}`} />
            </div>
          )}
          <div ref={leafRef} className="br-leaf" onTransitionEnd={onLeafEnd}>
            <div className="br-leaf-front">
              <ScenePage scene={front} index={index} spinning={under == null} seen={index === 0 ? !intro : true} />
              <div className="br-leaf-light" />
            </div>
            <div className="br-leaf-back" aria-hidden="true" />
          </div>
        </div>
      </div>

      <nav className="br-rail" aria-label="Brochure sections">
        {SCENES.map((scene, sceneIndex) => (
          <button
            key={scene.id}
            type="button"
            aria-label={scene.label}
            aria-current={index === sceneIndex ? "true" : undefined}
            onClick={() => go(sceneIndex)}
          />
        ))}
      </nav>
    </div>
  );
}
