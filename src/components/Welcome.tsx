import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type FontWeights = {
  subtitle: { min: number; max: number; default: number };
  title: { min: number; max: number; default: number };
};

const FONT_WEIGHTS: FontWeights = {
  subtitle: { min: 100, max: 500, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const Welcome = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  const renderText = (text: string, className: string, baseWeight = 400) => {
    return [...text].map((char, index) => (
      <span
        key={index}
        className={className}
        style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        aria-hidden="true"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const setupTextHover = (
    container: HTMLElement | null,
    type: keyof FontWeights,
  ) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (
      letter: HTMLSpanElement,
      weight: number,
      duration = 0.25,
    ) => {
      return gsap.to(letter, {
        duration,
        ease: "power2.out",
        fontVariationSettings: `'wght' ${weight}`,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { left } = container.getBoundingClientRect();
      const mouseX = event.clientX - left;

      letters.forEach((letter) => {
        const { left: l, width: w } = letter.getBoundingClientRect();
        const letterX = l - left + w / 2;
        const distance = Math.abs(mouseX - letterX);
        const intensity = Math.exp(-(distance ** 2) / 20000);

        animateLetter(letter, min + (max - min) * intensity);
      });
    };

    const handleMouseLeave = () => {
      letters.forEach((letter) => animateLetter(letter, base, 0.3));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subTitleCleanup = setupTextHover(subTitleRef.current, "subtitle");

    return () => {
      if (titleCleanup) titleCleanup();
      if (subTitleCleanup) subTitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subTitleRef} aria-label="Hey, I'm Shyam. Welcome to my">
        {renderText(
          "Hey, I'm Shyam. Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7" aria-label="portfolio.">
        {renderText("portfolio.", "text-9xl italic font-georama")}
      </h1>
    </section>  
  );
};

export default Welcome;
