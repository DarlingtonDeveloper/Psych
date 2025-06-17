import React from "react"

interface TickCircleIconProps {
  fill?: string
}

const TickCircleIcon = ({ fill = "#ACB6AE" }: TickCircleIconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8ZM7.5718 11.2106L11.8905 5.81232L11.1096 5.18762L7.42825 9.7893L4.82012 7.61586L4.17993 8.38408L7.5718 11.2106Z"
      fill={fill}
    />
  </svg>
)

export default TickCircleIcon
