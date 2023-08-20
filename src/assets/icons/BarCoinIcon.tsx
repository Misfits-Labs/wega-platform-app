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
      d="M12.666 22C18.1889 22 22.666 17.5228 22.666 12C22.666 6.47715 18.1889 2 12.666 2C7.14317 2 2.66602 6.47715 2.66602 12C2.66602 17.5228 7.14317 22 12.666 22Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.666 8.5C14.981 7.81501 13.7747 7.33855 12.666 7.30872M9.66602 15C10.3105 15.8593 11.5088 16.3494 12.666 16.391M12.666 7.30872C11.3469 7.27322 10.166 7.86998 10.166 9.50001C10.166 12.5 15.666 11 15.666 14C15.666 15.711 14.2022 16.4462 12.666 16.391M12.666 7.30872V5.5M12.666 16.391V18.5"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgComponent
