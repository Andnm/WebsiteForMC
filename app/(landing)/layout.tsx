"use client";
import GeneralHeader from "@/src/components/shared/GeneralHeader";
import ScrollGuide from "@/src/components/landing/ScrollGuide";
import React from "react";
import { usePathname } from "next/navigation";
import Login from "@/src/components/auth/Login";

const LandingLayout = (props: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathName = usePathname();

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
    <div className="h-screen flex" style={{ backgroundColor: "#1d1d1d" }}>
      <div className="fixed top-0 w-full">
        <GeneralHeader />
      </div>

      <main
        ref={containerRef}
        className="flex-1 overflow-x-hidden overflow-y-hidden mt-16"
      >
        {props.children}
      </main>

      {pathName !== "/login" && pathName !== "/register" && (
        <ScrollGuide containerRef={containerRef} />
      )}
    </div>
  );
};

export default LandingLayout;
