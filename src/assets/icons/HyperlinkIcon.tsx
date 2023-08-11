
import { SVGProps } from "react"

const HyperlinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 5.5V9.5C10 9.63261 9.94732 9.75979 9.85355 9.85355C9.75979 9.94732 9.63261 10 9.5 10H1.5C1.36739 10 1.24021 9.94732 1.14645 9.85355C1.05268 9.75979 1 9.63261 1 9.5V1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1H5.5"
      stroke="#F5F5F5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default HyperlinkIcon;
