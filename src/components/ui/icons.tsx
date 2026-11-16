// Minimal stroke icons (24px grid, currentColor).
import type { SVGProps } from "react";

function I(props: Omit<SVGProps<SVGSVGElement>, "d"> & { d: string | string[] }) {
  const { d, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {(Array.isArray(d) ? d : [d]).map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;
export const IconHome = (p: P) => <I {...p} d={["M3 10.5 12 3l9 7.5", "M5 9.5V21h14V9.5"]} />;
export const IconToday = (p: P) => <I {...p} d={["M4 5h16v16H4z", "M4 9h16", "M8 3v4", "M16 3v4", "M9 14l2 2 4-4"]} />;
export const IconMap = (p: P) => <I {...p} d={["M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z", "M9 4v14", "M15 6v14"]} />;
export const IconBook = (p: P) => <I {...p} d={["M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z", "M4 19V5", "M8 7h7"]} />;
export const IconPen = (p: P) => <I {...p} d={["M4 20h4L19 9l-4-4L4 16z", "M13.5 6.5l4 4"]} />;
export const IconMic = (p: P) => <I {...p} d={["M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z", "M5 11a7 7 0 0 0 14 0", "M12 18v3"]} />;
export const IconCards = (p: P) => <I {...p} d={["M7 4h12v14H7z", "M4 7v13h12"]} />;
export const IconChart = (p: P) => <I {...p} d={["M4 20V4", "M4 20h16", "M8 16v-5", "M12 16V8", "M16 16v-3"]} />;
export const IconSettings = (p: P) => <I {...p} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"]} />;
export const IconMenu = (p: P) => <I {...p} d={["M4 7h16", "M4 12h16", "M4 17h16"]} />;
export const IconX = (p: P) => <I {...p} d={["M6 6l12 12", "M18 6 6 18"]} />;
export const IconCheck = (p: P) => <I {...p} d="M5 12.5 10 17l9-10" />;
export const IconArrowRight = (p: P) => <I {...p} d={["M5 12h14", "M13 6l6 6-6 6"]} />;
export const IconArrowLeft = (p: P) => <I {...p} d={["M19 12H5", "M11 6l-6 6 6 6"]} />;
export const IconPlay = (p: P) => <I {...p} d="M7 5v14l11-7z" />;
export const IconStop = (p: P) => <I {...p} d="M7 7h10v10H7z" />;
export const IconVolume = (p: P) => <I {...p} d={["M4 9v6h4l5 4V5L8 9z", "M16 9a4 4 0 0 1 0 6", "M18.5 6.5a8 8 0 0 1 0 11"]} />;
export const IconTrash = (p: P) => <I {...p} d={["M4 7h16", "M9 7V4h6v3", "M6 7l1 13h10l1-13"]} />;
export const IconFlag = (p: P) => <I {...p} d={["M5 21V4", "M5 4h11l-2 4 2 4H5"]} />;
export const IconSparkle = (p: P) => <I {...p} d={["M12 3v4", "M12 17v4", "M3 12h4", "M17 12h4", "M6 6l2.5 2.5", "M15.5 15.5 18 18", "M6 18l2.5-2.5", "M15.5 8.5 18 6"]} />;
