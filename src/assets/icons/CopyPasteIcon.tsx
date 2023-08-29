import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.7333 13.3333H6.6C6.26863 13.3333 6 13.0647 6 12.7333V6.6C6 6.26863 6.26863 6 6.6 6H12.7333C13.0647 6 13.3333 6.26863 13.3333 6.6V12.7333C13.3333 13.0647 13.0647 13.3333 12.7333 13.3333Z"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99935 5.99984V3.2665C9.99935 2.93513 9.73072 2.6665 9.39935 2.6665H3.26602C2.93465 2.6665 2.66602 2.93513 2.66602 3.2665V9.39984C2.66602 9.73121 2.93464 9.99984 3.26602 9.99984H5.99935"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
