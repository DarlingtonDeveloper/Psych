import React from "react"

interface PIconProps {
  color?: string
}

const PIcon = ({ color }: PIconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_110_11)">
      <path
        d="M0 3.66804V0H11.847C13.041 0 14.0317 0.470744 14.8192 1.41223C15.4097 2.10599 15.7313 2.98882 15.7255 3.89985V6.38737C15.7255 7.58195 15.2617 8.57272 14.3342 9.35966C13.6461 9.96202 12.7614 10.2918 11.847 10.2869H3.8786V15.9154H0V6.61908H11.847V3.66804H0Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_110_11">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default PIcon
