import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22.4971C17.5228 22.4971 22 18.0199 22 12.4971C22 6.97422 17.5228 2.49707 12 2.49707C6.47715 2.49707 2 6.97422 2 12.4971C2 18.0199 6.47715 22.4971 12 22.4971Z"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 8.99707C14.315 8.31208 13.1087 7.83562 12 7.80579M9 15.4971C9.64448 16.3564 10.8428 16.8465 12 16.8881M12 7.80579C10.6809 7.77029 9.5 8.36705 9.5 9.99708C9.5 12.9971 15 11.4971 15 14.4971C15 16.2081 13.5362 16.9433 12 16.8881M12 7.80579V5.99707M12 16.8881V18.9971"
      stroke="#FDFDFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
