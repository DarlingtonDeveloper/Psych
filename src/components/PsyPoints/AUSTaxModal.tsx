import React, { useState } from "react"
import Modal from "../common/Modal"
import stitches from "../../stitches"
import Box from "../common/Box"
import { useForm } from "react-hook-form"
import Button from "../common/ButtonV2"
import { AUSTaxType } from "./types"
import YesNoQuestion from "./YesNoQuestion"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import CheckboxQuestion from "./CheckboxQuestion"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import useToast from "../../hooks/useToast"
import ButtonLoading from "../common/ButtonLoading"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"

interface AUSTaxModalProps {
  isOpen: boolean
  onToggle: () => void
}

const FormContainer = stitches.styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$lg",
  color: "$paLupine",
  width: "100%",
  fontFamily: "$inter",
  fontSize: "$sm",
  lineHeight: 1.75,
})

const TextFormContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "$lg",
  borderBottom: "1px solid $paLupine",
  gap: "$lg",
})

const TextInput = stitches.styled("input", {
  fontSize: "$rg",
  padding: "$sm",
  width: "100%",
  "&:focus": {
    outline: "none",
    border: "1px solid $paLupine",
    boxShadow: "none",
  },
})

const TextArea = stitches.styled("textarea", {
  height: "8rem",
  "&:focus": {
    outline: "none",
    border: "1px solid $paLupine",
    boxShadow: "none",
  },
})

const TopBorderContainer = stitches.styled("div", {
  display: "flex",
  paddingTop: "$lg",
  borderTop: "1px solid $paLupine",
  flexDirection: "column",
  gap: "$lg",
})

interface StepProps {
  nextStep: (step: number) => void
  setFormValues: (data: Partial<AUSTaxType>) => void
}

interface StepCompleteProps {
  close: () => void
  data: Partial<AUSTaxType>
}

const StepOne = ({ nextStep, setFormValues }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<AUSTaxType>()
  const onSubmit = (data: Partial<AUSTaxType>) => {
    setFormValues(data)
    nextStep(data.userIsOriginalMinter === "yes" ? 2 : 3)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "$lg",
        }}
      >
        <Box css={{ fontWeight: "bold", fontSize: "$md", lineHeight: 1 }}>
          Australian GST Tax Declaration
        </Box>
        <Box
          css={{
            paddingBottom: "$lg",
            borderBottom: "1px solid $paLupine",
          }}
        >
          Please complete the form below.
        </Box>
        <YesNoQuestion
          question="Did you Mint any Psychedelics Anonymous NFTs during the period
              from 22nd to 27th December 2021?"
          register={register}
          id="userIsOriginalMinter"
        />
        <Button color="lupine" disabled={Object.keys(dirtyFields).length < 1}>
          Continue
        </Button>
      </Box>
    </FormContainer>
  )
}

const StepTwo = ({ nextStep, setFormValues }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<AUSTaxType>({
    resolver: joiResolver(
      Joi.object({
        referralWalletAddress: Joi.string()
          .regex(/^(0x[a-fA-F0-9]{40})$/)
          .replace(/\s/g, "")
          .allow("")
          .optional()
          .messages({
            "string.pattern.base": "Invalid wallet address",
          }),
        userIsAUSTaxResOrigMintingPeriod: Joi.string().required(),
        userLocAUSOrigMintingPeriod: Joi.string().required(),
        userRegAUSGSTOrigMintingPeriod: Joi.string().required(),
      })
    ),
  })

  const onSubmit = (data: Partial<AUSTaxType>) => {
    setFormValues(data)
    nextStep(3)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TopBorderContainer>
        <YesNoQuestion
          question="During the Mint period of Psychedelics Anonymous from 22nd to 27th December 2021 were you an Australian Tax Resident?"
          register={register}
          id="userIsAUSTaxResOrigMintingPeriod"
        />
        <YesNoQuestion
          question="During the Mint period of Psychedelics Anonymous from 22nd to 27th December 2021 were you located in Australia?"
          register={register}
          id="userLocAUSOrigMintingPeriod"
        />
        <YesNoQuestion
          question="During the Mint period of Psychedelics Anonymous from 22nd to 27th December 2021 were you registered for GST (Goods & Service Tax) in Australia?"
          register={register}
          id="userRegAUSGSTOrigMintingPeriod"
        />
        <TextFormContainer>
          <Box css={{ fontWeight: 600 }}>Referral</Box>
          <Box>
            The wallet address entered as your referral wallet address will be
            given a bonus 5,000 PSY and will be entered into a draw to win 1
            ETH.
          </Box>
          <Box css={{ display: "flex", flexDirection: "column", gap: "$xs" }}>
            <TextInput
              {...register("referralWalletAddress")}
              placeholder="Enter wallet address"
            />
            {errors.referralWalletAddress && (
              <Box css={{ fontSize: "$xs", color: "$paFormRed" }}>
                {errors.referralWalletAddress.message}
              </Box>
            )}
          </Box>
        </TextFormContainer>
        <Button color="lupine" disabled={Object.keys(dirtyFields).length < 3}>
          Continue
        </Button>
      </TopBorderContainer>
    </FormContainer>
  )
}

