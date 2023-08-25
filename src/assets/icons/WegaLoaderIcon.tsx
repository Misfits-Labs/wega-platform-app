
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={24} cy={24.5} r={21} stroke="#787878" strokeWidth={6} />
    <g tw="animate-spin">
     <path
       d="M24 13.5C25.4445 13.5 26.8749 13.7845 28.2095 14.3373C29.5441 14.8901 30.7567 15.7004 31.7782 16.7218C32.7996 17.7433 33.6099 18.9559 34.1627 20.2905C34.7155 21.6251 35 23.0555 35 24.5"
       stroke="#F26D21"
       strokeWidth={6}
       strokeLinecap="round"
     />
     <path
       d="M24 35.5C22.5555 35.5 21.1251 35.2155 19.7905 34.6627C18.4559 34.1099 17.2433 33.2996 16.2218 32.2782C15.2004 31.2567 14.3901 30.0441 13.8373 28.7095C13.2845 27.3749 13 25.9445 13 24.5"
       stroke="#F26D21"
       strokeWidth={6}
       strokeLinecap="round"
     />
    </g>
  </svg>
)
export default SvgComponent
