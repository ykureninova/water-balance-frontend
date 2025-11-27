import React from "react";

export default function WeeklyGoalGlass({ percent = 0 }) {
  // percent 0..1
  const p = Math.max(0, Math.min(percent, 1));

  const topY = 4;
  const bottomY = 57;
  const leftTop = 10;
  const rightTop = 46;
  const leftBottom = 16;
  const rightBottom = 40;

  const fillHeight = (bottomY - topY) * p;
  const yFillTop = bottomY - fillHeight;

  const interpLeft = (y) =>
    leftTop + ((leftBottom - leftTop) * (y - topY)) / (bottomY - topY);

  const interpRight = (y) =>
    rightTop + ((rightBottom - rightTop) * (y - topY)) / (bottomY - topY);

  const xLeftTop = interpLeft(yFillTop);
  const xRightTop = interpRight(yFillTop);

  return (
    <svg
      width="56"
      height="61"
      viewBox="0 0 56 61"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* контур стакана */}
      <path
        d={`M${leftTop} ${topY} L${rightTop} ${topY} L${rightBottom} ${bottomY} L${leftBottom} ${bottomY} Z`}
        stroke="#0055A0"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* заливка */}
      {p > 0 && (
        <path
          d={`M${xLeftTop} ${yFillTop} L${xRightTop} ${yFillTop} L${rightBottom} ${bottomY} L${leftBottom} ${bottomY} Z`}
          fill="#0055A0"
        />
      )}
    </svg>
  );
}
