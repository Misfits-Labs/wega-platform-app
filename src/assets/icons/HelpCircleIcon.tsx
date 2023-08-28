import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.50065 14.6668C12.1825 14.6668 15.1673 11.6821 15.1673 8.00016C15.1673 4.31826 12.1825 1.3335 8.50065 1.3335C4.81875 1.3335 1.83398 4.31826 1.83398 8.00016C1.83398 11.6821 4.81875 14.6668 8.50065 14.6668Z"
      stroke="#787878"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 6C6.5 3.66665 10.1667 3.66667 10.1667 6C10.1667 7.66667 8.5 7.33329 8.5 9.33329"
      stroke="#787878"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 12.0075L8.5075 11.9992"
      stroke="#787878"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
