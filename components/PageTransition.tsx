"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
style={{
  opacity: visible ? 1 : 0,
  transition: "opacity 0.5s ease",
}}
    >
      {children}
    </div>
  );
}