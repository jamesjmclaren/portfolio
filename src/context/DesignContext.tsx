"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Design = 1 | 2 | 3;

interface DesignCtx {
  design: Design;
  setDesign: (d: Design) => void;
}

const DesignContext = createContext<DesignCtx>({ design: 3, setDesign: () => {} });

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [design, setDesignState] = useState<Design>(3);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-design");
      if (saved === "1") setDesignState(1);
      else if (saved === "2") setDesignState(2);
      else if (saved === "3") setDesignState(3);
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
