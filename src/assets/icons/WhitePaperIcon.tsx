import * as React from "react"
import { SVGProps } from "react"
import tw, { css } from 'twin.macro';

interface WhitePaperIconProps extends SVGProps<SVGSVGElement>, React.Attributes {} 

const SvgComponent = (props: WhitePaperIconProps ) => {
    
    const hoverStrokeOranjoStyle = css`
      &:hover > path {
        border-color: black;
        ${tw`stroke-oranjo`}
      }
      `

    return (
      <svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // eslint-disable-next-line react/no-unknown-property
        css={hoverStrokeOranjoStyle}
        {...props}
      >
        <path
          d="M4 21.8971V3.09707C4 2.7657 4.26863 2.49707 4.6 2.49707H16.2515C16.4106 2.49707 16.5632 2.56028 16.6757 2.67281L19.8243 5.82133C19.9368 5.93386 20 6.08647 20 6.2456V21.8971C20 22.2284 19.7314 22.4971 19.4 22.4971H4.6C4.26863 22.4971 4 22.2284 4 21.8971Z"
          stroke="#FDFDFD"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10.4971L16 10.4971"
          stroke="#FDFDFD"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 18.4971L16 18.4971"
          stroke="#FDFDFD"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14.4971L12 14.4971"
          stroke="#FDFDFD"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 2.49707V5.89707C16 6.22844 16.2686 6.49707 16.6 6.49707H20"
          stroke="#FDFDFD"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
}
export default SvgComponent
