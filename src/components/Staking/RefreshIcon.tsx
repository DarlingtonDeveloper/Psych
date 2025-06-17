import React from "react"

interface CommitIconProps {
  fill?: string
}

const RefreshIcon = ({ fill = "#1E1E1E" }: CommitIconProps) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.91699 1.50008C3.92545 1.50008 1.50033 3.92521 1.50033 6.91675H0.666992C0.666992 3.46497 3.46521 0.666748 6.91699 0.666748C8.72807 0.666748 10.3593 1.43746 11.5003 2.66754V0.666748H12.3337V4.00008L9.00032 4.00008V3.16675L10.8257 3.16675C9.83949 2.13901 8.45295 1.50008 6.91699 1.50008ZM6.91699 12.3334C9.90853 12.3334 12.3337 9.90829 12.3337 6.91675H13.167C13.167 10.3685 10.3688 13.1667 6.91699 13.1667C5.10591 13.1667 3.47464 12.396 2.33366 11.166V13.1667H1.50033V9.83341H4.83366V10.6667H3.00828C3.99449 11.6945 5.38103 12.3334 6.91699 12.3334Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.5"
    />
  </svg>
)

export default RefreshIcon
