import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const INTRO_COMPLETE_EVENT = "portfolio:intro-complete";
export const INTRO_SESSION_KEY = "wind-sun-intro-seen";

export const motionMedia = {
  desktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
};

export function registerMotion() {
  gsap.registerPlugin(ScrollTrigger);
}

export function refreshMotionWhenReady() {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh, { once: true });
  return () => window.removeEventListener("load", refresh);
}
