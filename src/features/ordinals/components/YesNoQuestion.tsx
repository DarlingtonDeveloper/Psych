import React from "react"
import stitches from "../../../stitches"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { OrdinalsFormData } from "../index.d"

interface YesNoQuestionProps {
  errors: FieldErrors<OrdinalsFormData>
  register: UseFormRegister<OrdinalsFormData>
  question: string
  id: keyof OrdinalsFormData
  required?: boolean
}

const Container = stitches.styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontSize: "16px",
  fontFamily: "$inter",
  lineHeight: 2,
})

const Input = stitches.styled("input", {
  appearance: "none",
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  backgroundColor: "$paMoonLight",
  "&:checked": {
    backgroundColor: "$paLupine",
    border: "5px solid $paMoonLight",
  },
})

const Label = stitches.styled("label", {
  display: "flex",
  gap: "$sm",
  alignItems: "center",
})

const Question = stitches.styled("span", {
  fontWeight: 600,
  marginBottom: "$lg",
})

const RadioGroup = stitches.styled("div", {
  display: "flex",
  gap: "$lg",
})

const Error = stitches.styled("p", {
  fontSize: "14px",
  fontWeight: 500,
  color: "$paFlame",
})

const YesNoQuestion = ({
  errors,
  register,
  question,
  id,
  required = false,
}: YesNoQuestionProps) => {
  const error = errors?.[id]

  return (
    <Container>
      <Question>{question}</Question>
      <RadioGroup>
        <Label htmlFor={`${id}-radio-yes`}>
          <Input
            type="radio"
            value="yes"
            id={`${id}-radio-yes`}
            {...register(id, {
              required: required ? "This question cannot be left empty" : false,
            })}
            css={{ margin: 0 }}
          />
          Yes
        </Label>
        <Label htmlFor={`${id}-radio-no`}>
          <Input
            type="radio"
            value="no"
            id={`${id}-radio-no`}
            {...register(id, {
              required: required ? "This question cannot be left empty" : false,
            })}
            css={{ margin: 0 }}
          />
          No
        </Label>
      </RadioGroup>
      {error?.message && (
        <Error>
          {error?.type === "string.base"
            ? "This field must not be left empty"
            : error.message}
        </Error>
      )}
    </Container>
  )
}

export default YesNoQuestion
