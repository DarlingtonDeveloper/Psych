import React from "react"
import stitches from "../../stitches"
import ErrorText from "./ErrorText"
import { FieldError } from "react-hook-form"

interface DoubleInputProps {
  label1: string
  label2?: string
  input1: React.ReactNode
  input2?: React.ReactNode
  error1: FieldError | undefined
  error2?: FieldError | undefined
  hide1?: boolean
  hide2?: boolean
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  "> div": {
    "+ div": {
      marginTop: "$lg",
      "@bp3": {
        marginTop: 0,
        marginLeft: "$rg",
      },
    },
  },
  "@bp3": {
    flexDirection: "row",
  },
})

const InputContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: "1 1 100%",
})

const InputLabel = stitches.styled("label", {
  fontWeight: 200,
  fontSize: "$sm",
  color: "$paMoonLight",
  marginBottom: "$sm",
  variants: {
    error: {
      true: {
        color: "$paRed",
      },
    },
  },
})

const DoubleInput = ({
  label1,
  label2,
  input1,
  input2,
  error1,
  error2,
  hide1 = false,
  hide2 = false,
}: DoubleInputProps) => (
  <Container>
    {!hide1 && (
      <InputContainer>
        <InputLabel error={!!error1}>{label1}</InputLabel>
        <div>
          {input1}
          <ErrorText>{error1?.message}</ErrorText>
        </div>
      </InputContainer>
    )}
    {!hide2 && !!input2 && (
      <InputContainer>
        <InputLabel error={!!error2}>{label2}</InputLabel>
        <div>
          {input2}
          <ErrorText>{error2?.message}</ErrorText>
        </div>
      </InputContainer>
    )}
  </Container>
)

export default DoubleInput
