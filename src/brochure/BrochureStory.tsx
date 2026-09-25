import { useEffect, useRef, useState } from "react";
import { DayOrbit } from "./DayOrbit";
import { pageSrc, type Box } from "./Piece";
import { SCENES, type Layer } from "./pages";
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

export function BrochureStory() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const scenes = [...root.querySelectorAll<HTMLElement>("[data-scene]")];
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { root, threshold: 0.42 },
    );
    const watch = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = scenes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { root, threshold: [0.45, 0.7] },
    );
    scenes.forEach((scene) => {
      reveal.observe(scene);
      watch.observe(scene);
    });
    return () => {
      reveal.disconnect();
      watch.disconnect();
    };
  }, []);

  function go(index: number) {
    const root = scroller.current;
    const scene = root?.querySelectorAll<HTMLElement>("[data-scene]")[index];
    scene?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="br-app">
      <div className="br-top">
        <a className="br-mark" href="https://www.wellspringsacademy.in">
          Wellsprings
        </a>
        <p className="br-kicker-site">School brochure</p>
      </div>

      <div ref={scroller} className="br-scroll">
        {SCENES.map((scene, index) => (
          <section
            key={scene.id}
            data-scene={scene.id}
            aria-label={scene.label}
            className="br-scene"
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
                {scene.orbit && <DayOrbit active={active === index} />}
              </div>
            )}
          </section>
        ))}
      </div>

      <nav className="br-rail" aria-label="Brochure sections">
        {SCENES.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            aria-label={scene.label}
            aria-current={active === index ? "true" : undefined}
            onClick={() => go(index)}
          />
        ))}
      </nav>
    </div>
  );
}
