import React, { SVGProps } from "react"
import { styled } from "@stitches/react"

const ComponentIcon: React.FC<SVGProps<any>> = (props) => {
  return (
    <svg
      width="83"
      height="59"
      viewBox="0 0 83 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.538452 17.7588V41.5679L17.3736 58.4045H37.6902V41.5396L24.36 41.5393L17.4036 34.5826V24.7446L24.36 17.7879L37.6902 17.7882V0.923387V0.923096H17.3733L0.538452 17.7588Z"
        fill="currentColor"
      />
      <path
        d="M66.1689 0.923096H45.8521V17.7885L59.1828 17.7882L66.1392 24.7446V34.582L59.1819 41.5393H45.8521V58.4045H66.1686L83.0046 41.5687V17.7585L66.1689 0.923096Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default styled(ComponentIcon)
