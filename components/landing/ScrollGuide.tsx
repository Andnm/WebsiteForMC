"use client";

import React from "react";
import "../../styles/landing/scroll-guide-style.scss";
import arrowRight from "../../assets/svg/arrow-right.svg";

interface ScrollGuideProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ScrollGuide: React.FC<ScrollGuideProps> = ({ containerRef }) => {
  console.log(containerRef);
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
    <div className="scroll-guide-container fixed right-7 bottom-7 flex justify-center items-center flex-nowrap">
      <button className="arrow arrow-guide">
        Scroll
        <svg
          className="svg--icons-arrow_right-small"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.996-.003l7.001 7.001-.707.707L9 14.001l-.707-.707 5.789-5.797L0 7.498v-1h14.082L8.289.703l.707-.707z"
            fill-rule="nonzero"
          ></path>
        </svg>
      </button>

      <div className="loading-bar">
        <div
          className="progress-bar"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>

      <button className="arrow arrow-box">
        <svg
          className="svg--icons-arrow_right-small"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.996-.003l7.001 7.001-.707.707L9 14.001l-.707-.707 5.789-5.797L0 7.498v-1h14.082L8.289.703l.707-.707z"
            fill-rule="nonzero"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ScrollGuide;
