import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.33398 20.8971V4.09707C3.33398 3.7657 3.60261 3.49707 3.93398 3.49707H20.734C21.0654 3.49707 21.334 3.7657 21.334 4.09707V20.8971C21.334 21.2284 21.0654 21.4971 20.734 21.4971H3.93398C3.60261 21.4971 3.33398 21.2284 3.33398 20.8971Z"
      stroke="#FDFDFD"
      strokeWidth={1.5}
    />
    <path
      d="M7.83398 8.49707C7.55784 8.49707 7.33398 8.27321 7.33398 7.99707C7.33398 7.72093 7.55784 7.49707 7.83398 7.49707C8.11013 7.49707 8.33398 7.72093 8.33398 7.99707C8.33398 8.27321 8.11013 8.49707 7.83398 8.49707Z"
      fill="#FDFDFD"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.334 12.9971C12.0578 12.9971 11.834 12.7732 11.834 12.4971C11.834 12.2209 12.0578 11.9971 12.334 11.9971C12.6101 11.9971 12.834 12.2209 12.834 12.4971C12.834 12.7732 12.6101 12.9971 12.334 12.9971Z"
      fill="#FDFDFD"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.834 17.4971C16.5578 17.4971 16.334 17.2732 16.334 16.9971C16.334 16.7209 16.5578 16.4971 16.834 16.4971C17.1101 16.4971 17.334 16.7209 17.334 16.9971C17.334 17.2732 17.1101 17.4971 16.834 17.4971Z"
      fill="#FDFDFD"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
