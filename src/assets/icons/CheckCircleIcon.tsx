import { SVGProps } from "react"

const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => (

  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="check-circle">
      <path
        id="Vector"
        d="M7 13L10 16L17 9"
        stroke="#B0EC81"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
        stroke="#B0EC81"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)
export default CheckCircleIcon
