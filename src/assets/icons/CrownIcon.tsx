import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <path
      stroke="#FFB72B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M58.668 32h2.667M32 5.333V2.667M32 61.333v-2.666M53.332 53.333l-2.667-2.666M53.332 10.667l-2.667 2.666M10.668 53.333l2.667-2.666M10.668 10.667l2.667 2.666M2.668 32h2.667M44.8 41.333 48 22.667l-11.2 5.6-4.8-5.6-4.8 5.6-11.2-5.6 3.2 18.666h25.6Z"
    />
  </svg>
)
export default SvgComponent
