import { SVGProps, forwardRef } from "react"
const GameCardOrb = forwardRef((props: SVGProps<SVGSVGElement>, ref: any) => (
  <svg
    viewBox="0 0 269 89"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <g filter="url(#filter0_f_3804_6352)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.8363 93.4299C65.8797 80.4204 85.8506 77.2421 98.1368 72.9572C107.817 69.5812 118.062 72.8647 128.244 71.6646C138.871 70.412 148.714 63.3448 159.138 65.7672C170.664 68.4456 180.353 76.2866 187.777 85.4992C196.067 95.7858 204.781 107.796 203.61 120.952C202.443 134.052 191.789 144.321 181.781 152.855C173.218 160.156 162.281 163.341 151.255 165.596C141.698 167.551 131.585 168.738 122.59 164.961C114.283 161.473 108.979 153.527 104.252 145.859C100.364 139.551 102.343 130.987 97.963 125.01C88.9046 112.647 65.7851 108.753 65.8363 93.4299Z"
        fill={props.fill}
      />
    </g>
    <defs>
      <filter
        id="filter0_f_3804_6352"
        x={0.904854}
        y={0.334297}
        width={267.743}
        height={232.03}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={32.4655}
          result="effect1_foregroundBlur_3804_6352"
        />
      </filter>
    </defs>
  </svg>
))
export default GameCardOrb
