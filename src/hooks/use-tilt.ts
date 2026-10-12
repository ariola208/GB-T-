import { useRef, MouseEvent } from "react";

/** Effet 3D qui suit la souris. Utilise la classe .tilt-3d (index.css). */
export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * max * 2}deg`);
    el.style.setProperty("--rx", `${-y * max * 2}deg`);
    el.style.setProperty("--s", "1.02");
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--s", "1");
  };

  return { ref, onMouseMove, onMouseLeave };
}
