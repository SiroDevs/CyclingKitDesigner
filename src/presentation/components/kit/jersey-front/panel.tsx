"use client";

import { useMemo } from "react";
import { lightenDarken } from "@/lib";
import { JERSEY_FRONT_PARTS, JERSEY_FRONT_PATHS } from "./parts";
import { JerseyFrontProps, JerseyFrontSide, JerseyFrontSleeve } from "./parts";
import { SelectablePart } from "../KitCanvas";

export function JerseyFront({
  getColor,
  getPatFill,
  selectedPart,
  onPartClick,
}: JerseyFrontProps) {
  const patterns = {
    body: getPatFill(JERSEY_FRONT_PARTS.BODY),
    sleeves: getPatFill(JERSEY_FRONT_PARTS.SLEEVES),
    collar: getPatFill(JERSEY_FRONT_PARTS.COLLAR),
    side: getPatFill(JERSEY_FRONT_PARTS.SIDE_PANELS),
  };

  const allDefs = useMemo(
    () =>
      [
        patterns.body.defs,
        patterns.sleeves.defs,
        patterns.collar.defs,
        patterns.side.defs,
      ]
        .filter(Boolean)
        .join(""),
    [patterns],
  );

  const colors = {
    sleeves: getColor(JERSEY_FRONT_PARTS.SLEEVES),
    collar: getColor(JERSEY_FRONT_PARTS.COLLAR),
    body: getColor(JERSEY_FRONT_PARTS.BODY),
  };

  const isSelected = (id: string) => selectedPart === id;

  return (
    <svg
      viewBox="0 0 280 340"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs dangerouslySetInnerHTML={{ __html: allDefs }} />

      {/* Left sleeve */}
      <SelectablePart
        id={JERSEY_FRONT_PARTS.SLEEVES}
        isSelected={isSelected(JERSEY_FRONT_PARTS.SLEEVES)}
        onClick={onPartClick}
      >
        <JerseyFrontSleeve
          side="left"
          color={colors.sleeves}
          fill={patterns.sleeves.fill}
        />
      </SelectablePart>

      {/* Right sleeve */}
      <SelectablePart
        id={JERSEY_FRONT_PARTS.SLEEVES}
        isSelected={isSelected(JERSEY_FRONT_PARTS.SLEEVES)}
        onClick={onPartClick}
      >
        <JerseyFrontSleeve
          side="right"
          color={colors.sleeves}
          fill={patterns.sleeves.fill}
        />
      </SelectablePart>

      {/* Main body */}
      <SelectablePart
        id={JERSEY_FRONT_PARTS.BODY}
        isSelected={isSelected(JERSEY_FRONT_PARTS.BODY)}
        onClick={onPartClick}
      >
        <path
          d={JERSEY_FRONT_PATHS.body}
          fill={patterns.body.fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      </SelectablePart>

      {/* Side panels */}
      <SelectablePart
        id={JERSEY_FRONT_PARTS.SIDE_PANELS}
        isSelected={isSelected(JERSEY_FRONT_PARTS.SIDE_PANELS)}
        onClick={onPartClick}
      >
        <JerseyFrontSide position="left" fill={patterns.side.fill} />
        <JerseyFrontSide position="right" fill={patterns.side.fill} />
      </SelectablePart>

      {/* Collar + zip */}
      <SelectablePart
        id={JERSEY_FRONT_PARTS.COLLAR}
        isSelected={isSelected(JERSEY_FRONT_PARTS.COLLAR)}
        onClick={onPartClick}
      >
        <path
          d={JERSEY_FRONT_PATHS.collar}
          fill={patterns.collar.fill}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />

        {/* Zip line */}
        <line
          x1="140"
          y1="60"
          x2="140"
          y2="295"
          stroke={lightenDarken(colors.collar, 50)}
          strokeWidth="1.5"
          opacity="0.45"
        />

        {/* Zip pull */}
        <rect
          x="135"
          y="295"
          width="10"
          height="7"
          rx="2"
          fill={lightenDarken(colors.collar, 25)}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="0.5"
        />
      </SelectablePart>

      {/* Bottom hem */}
      <rect
        x="85"
        y="302"
        width="110"
        height="10"
        rx="2"
        fill={lightenDarken(colors.body, -18)}
        stroke="none"
        onClick={(e) => {
          e.stopPropagation();
          onPartClick(JERSEY_FRONT_PARTS.BODY);
        }}
        className="cursor-pointer"
      />

      {/* Seam lines */}
      <line
        x1="45"
        y1="80"
        x2="45"
        y2="100"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="0.5"
      />
      <line
        x1="235"
        y1="80"
        x2="235"
        y2="100"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
