"use client";

import { KitType, ViewType, PatternDef } from "@/types/types";
import { JerseyFront, JerseyBack, BibsFront, BibsBack } from ".";

interface KitCanvasProps {
  kit: KitType;
  view: ViewType;
  getColor: (id: string) => string;
  getPatFill: (id: string) => PatternDef;
  selectedPart: string | null;
  onPartClick: (id: string) => void;
}

export function KitCanvas({
  kit,
  view,
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: KitCanvasProps) {
  const props = { getColor, getPatFill, selectedPart, onPartClick };

  return (
    <div className="w-full max-w-[320px] mx-auto">
      {kit === "jersey" && view === "front" && <JerseyFront {...props} />}
      {kit === "jersey" && view === "back" && <JerseyBack {...props} />}
      {kit === "bibs" && view === "front" && <BibsFront {...props} />}
      {kit === "bibs" && view === "back" && <BibsBack {...props} />}
    </div>
  );
}
