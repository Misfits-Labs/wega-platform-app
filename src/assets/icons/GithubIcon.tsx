
import { SVGProps } from "react"
import tw, { css } from 'twin.macro';

interface GithubIconProps extends SVGProps<SVGSVGElement>, React.Attributes {} 

const GithubIcon = (props: GithubIconProps) => {
  const hoverStrokeOranjoStyle = css`
    &:hover > path {
      border-color: black;
      ${tw`stroke-oranjo`}
    }
  `
  return ( <svg
      width={24}
      height={24}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      // eslint-disable-next-line react/no-unknown-property
      css={hoverStrokeOranjoStyle}
      {...props}
    >
      
        <path
          d="M13.5 25.5C20.1274 25.5 25.5 20.1274 25.5 13.5C25.5 6.87258 20.1274 1.5 13.5 1.5C6.87258 1.5 1.5 6.87258 1.5 13.5C1.5 20.1274 6.87258 25.5 13.5 25.5Z"
          stroke="#FDFDFD"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2998 21.8998V19.6642C16.3298 19.2928 16.2784 18.9194 16.1486 18.5688C16.019 18.2183 15.8142 17.8986 15.5479 17.6312C18.0599 17.3585 20.6999 16.4315 20.6999 12.1785C20.6996 11.0909 20.27 10.045 19.4999 9.25734C19.8646 8.30586 19.8388 7.25414 19.4279 6.32067C19.4279 6.32067 18.4838 6.04805 16.2998 7.47354C14.4662 6.98966 12.5335 6.98966 10.6999 7.47354C8.51587 6.04805 7.57187 6.32067 7.57187 6.32067C7.16096 7.25414 7.13519 8.30586 7.49987 9.25734C6.72397 10.0509 6.29389 11.1062 6.29987 12.2018C6.29987 16.4237 8.93987 17.3507 11.4518 17.6544C11.1887 17.9193 10.9857 18.2351 10.8561 18.5814C10.7265 18.9276 10.6733 19.2965 10.6999 19.6642V21.8998"
          stroke="#FDFDFD"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.7006 20.3427C8.30059 21.1008 6.30059 20.3427 5.10059 18.0059"
          stroke="#FDFDFD"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  )
}

export default GithubIcon;
