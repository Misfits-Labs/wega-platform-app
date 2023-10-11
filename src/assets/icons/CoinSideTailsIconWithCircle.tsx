import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.8275 9H7.494L6.038 3.0135H6.389L4.933 9H2.5865L0.63 0.42H2.8595L3.893 6.439H3.867L5.479 0.42H6.9415L8.56 6.439H8.534L9.5675 0.42H11.797L9.8275 9Z"
      fill="#FDFDFD"
    />
    <path
      d="M14.2675 9.156C13.9468 9.156 13.6695 9.04117 13.4355 8.8115C13.2058 8.5775 13.091 8.30017 13.091 7.9795C13.091 7.65017 13.2058 7.37067 13.4355 7.141C13.6695 6.907 13.9468 6.79 14.2675 6.79C14.5968 6.79 14.8763 6.907 15.106 7.141C15.3357 7.37067 15.4505 7.65017 15.4505 7.9795C15.4505 8.30017 15.3357 8.5775 15.106 8.8115C14.8763 9.04117 14.5968 9.156 14.2675 9.156Z"
      fill="#F26D21"
    />
  </svg>
)
export default SvgComponent
