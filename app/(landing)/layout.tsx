"use client";
import GeneralHeader from "@/components/shared/GeneralHeader";
import ScrollGuide from "@/components/landing/ScrollGuide";
import React from "react";

const LandingLayout = (props: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const delta = event.deltaY || event.detail || (event as any).wheelDelta;
        container.scrollLeft += delta;
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="h-screen flex">
      <div className="fixed top-0 w-full">
        <GeneralHeader />
      </div>
      
      <main
        ref={containerRef}
        className="flex-1 overflow-x-hidden overflow-y-hidden mt-10"
      >
        {props.children}
      </main>

      <div className="fixed right-0 bottom-7 bg-white z-40">
        <ScrollGuide containerRef={containerRef} />
      </div>
    </div>
  );
};

export default LandingLayout;
