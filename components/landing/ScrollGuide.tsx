"use client";

import React from "react";

interface ScrollGuideProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ScrollGuide: React.FC<ScrollGuideProps> = ({ containerRef }) => {
  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY || event.detail || (event as any).wheelDelta;
    if (containerRef.current) {
      containerRef.current.scrollLeft += delta;
    }
  };

  const updateScrollPercentage = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const percentage = (scrollLeft / maxScrollLeft) * 100;
      setScrollPercentage(percentage);
    }
  };

  React.useEffect(() => {
    if (containerRef.current) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      containerRef.current.addEventListener("scroll", updateScrollPercentage);

      return () => {
        window.removeEventListener("wheel", handleWheel);
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            "scroll",
            updateScrollPercentage
          );
        }
      };
    }
  }, [containerRef]);

  return (
    <div
      className="bg-gray-500 h-4 w-full"
      style={{ width: `${scrollPercentage}%` }}
    >
      loading
    </div>
  );
};

export default ScrollGuide;
