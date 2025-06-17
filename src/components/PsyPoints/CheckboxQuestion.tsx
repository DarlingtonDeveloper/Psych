import React from "react"
import stitches from "../../stitches"
import { UseFormRegister } from "react-hook-form"
import { AUSTaxType } from "./types"
import Box from "../common/Box"

interface CheckboxQuestionProps {
  register: UseFormRegister<AUSTaxType>
  question: string
  id: keyof AUSTaxType
}

const Container = stitches.styled("div", {
  display: "flex",
  gap: "$lg",
  flexDirection: "column",
  paddingBottom: "$lg",
  borderBottom: "1px solid $paLupine",
})

const Input = stitches.styled("input", {
  display: "flex",
  appearance: "none",
  borderRadius: "100%",
  width: "30px",
  height: "20px",
  backgroundColor: "$paMoonLight",
  padding: 0,
  margin: 0,
  outline: "none",
  boxSizing: "content-box",
  "&:before": {
    display: "none",
  },
  "&:after": {
    display: "none",
  },
  "&:checked": {
    width: "15.75px",
    height: "10px",
    backgroundColor: "$paLupine",
    border: "5px solid $paMoonLight",
  },
})

const Label = stitches.styled("label", {
  display: "flex",
  gap: "$sm",
  alignItems: "center",
})

const CheckboxQuestion = ({
  register,
  question,
  id,
}: CheckboxQuestionProps) => (
  <Container>
    <Box css={{ display: "flex", gap: "$lg" }}>
      <Label htmlFor="checkbox-field">
        <Input type="checkbox" id="checkbox-field" {...register(id)} />
        {question}
      </Label>
    </Box>
  </Container>
)

export default CheckboxQuestion
