import * as React from "react"
import { SVGProps } from "react"

interface RestartIconProps {
  color?: string;
}

const SvgComponent: React.FC<RestartIconProps & SVGProps<SVGSVGElement>> = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g
      stroke={props.color ?? "#FDFDFD"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M4.454 13.711a6.668 6.668 0 0 1 6.1-11.814 6.667 6.667 0 0 1 .891 11.814" />
      <path d="M11.335 10.667V13.4a.6.6 0 0 0 .6.6h2.733M8 14.674l.008-.008" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.color ?? "#FDFDFD"} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
