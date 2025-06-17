import React, { useMemo, useState } from "react"
import axios, { AxiosError } from "axios"
import { useMutation } from "react-query"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import MetaHead from "../components/common/MetaHead"
import {
  Container,
  ContentContainer,
  RadioField,
  Header,
  HeaderWrapper,
  Heading,
  Subheading,
  Text,
  RadioFieldGroup,
  TextInput,
  TextField,
  TextFieldGroup,
  Divider,
  Error,
} from "../styles/ordinals-styles"
import Button from "../components/common/ButtonV2"
import YesNoQuestion from "../features/ordinals/components/YesNoQuestion"
import { OrdinalsFormData } from "../features/ordinals"
import useToast from "../hooks/useToast"

const Ordinals = () => {
  const { showToast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    formState: { errors: formErrors },
    clearErrors: clearFormErrors,
    handleSubmit,
  } = useForm<OrdinalsFormData>({
    resolver: joiResolver(
      Joi.object({
        userIsAUSTaxResident: Joi.string().required(),
        userInAUS: Joi.string().required(),
        userRegAUSGST: Joi.string().required(),

        userBTCWallet: Joi.string().alphanum().allow(null, ""),
        userEmailAddress: Joi.string()
          .email({ tlds: { allow: false } })
          .allow(null, ""),
      })
        .xor("userBTCWallet", "userEmailAddress", {
          isPresent: Boolean,
        })
        .messages({
          "object.xor":
            "You must provide either a BTC wallet address or an email address",
        })
    ),
  })
  const xorError = Object.values(formErrors).find(
    ({ type }) => type === "object.xor"
  )

  const signupMutation = useMutation(
    async (data: OrdinalsFormData) => {
      await axios.post("/.netlify/functions/submit-ordinal-page-signup", {
        ...Object.fromEntries(
          Object.entries(data).filter(([_, value]) => Boolean(value))
        ),
      })
    },
    {
      onSuccess: () => {
        setSubmitted(true)
      },
      onError: (error: AxiosError) => {
        showToast({
          description:
            error?.response?.data.message ||
            "Something went wrong. Please try again.",
        })
      },
    }
  )

  const onSubmit = (data: OrdinalsFormData) => {
    signupMutation.mutate(data)
  }

  const message = useMemo(() => {
    if (submitted) {
      return "Registration sent."
    }
    return "First come, first served."
  }, [submitted])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous - Ordinals Anonymous"
        description="Psychedelic Inscriptions"
        link="/ordinals"
      />
      <ContentContainer>
        <HeaderWrapper>
          <Header css={{ marginBottom: "32px" }}>
            Ordinals
            <br />
            Anonymous
          </Header>
        </HeaderWrapper>
        <Heading css={{ marginBottom: "20px" }}>
          Psychedelic Inscriptions.
        </Heading>
        <Subheading css={{ marginBottom: "80px" }}>{message}</Subheading>
        {!submitted && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <RadioFieldGroup css={{ marginBottom: "40px" }}>
              <RadioField>
                <YesNoQuestion
                  errors={formErrors}
                  register={register}
                  question="Are you currently an Australian Tax Resident?"
                  id="userIsAUSTaxResident"
                  required
                />
              </RadioField>
              <RadioField>
                <YesNoQuestion
                  errors={formErrors}
                  register={register}
                  question="Are you currently located in Australia?"
                  id="userInAUS"
                  required
                />
              </RadioField>
              <RadioField>
                <YesNoQuestion
                  errors={formErrors}
                  register={register}
                  question="Are you currently registered for GST (Goods & Service Tax) in Australia?"
                  id="userRegAUSGST"
                  required
                />
              </RadioField>
            </RadioFieldGroup>
            <TextFieldGroup>
              <TextField>
                <Text>BTC Wallet</Text>
                <TextInput
                  {...register("userBTCWallet", {
                    onChange: () => {
                      clearFormErrors("userBTCWallet")
                      // @ts-ignore
                      clearFormErrors("")
                    },
                  })}
                  placeholder="Wallet Address"
                />
              </TextField>
              <Divider>
                <Text css={{ lineHeight: "48px" }}>or</Text>
              </Divider>
              <TextField>
                <Text>Email Address</Text>
                <TextInput
                  {...register("userEmailAddress", {
                    onChange: () => {
                      clearFormErrors("userEmailAddress")
                      // @ts-ignore
                      clearFormErrors("")
                    },
                  })}
                  placeholder="Email Address"
                />
              </TextField>
            </TextFieldGroup>
            {xorError && <Error>{xorError.message}</Error>}
            <Button
              color="lupine"
              css={{
                margin: "0 auto",
                marginTop: "40px",
                paddingLeft: "48px",
                paddingRight: "48px",

                "@bp3": {
                  marginTop: "100px",
                },
              }}
            >
              Register
            </Button>
          </form>
        )}
      </ContentContainer>
    </Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default Ordinals
