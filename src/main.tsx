import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrochureStory } from "./brochure/BrochureStory";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrochureStory />
  </StrictMode>,
);
