import React from "react"

interface CompleteIconProps {
  disabled: boolean
}

const FullSetIcon = ({ disabled }: CompleteIconProps) =>
  disabled ? (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.30304 0.540427C7.42881 0.486524 7.57119 0.486524 7.69696 0.540427L14.5001 3.45605L7.50008 6.45604L0.50001 3.45601L7.30304 0.540427Z"
        fill="#4A555B"
      />
      <path
        d="M0 4.32969V12C0 12.2 0.119198 12.3808 0.30304 12.4596L7 15.3297V7.32969L0 4.32969Z"
        fill="#4A555B"
      />
      <path
        d="M8 7.32976L15 4.32976V12C15 12.2 14.8808 12.3808 14.697 12.4596L8 15.3297V7.32976Z"
        fill="#4A555B"
      />
    </svg>
  ) : (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.30304 0.540427C7.42881 0.486524 7.57119 0.486524 7.69696 0.540427L14.5001 3.45605L7.50008 6.45604L0.50001 3.45601L7.30304 0.540427Z"
        fill="#4669FB"
      />
      <path
        d="M0 4.32969V12C0 12.2 0.119198 12.3808 0.30304 12.4596L7 15.3297V7.32969L0 4.32969Z"
        fill="#4669FB"
      />
      <path
        d="M8 7.32976L15 4.32976V12C15 12.2 14.8808 12.3808 14.697 12.4596L8 15.3297V7.32976Z"
        fill="#4669FB"
      />
    </svg>
  )

export default FullSetIcon
