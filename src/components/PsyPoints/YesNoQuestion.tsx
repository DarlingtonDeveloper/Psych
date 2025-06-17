import React from "react"
import stitches from "../../stitches"
import { UseFormRegister } from "react-hook-form"
import { AUSTaxType } from "./types"
import Box from "../common/Box"

interface YesNoQuestionProps {
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

const YesNoQuestion = ({ register, question, id }: YesNoQuestionProps) => (
  <Container>
    <Box css={{ fontWeight: 600 }}>{question}</Box>
    <Box css={{ display: "flex", gap: "$lg" }}>
      <Label htmlFor="radio-yes">
        <Input type="radio" value="yes" id="radio-yes" {...register(id)} />
        Yes
      </Label>
      <Label htmlFor="radio-no">
        <Input type="radio" value="no" id="radio-no" {...register(id)} />
        No
      </Label>
    </Box>
  </Container>
)

export default YesNoQuestion
