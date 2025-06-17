import React, { FC } from "react"

interface Props {
  height?: string
  width?: string
}

const XIcon: FC<Props> = ({ height = "15", width = "15" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.79293 7.50004L4.14648 4.85359L4.85359 4.14648L7.50004 6.79293L10.1465 4.14648L10.8536 4.85359L8.20714 7.50004L10.8536 10.1465L10.1465 10.8536L7.50004 8.20714L4.85359 10.8536L4.14648 10.1465L6.79293 7.50004Z"
      fill="currentColor"
    />
  </svg>
)

export default XIcon
