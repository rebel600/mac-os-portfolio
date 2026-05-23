import { useRef } from "react";
import { dockApps } from "#/constants";
import { Tooltip } from "#/components";

const Dock = () => {
  const docRef = useRef<HTMLDivElement>(null);

  const toggleApp = ({ id, canOpen }: { id: string; canOpen: boolean }) => {
    if (!canOpen) return;
    // Add your app toggle logic here
  };

  return (
    <section id="dock">
      <div ref={docRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id ?? name} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
      </div>
      <Tooltip id="dock-tooltip" place="top" className="tooltip" />
    </section>
  );
};

export default Dock;
