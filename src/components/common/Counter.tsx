import React from "react"
import stitches from "../../stitches"
import { HStack } from "./Stack"
import { Text } from "./Text"

const CounterButton = stitches.styled("button", {
  boxSize: "20px",
  fontSize: "$sm",
  color: "white",
  cursor: "pointer",
  "&:hover": { opacity: 0.9 },
  "&:disabled": { opacity: 0.5, cursor: "default" },
  textAlign: "center",
  background: "$paGreenV2",
  boxShadow: "none",
  border: 0,
  padding: "0 $xxs",
})

const Flex = stitches.styled("div", {
  display: "flex",
})

const Counter: React.FC<{
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
}> = ({ value, onChange, minValue, maxValue }) => {
  return (
    <HStack css={{ borderRadius: "$md", overflow: "hidden" }}>
      <CounterButton
        css={{
          px: 2,
          fontSize: "$rg",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
        }}
        onClick={() => {
          onChange(
            typeof minValue === "number" && value - 1 < minValue
              ? minValue
              : value - 1
          )
        }}
        disabled={value === minValue}
      >
        -
      </CounterButton>
      <Flex
        css={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          css={{
            fontSize: "$rg",
            fontWeight: "bold",
            textAlign: "center",
            color: "$paLupine",
            backgroundColor: "$paMoonLight",
            margin: 0,
            padding: "$xxs $xs",
            boxSize: "20px",
          }}
        >
          {value}
        </Text>
      </Flex>
      <CounterButton
        css={{
          px: 2,
          py: 0,
          fontSize: "$rg",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
        onClick={() => {
          onChange(
            typeof maxValue === "number" && value + 1 > maxValue
              ? maxValue
              : value + 1
          )
        }}
        disabled={value === maxValue}
      >
        +
      </CounterButton>
    </HStack>
  )
}

export default Counter
