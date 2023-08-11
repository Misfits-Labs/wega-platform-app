import { SVGProps } from "react"
const ColorfulOrbs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#B80D57"
        fillRule="evenodd"
        d="M369.179 289.973c43.093-2.151 71.979 41.028 100.786 73.178 26.581 29.668 46.812 61.914 55.166 100.877 11.332 52.855 35.579 115.412-.092 156.002-36.007 40.971-102.056 30.253-155.86 21.454-44.346-7.252-82.331-31.566-112.081-65.272-27.671-31.351-48.817-70.57-44.549-112.184 3.973-38.727 39.388-62.367 65.419-91.294 28.551-31.727 48.603-80.635 91.211-82.761Z"
        clipRule="evenodd"
      />
    </g>
    <g filter="url(#b)">
      <path
        fill="#FF7C38"
        fillRule="evenodd"
        d="M750.685 201.974c34.689-.286 72.234-17.444 101.962.421 29.791 17.902 37.771 56.848 48.385 89.926 9.581 29.857 15.322 60.75 9.873 91.627-5.339 30.252-19.551 58.147-40.304 80.809-20.39 22.266-48.313 33.706-75.872 46.058-31.779 14.243-63.127 37.95-97.37 31.589-34.819-6.468-56.244-39.917-81.424-64.802-27.339-27.02-70.271-48.573-72.123-86.951-1.876-38.854 44.114-61.395 63.33-95.225 16.944-29.829 13.896-72.637 42.656-91.36 28.765-18.727 66.557-1.809 100.887-2.092Z"
        clipRule="evenodd"
      />
    </g>
    <g filter="url(#c)">
      <path
        fill="#C836E0"
        fillRule="evenodd"
        d="M577.381 303.672c39.947-14.025 71.429 43.767 97.942 76.785 20.888 26.014 21.968 61.009 36.73 90.931 15.407 31.23 47.794 53.727 51.709 88.332 4.329 38.265-9.174 76.516-29.349 109.312-22.527 36.619-49.878 76.414-91.501 87.14-41.447 10.68-84.537-10.821-121.603-32.228-31.712-18.314-53.382-48.392-72.299-79.756-16.395-27.182-31.044-56.909-29.249-88.604 1.658-29.274 20.255-54.188 38.63-77.032 15.113-18.789 43.533-22.042 57.098-41.979 28.058-41.236 14.842-116.382 61.892-132.901Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={754.37}
        height={782.368}
        x={0.692}
        y={78.588}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_3430_12028"
          stdDeviation={105.654}
        />
      </filter>
      <filter
        id="b"
        width={791.876}
        height={771.802}
        x={332.448}
        y={-17.029}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_3430_12028"
          stdDeviation={105.654}
        />
      </filter>
      <filter
        id="c"
        width={767.577}
        height={880.098}
        x={208.303}
        y={90.21}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_3430_12028"
          stdDeviation={105.654}
        />
      </filter>
    </defs>
  </svg>
)
export default ColorfulOrbs
