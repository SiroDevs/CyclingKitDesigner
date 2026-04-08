"use client";

import { KitType, ViewType, PatternDef } from "@/types/types";
import { ShortsFront } from "./ShortsFront";
import { ShortsBack } from "./ShortsBack";
import { JerseyFront, JerseyBack } from "./jersey";

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
      {kit === "shorts" && view === "front" && <ShortsFront {...props} />}
      {kit === "shorts" && view === "back" && <ShortsBack {...props} />}
    </div>
  );
}

interface SelectablePartProps {
  id: string
  isSelected: boolean
  onClick: (id: string) => void
  children: React.ReactNode
}

export const SelectablePart = ({ 
  id, 
  isSelected, 
  onClick, 
  children 
}: SelectablePartProps) => (
  <g
    onClick={(e) => {
      e.stopPropagation()
      onClick(id)
    }}
    className={`cursor-pointer transition-all ${
      isSelected ? 'opacity-85 drop-shadow-[0_0_4px_rgba(0,120,255,0.6)]' : ''
    }`}
  >
    {children}
  </g>
)