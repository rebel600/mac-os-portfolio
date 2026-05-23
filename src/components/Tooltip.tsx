import { useEffect, useState } from "react";

type TooltipProps = {
  id: string;
  place?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export default function Tooltip({
  id,
  place = "top",
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const show = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        `[data-tooltip-id="${id}"]`
      ) as HTMLElement | null;

      if (!target) return;

      const rect = target.getBoundingClientRect();
      const text = target.dataset.tooltipContent || "";

      if (!text) return;

      setContent(text);

      let x = rect.left + rect.width / 2;
      let y = rect.top;

      // base placement
      if (place === "bottom") y = rect.bottom;
      if (place === "left") x = rect.left;
      if (place === "right") x = rect.right;

      // prevent horizontal overflow
      const padding = 8;
      x = Math.max(padding, Math.min(x, window.innerWidth - padding));

      // prevent vertical overflow (top case)
      if (place === "top" && rect.top < 40) {
        y = rect.bottom;
      }

      // clamp vertical
      y = Math.max(padding, y);

      setPosition({ x, y });
      setVisible(true);
    };

    const hide = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        `[data-tooltip-id="${id}"]`
      );

      if (!target) return;

      setVisible(false);
    };

    // use pointer events to avoid flicker
    document.addEventListener("pointerenter", show, true);
    document.addEventListener("pointerleave", hide, true);

    return () => {
      document.removeEventListener("pointerenter", show, true);
      document.removeEventListener("pointerleave", hide, true);
    };
  }, [id, place]);

  if (!visible) return null;

  const transformMap = {
    top: "translate(-50%, -120%)",
    bottom: "translate(-50%, 20%)",
    left: "translate(-120%, -50%)",
    right: "translate(20%, -50%)",
  };

  return (
    <div
      className={`fixed z-50 px-2 py-1 text-sm rounded pointer-events-none ${className}`}
      style={{
        top: position.y,
        left: position.x,
        transform: transformMap[place],
      }}
    >
      {content}
    </div>
  );
}