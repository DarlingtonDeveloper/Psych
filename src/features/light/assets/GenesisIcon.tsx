import React, { SVGProps } from "react"
import { styled } from "@stitches/react"

const GenesisIcon: React.FC<SVGProps<any>> = (props) => {
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 42C0 18.7324 18.7324 0 42 0C65.2676 0 84 18.7324 84 42C84 65.2676 65.2676 84 42 84C18.7324 84 0 65.2676 0 42ZM42 67.2394C56 67.2394 67.2394 56 67.2394 42C67.2394 28 56 16.7606 42 16.7606C28 16.7606 16.7606 28 16.7606 42C16.7606 56 28 67.2394 42 67.2394Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default styled(GenesisIcon)
