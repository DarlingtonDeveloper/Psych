import React, { useState } from "react"
import Modal from "../common/Modal"
import stitches from "../../stitches"
import Box from "../common/Box"
import { useForm } from "react-hook-form"
import Button from "../common/ButtonV2"
import { AUSEZUTaxType } from "./types"
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
  setFormValues: (data: Partial<AUSEZUTaxType>) => void
}

interface StepCompleteProps {
  close: () => void
  data: Partial<AUSEZUTaxType>
}

const StepOne = ({ nextStep, setFormValues }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<AUSEZUTaxType>()
  const onSubmit = (data: Partial<AUSEZUTaxType>) => {
    setFormValues(data)
    nextStep(data.userIsOGEZUMinter === "yes" ? 2 : 3)
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
          question="Did you Mint EZU on the Magic Eden Launchpad/Platform 
              between 23rd August 2022 - 31st August 2022?"
          register={register}
          id="userIsOGEZUMinter"
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
    formState: { dirtyFields },
  } = useForm<AUSEZUTaxType>({
    resolver: joiResolver(
      Joi.object({
        userIsAUSTaxResEZUMintingPeriod: Joi.string().required(),
        userLocAUSEZUMintingPeriod: Joi.string().required(),
        userRegAUSGSTEZUMintingPeriod: Joi.string().required(),
      })
    ),
  })

  const onSubmit = (data: Partial<AUSEZUTaxType>) => {
    setFormValues(data)
    nextStep(3)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TopBorderContainer>
        <YesNoQuestion
          question="During the Mint period of EZU between 23rd August 2022 - 31st August 2022 were you an Australian Tax Resident?"
          register={register}
          id="userIsAUSTaxResEZUMintingPeriod"
        />
        <YesNoQuestion
          question="During the Mint period of EZU between 23rd August 2022 - 31st August 2022 were you located in Australia?"
          register={register}
          id="userLocAUSEZUMintingPeriod"
        />
        <YesNoQuestion
          question="During the Mint period of EZU between 23rd August 2022 - 31st August 2022 were you registered for GST (Goods & Service Tax) in Australia?"
          register={register}
          id="userRegAUSGSTEZUMintingPeriod"
        />
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
  } = useForm<AUSEZUTaxType>()

  const onSubmit = (data: Partial<AUSEZUTaxType>) => {
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
    async (data: AUSEZUTaxType) => {
      await axios.post("/.netlify/functions/submit-aus-gst-ezu-verified", {
        ...data,
        walletAddress: wallet?.address.toLowerCase(),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "ezuGstAnswered",
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
  } = useForm<AUSEZUTaxType>({
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
  const onSubmit = (formData: AUSEZUTaxType) => {
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
            Mint period of EZU between 23rd August 2022 - 31st August 2022.
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

const AUSEzuTaxModal = ({ isOpen, onToggle }: AUSTaxModalProps) => {
  const [data, setData] = useState({})
  const setFormValues = (values: Partial<AUSEZUTaxType>) => {
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

export default AUSEzuTaxModal
