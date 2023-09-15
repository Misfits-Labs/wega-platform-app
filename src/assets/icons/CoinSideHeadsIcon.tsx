import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 35 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={14.3182} cy={12.1512} r={1.81818} fill="#FDFDFD" />
    <circle cx={14.3182} cy={17.4539} r={1.81818} fill="#FDFDFD" />
    <circle cx={14.3182} cy={22.7567} r={1.81818} fill="#FDFDFD" />
    <circle cx={21.2889} cy={12.1512} r={1.81818} fill="#FDFDFD" />
    <circle cx={21.2889} cy={17.4539} r={1.81818} fill="#FDFDFD" />
    <circle cx={21.2889} cy={22.7567} r={1.81818} fill="#F26D21" />
    <rect
      x={2.08203}
      y={1.58301}
      width={30.8333}
      height={30.8333}
      rx={15.4167}
      stroke="#FDFDFD"
      strokeWidth={2.5}
    />
  </svg>
)
export default SvgComponent
