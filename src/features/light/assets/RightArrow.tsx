import React, { SVGProps } from "react"
import { styled } from "@stitches/react"

const RightArrow: React.FC<SVGProps<any>> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 0.988281L5.94531 2.04297L10.1289 6.26172H0.988281V7.73828H10.1289L5.94531 11.957L7 13.0117L13.0117 7L7 0.988281Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default styled(RightArrow)
