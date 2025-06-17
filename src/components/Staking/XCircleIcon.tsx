import React from "react"

interface XCircledIConProps {
  fill?: string
}

const XCircleIcon = ({ fill = "#ACB6AE" }: XCircledIConProps) => (
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
      d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8ZM10.6465 11.3536L8.00004 8.70714L5.35359 11.3536L4.64648 10.6465L7.29293 8.00004L4.64648 5.35359L5.35359 4.64648L8.00004 7.29293L10.6465 4.64648L11.3536 5.35359L8.70714 8.00004L11.3536 10.6465L10.6465 11.3536Z"
      fill={fill}
    />
  </svg>
)

export default XCircleIcon
