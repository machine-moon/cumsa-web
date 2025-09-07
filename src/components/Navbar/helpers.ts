import { useEffect, useRef, useCallback, useState } from "react";

export const NAV_Z_INDEX = 9999;

export const animationVariants = {
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 500, damping: 30, duration: 0.2 },
  },
  logo: {
    whileHover: { scaleX: 1.12, scaleY: 0.92 },
    whileTap: { scale: 1.18 },
    transition: { type: "spring" as const, stiffness: 350, damping: 12, duration: 0.3 },
  },
};

export function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, callback: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [ref, callback]);
}

export function useHighlight(
  hoveredIdx: number | null,
  navRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
) {
  const getHighlightProps = useCallback(() => {
    if (hoveredIdx !== null && navRefs.current[hoveredIdx]) {
      const el = navRefs.current[hoveredIdx]!;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      return {
        left: rect.left - parentRect.left,
        width: rect.width,
      };
    }
    return { left: 0, width: 0 };
  }, [hoveredIdx, navRefs]);

  return getHighlightProps();
}

export function useNavbarState() {
  const navRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

  return {
    navRef,
    navRefs,
  };
}

export function useLiquidCursor(navRef: React.RefObject<HTMLDivElement | null>) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCursorPosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("mousemove", handleMouseMove);
      navElement.addEventListener("mouseenter", handleMouseEnter);
      navElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener("mousemove", handleMouseMove);
        navElement.removeEventListener("mouseenter", handleMouseEnter);
        navElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [navRef]);

  return { cursorPosition, isHovering };
}
