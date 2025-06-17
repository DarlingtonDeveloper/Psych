import React, { SVGProps } from "react"
import { styled } from "@stitches/react"

const ComponentIcon: React.FC<SVGProps<any>> = (props) => {
  return (
    <svg
      width="77"
      height="59"
      viewBox="0 0 77 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M56.6182 0.923096L39.7833 17.7589V41.5684L56.6182 58.4045H76.9352V41.5398L63.6049 41.5395L56.6485 34.5825V24.7445L63.6049 17.7877L76.9352 17.788V0.923387L56.6182 0.923096Z"
        fill="currentColor"
      />
      <path
        d="M0.384613 0.923096V17.7883L13.7157 17.788L20.6719 24.7448V34.5825L13.7154 41.5392L0.384613 41.5395V58.4045H20.7019L37.5371 41.5683V17.7589L20.7019 0.923096H0.384613Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default styled(ComponentIcon)
