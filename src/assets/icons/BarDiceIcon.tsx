import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.33398 20.4V3.6C3.33398 3.26863 3.60261 3 3.93398 3H20.734C21.0654 3 21.334 3.26863 21.334 3.6V20.4C21.334 20.7314 21.0654 21 20.734 21H3.93398C3.60261 21 3.33398 20.7314 3.33398 20.4Z"
      stroke="black"
      strokeWidth={1.5}
    />
    <path
      d="M7.83398 8C7.55784 8 7.33398 7.77614 7.33398 7.5C7.33398 7.22386 7.55784 7 7.83398 7C8.11013 7 8.33398 7.22386 8.33398 7.5C8.33398 7.77614 8.11013 8 7.83398 8Z"
      fill="black"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.334 12.5C12.0578 12.5 11.834 12.2761 11.834 12C11.834 11.7239 12.0578 11.5 12.334 11.5C12.6101 11.5 12.834 11.7239 12.834 12C12.834 12.2761 12.6101 12.5 12.334 12.5Z"
      fill="black"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.834 17C16.5578 17 16.334 16.7761 16.334 16.5C16.334 16.2239 16.5578 16 16.834 16C17.1101 16 17.334 16.2239 17.334 16.5C17.334 16.7761 17.1101 17 16.834 17Z"
      fill="black"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
