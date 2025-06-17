import React, { useState } from "react"
import stitches from "../../stitches"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import Button from "../../components/common/ButtonV2"
import { Controller, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useRouter } from "next/router"
import { PAGE } from "../../utils/pages"
import { useMutation } from "react-query"
import axios from "axios"
import { setATOLocalStorage } from "../../utils/localStorage"

const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paDustv2",
})

const Header = stitches.styled("h3", {
  fontSize: 28,
  lineHeight: "32px",
  color: "$paLupine",
})

const TextInput = stitches.styled("input", {
  fontSize: "$rg",
  padding: "$sm",
  border: 0,
  borderRadius: "5px",
  color: "$paLupine",
  "&:focus": {
    outline: "none",
    border: "1px solid $paLupine",
    boxShadow: "none",
  },
  variants: {
    variant: {
      error: {
        border: "1px solid $paFormRed",
      },
    },
  },
})

const Form = stitches.styled("form", {
  display: "flex",
  flexDirection: "column",
  marginTop: "54px",
  gap: "32px",
  maxWidth: "360px",
  width: "100%",
})

const Label = stitches.styled("label", {
  fontFamily: "$inter",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "18px",
  color: "$paLupine",
})

const InputLabelWrapper = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
})

const ErrMsg = stitches.styled("p", {
  color: "$paFormRed",
  fontFamily: "$inter",
  fontSize: 12,
  margin: 0,
  variants: {
    align: {
      right: {
        textAlign: "right",
      },
    },
  },
})

const loginResolver = joiResolver(
  Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  })
)

const defaultValues = {
  username: "",
  password: "",
}

type FormInput = typeof defaultValues

const ATOLogin = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm({
    resolver: loginResolver,
    defaultValues,
  })
  const [mutationError, setMutationError] = useState("")

  const { mutate } = useMutation<{ accessToken: string }, unknown, FormInput>(
    async (params: { username: string; password: string }) => {
      const authorizationBuffer = btoa(`${params.username}:${params.password}`)

      const response = await axios.post(
        "/.netlify/functions/verify-ato-dashboard-login",
        undefined,
        {
          headers: {
            authorization: `Bearer ${authorizationBuffer.toString()}`,
          },
        }
      )

      return response.data
    },
    {
      onSuccess: (val) => {
        setATOLocalStorage(val.accessToken)
        router.push(PAGE.ATO_DASHBOARD)
      },
      onError: () => {
        setMutationError("Failed to login. Try again later.")
      },
    }
  )

  const onSubmit = async (values: FormInput) => {
    mutate(values)
  }

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | ATO Login"
        // NEED DESCRIPTION FOR META HEAD
        description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
        link="/ato"
      />
      <Header>ATO Login</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputLabelWrapper>
                <Label>Username</Label>
                <TextInput
                  variant={fieldState.error ? "error" : undefined}
                  {...field}
                />
                {fieldState.error ? (
                  <ErrMsg align="right">{fieldState.error.message}</ErrMsg>
                ) : null}
              </InputLabelWrapper>
            )
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <InputLabelWrapper>
                <Label>Password</Label>
                <TextInput
                  variant={fieldState.error ? "error" : undefined}
                  type="password"
                  {...field}
                />
                {fieldState.error ? (
                  <ErrMsg align="right">{fieldState.error.message}</ErrMsg>
                ) : null}
              </InputLabelWrapper>
            )
          }}
        />

        {mutationError ? <ErrMsg>{mutationError}</ErrMsg> : null}
        <Button size="full" color="lupine" type="submit">
          Enter
        </Button>
      </Form>
    </Container>
  )
}

export default ATOLogin
