import React, { useState } from "react"
import stitches from "../../stitches"

interface Props {
  characterLength: number
  value: string
  onChange: (val: string) => void
}

const Input = stitches.styled("input", {
  background: "transparent",
  border: 0,
  borderBottom: "1px solid white",
  color: "white",
  width: "20px",
  padding: "0",
  borderRadius: "0",
  fontSize: "18px",
  textAlign: "center",
})

const Wrapper = stitches.styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
})

const SplitInput: React.FC<Props> = ({ characterLength, value, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const arrayItems = React.useMemo(
    () => Array.from({ length: characterLength }),
    [characterLength]
  )
  const refs = React.useRef(
    arrayItems.map(() => React.createRef<HTMLInputElement>())
  )

  const handleChange = (val: string) => {
    const newValue = `${value}`.split("")
    newValue[activeIndex] = val
    onChange(newValue.join(""))
  }

  const focusOnNext = (index?: number) => {
    const expectedNextIndex = activeIndex + 1
    const nextIndex = index && index > value.length ? index : expectedNextIndex
    if (nextIndex === characterLength) {
      setActiveIndex(-1)
      refs.current[activeIndex].current?.blur()
    } else {
      setActiveIndex(nextIndex)
      refs.current[nextIndex].current?.focus()
    }
  }

  const focusOnPrevious = () => {
    const nextIndex = activeIndex - 1
    if (nextIndex >= 0) {
      refs.current[activeIndex - 1].current?.focus()
      setActiveIndex(nextIndex)
    }
  }

  // key down should only handle special cases but going next should be onInput
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      handleChange("")
      focusOnPrevious()
    } else if (e.key === "Delete") {
      e.preventDefault()
      handleChange("")
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      focusOnPrevious()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      focusOnNext()
    } else if (e.key === " " || e.key === "Spacebar" || e.key === "Space") {
      e.preventDefault()
    }
  }

  return (
    <Wrapper>
      {arrayItems.map((_, index) => (
        <Input
          type="text"
          key={`split-input-${index}`}
          ref={refs.current[index]}
          value={value[index] || ""}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e.target.value)}
          onInput={() => focusOnNext(index)}
          onFocus={(e) => {
            setActiveIndex(index)
            e.target.select()
          }}
        />
      ))}
    </Wrapper>
  )
}

SplitInput.displayName = "SplitInput"

export default SplitInput
