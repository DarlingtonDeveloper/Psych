import React from "react"

interface CommitIconProps {
  fill?: string
}

const CommitIcon = ({ fill = "#F3F5F7" }: CommitIconProps) => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 8C4 6.23676 5.30385 4.77806 7 4.53544V0.5H8V4.53544C9.69615 4.77806 11 6.23676 11 8C11 9.76324 9.69615 11.2219 8 11.4646V15.5H7V11.4646C5.30385 11.2219 4 9.76324 4 8Z"
      fill={fill}
    />
  </svg>
)

export default CommitIcon
