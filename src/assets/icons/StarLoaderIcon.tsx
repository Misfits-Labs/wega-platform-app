import { SVGProps } from "react";

interface StarloaderIconProps {
  color?: string;
}

const SvgComponent = (props: SVGProps<SVGSVGElement> & StarloaderIconProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3321_5762)" stroke="black">
      <path
        d="M8 1.33325V3.99992"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12V14.6667"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.666 8H11.9993"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8H1.33333"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.28516 3.28589L5.17077 5.17151"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8281 10.8284L12.7137 12.714"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7148 3.28589L10.8292 5.17151"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.17188 10.8284L3.28626 12.714"
        stroke={props.color ?? "#FDFDFD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3321_5762">
        <rect width={16} height={16} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
