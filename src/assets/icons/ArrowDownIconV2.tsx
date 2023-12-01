import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#FDFDFD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M10 2v16.666m0 0-8-8m8 8 8-8"
    />
  </svg>
)
export default SvgComponent
