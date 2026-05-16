"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Design = 1 | 2;

interface DesignCtx {
  design: Design;
  setDesign: (d: Design) => void;
}

const DesignContext = createContext<DesignCtx>({ design: 1, setDesign: () => {} });

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [design, setDesignState] = useState<Design>(1);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-design");
      if (saved === "2") setDesignState(2);
    } catch {}
  }, []);

  function setDesign(d: Design) {
    setDesignState(d);
    try {
      localStorage.setItem("portfolio-design", String(d));
    } catch {}
  }

  return (
    <DesignContext.Provider value={{ design, setDesign }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  return useContext(DesignContext);
}