const StepThree = ({ nextStep, setFormValues }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<AUSTaxType>()

  const onSubmit = (data: Partial<AUSTaxType>) => {
    setFormValues(data)
    nextStep(4)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TopBorderContainer>
        <YesNoQuestion
          question="Are you currently an Australian Tax Resident?"
          register={register}
          id="userIsAUSTaxResident"
        />
        <YesNoQuestion
          question="Are you currently located in Australia?"
          register={register}
          id="userInAUS"
        />
        <YesNoQuestion
          question="Are you currently registered for GST (Goods & Service Tax) in Australia?"
          register={register}
          id="userRegisteredAUSGST"
        />
        <Button color="lupine" disabled={Object.keys(dirtyFields).length < 3}>
          Continue
        </Button>
      </TopBorderContainer>
    </FormContainer>
  )
}

const StepFour = ({ close, data }: StepCompleteProps) => {
  const { wallet } = useGlobalConnectContext()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const gstAnswerMutation = useMutation(
    async (data: AUSTaxType) => {
      await axios.post("/.netlify/functions/submit-aus-gst-verified", {
        ...data,
        walletAddress: wallet?.address.toLowerCase(),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "gstAnswered",
          wallet?.address.toLowerCase(),
        ])
        close()
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AUSTaxType>({
    resolver: joiResolver(
      Joi.object({
        walletAddresses: Joi.string()
          .regex(/^(0x[a-fA-F0-9]{40}\s*,\s*)*(0x[a-fA-F0-9]{40})$/)
          .replace(/\s/g, "")
          .allow("")
          .optional()
          .messages({
            "string.pattern.base":
              "Please enter only wallet addresses (comma separated if multiple)",
          }),
        declareTruth: Joi.boolean().valid(true).required(),
      })
    ),
  })
  const agreedToBeTrue = watch("declareTruth")
  const onSubmit = (formData: AUSTaxType) => {
    gstAnswerMutation.mutate({
      ...formData,
      ...data,
    })
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TopBorderContainer>
        <TextFormContainer>
          <Box css={{ fontWeight: 600 }}>
            Please list any other wallet addresses you have used during the the
            Mint period of Psychedelics Anonymous from 22nd - 27th December
            2021.
          </Box>
          <Box css={{ display: "flex", flexDirection: "column", gap: "$xs" }}>
            <TextArea
              {...register("walletAddresses")}
              placeholder="Type Addresses (comma separated for multiple)"
            />
            {errors.walletAddresses && (
              <Box css={{ fontSize: "$xs", color: "$paFormRed" }}>
                {errors.walletAddresses.message}
              </Box>
            )}
          </Box>
        </TextFormContainer>
        <CheckboxQuestion
          register={register}
          id="declareTruth"
          question="I hereby declare that the information provided is true and correct."
        />
        <Button
          color="lupine"
          disabled={!agreedToBeTrue || gstAnswerMutation.isLoading}
        >
          {gstAnswerMutation.isLoading ? (
            <ButtonLoading color={stitches.theme.colors.paMoonLight.value} />
          ) : (
            "Submit"
          )}
        </Button>
      </TopBorderContainer>
    </FormContainer>
  )
}

const AUSTaxModal = ({ isOpen, onToggle }: AUSTaxModalProps) => {
  const [data, setData] = useState({})
  const setFormValues = (values: Partial<AUSTaxType>) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }))
  }
  const [step, setStep] = useState(1)

  const nextStep = (step: number) => {
    setStep(step)
  }

  const _renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} setFormValues={setFormValues} />
      case 2:
        return <StepTwo nextStep={nextStep} setFormValues={setFormValues} />
      case 3:
        return <StepThree nextStep={nextStep} setFormValues={setFormValues} />
      case 4:
        return <StepFour close={onToggle} data={data} />
    }
  }

  return (
    <Modal
      css={{
        backgroundColor: "$paDustv2",
        maxWidth: "20rem",
        overflowY: "auto",
      }}
      onToggle={() => {}}
      isOpen={isOpen}
    >
      {_renderStep()}
    </Modal>
  )
}

export default AUSTaxModal
