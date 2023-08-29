import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={103}
    height={103}
    viewBox="0 0 103 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M51.4987 53.6457C50.3136 53.6457 49.3529 52.6849 49.3529 51.4998C49.3529 50.3147 50.3136 49.354 51.4987 49.354C52.6838 49.354 53.6445 50.3147 53.6445 51.4998C53.6445 52.6849 52.6838 53.6457 51.4987 53.6457Z"
      fill="#151515"
      stroke="#151515"
      strokeWidth={6.4375}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
