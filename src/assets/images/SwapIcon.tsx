
import { SVGProps } from "react"
const SwapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={1.5} y={1.5} width={37} height={37} rx={18.5} fill="#3F3F3F" />
    <path
      d="M25 28V12M25 12L28 15M25 12L22 15"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12V28M15 28L18 25M15 28L12 25"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x={1.5}
      y={1.5}
      width={37}
      height={37}
      rx={18.5}
      stroke="url(#paint0_linear_2149_1501)"
      strokeWidth={3}
    />
    <defs>
      <linearGradient
        id="paint0_linear_2149_1501"
        x1={1.26437}
        y1={0.168067}
        x2={43.8487}
        y2={35.5338}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.0092433} stopColor="#FF9C27" />
        <stop offset={0.989098} stopColor="#F26D21" />
      </linearGradient>
    </defs>
  </svg>
)
export default SwapIcon
