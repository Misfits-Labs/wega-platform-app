
import { SVGProps } from "react"

const ArrowSquareOutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 6.75V3H10.25"
      stroke="#F5F5F5"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 7.5L14 3"
      stroke="#F5F5F5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9.5V13.5C12 13.6326 11.9473 13.7598 11.8536 13.8536C11.7598 13.9473 11.6326 14 11.5 14H3.5C3.36739 14 3.24021 13.9473 3.14645 13.8536C3.05268 13.7598 3 13.6326 3 13.5V5.5C3 5.36739 3.05268 5.24021 3.14645 5.14645C3.24021 5.05268 3.36739 5 3.5 5H7.5"
      stroke="#F5F5F5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowSquareOutIcon;
