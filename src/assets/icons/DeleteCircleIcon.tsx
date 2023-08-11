import { SVGProps } from "react"

type DeleteCircleProps = {
  color: string;
} & SVGProps<SVGSVGElement>

const DeleteCircleIcon = (props: DeleteCircleProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="delete-circle">
      <path
        id="Vector"
        d="M9.17218 15.3284L12.0006 12.5M14.829 9.67157L12.0006 12.5M12.0006 12.5L9.17218 9.67157M12.0006 12.5L14.829 15.3284"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)
export default DeleteCircleIcon;

// "#DF5426"
