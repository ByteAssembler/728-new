import { useEffect, useState } from "react";

export default function ReRender({ children }: { children: React.ReactNode }) {
  const [isLocked, setLocked] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocked(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        pointerEvents: isLocked ? "none" : "auto",
        height: "100%",
        width: "100%",
        cursor: isLocked ? "not-allowed" : "default",
      }}
    >
      {children}
    </div>
  );

  return isLocked ? (
    <div
      style={{
        pointerEvents: "none",
        height: "100%",
        width: "100%",
        cursor: "not-allowed",
      }}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}
