
import { SVGProps } from "react"
import 'twin.macro';

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.9014 0.49707H22.5816L14.5415 10.6632L24 24.4971H16.5941L10.7935 16.1069L4.15631 24.4971H0.473926L9.07356 13.6232L0 0.49707H7.59394L12.8372 8.16599L18.9014 0.49707ZM17.6098 22.0601H19.649L6.48589 2.80599H4.29759L17.6098 22.0601Z"
      fill="#FDFDFD"
      tw="hover:fill-oranjo"
    />
  </svg>
)

export default TwitterIcon;

