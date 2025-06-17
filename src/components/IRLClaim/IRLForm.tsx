import React from "react"
import stitches from "../../stitches"
import { useForm } from "react-hook-form"
import GenesisHeader from "../common/GenesisHeader"
import DoubleInput from "./DoubleInput"
import Select from "./Select"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SimpleRegex } from "simple-regex"
import { ScaleLoader } from "react-spinners"
import FormInput from "./FormInput"
import { useQuery } from "react-query"
import axios from "axios"
import IRLAmount from "./IRLAmount"
import useModal from "../../hooks/useModal"
import IRLSizeModal from "./IRLSizeModal"

export interface IRLClaim {
  tokens: number[]
  firstName: string
  lastName: string
  ethWalletAddress: string
  emailAddress: string
  country: string
  tshirtSize: string
  sockSize: string
  postalAddress: string
  state: string
  city: string
  zipCode: string
}

interface IRLFormProps {
  onSubmit: (data: any) => Promise<void>
  loading: boolean
  allowance: number
  amount: number
  setAmount: (num: number) => void
}

interface Country {
  id: number
  name: string
}

interface State {
  id: number
  name: string
}

const Container = stitches.styled("form", {
  width: "100%",
  maxWidth: "50rem",
  "@bp3": {
    margin: "0 auto",
  },
  "> *": {
    "+ *": {
      marginTop: "$lg",
    },
  },
})

const CustomGenesisHeader = stitches.styled(GenesisHeader, {
  fontSize: "$rg",
  color: "$paIce",
  fontWeight: 600,
  "&:before": {
    color: "$paIce",
  },
})

const P = stitches.styled("p", {
  textAlign: "justify",
  lineHeight: 2,
  color: "$paIce",
})

const QuestionHeader = stitches.styled(GenesisHeader, {
  fontSize: "$rg",
  color: "$paIce",
  fontWeight: 600,
  "&:before": {
    color: "$paIce",
  },
})

const SubmitButton = stitches.styled("input", {
  border: "none",
  boxShadow: "none",
  backgroundColor: "$paForest",
  textTransform: "uppercase",
  color: "$paIce",
  padding: "$rg",
  width: "100%",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
  transition: "opacity ease-in 0.3s",
})

const LoadingContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "$rg",
  width: "100%",
})

const HoodieContainer = stitches.styled("div", {
  display: "none",
  width: "100%",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "> img": {
    width: "9.25rem",
  },
})

const SizeToggle = stitches.styled("div", {
  textTransform: "uppercase",
  color: "$paIce",
  textDecoration: "underline",
  "&:hover": {
    cursor: "pointer",
  },
})

const RegistrationInstructionDiv = stitches.styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto auto",
  gridGap: "$xxl",

  "@bp2": {
    gridTemplateColumns: "5fr 3fr",
    gridGap: "$xxl",
  },
})

const FIELD_IS_REQUIRED = "Please complete this required answer."

const irlClaimSchema = Joi.object({
  firstName: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  lastName: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  ethWalletAddress: Joi.string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .required()
    .messages({
      "string.empty": FIELD_IS_REQUIRED,
      "string.pattern.base": "Please enter a valid wallet address.",
    }),
  emailAddress: Joi.string()
    .regex(SimpleRegex.EmailAddress)
    .required()
    .messages({
      "string.empty": FIELD_IS_REQUIRED,
      "string.pattern.base": "Please enter a valid email.",
    }),
  country: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  tshirtSize: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL").required(),
  postalAddress: Joi.string().max(5000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  state: Joi.string().allow("").required(),
  city: Joi.string().allow("").required(),
  zipCode: Joi.string().max(100).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
})

const _generateStateList = (list: State[]) => {
  if (list.length === 0) {
    return <option disabled>No states found.</option>
  }

  return list.map((state) => (
    <option value={state.name} key={state.id}>
      {state.name}
    </option>
  ))
}

const IRLForm = ({
  amount,
  setAmount,
  onSubmit,
  loading,
  allowance,
}: IRLFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRLClaim>({
    resolver: joiResolver(irlClaimSchema),
  })

  const [sizeModal, sizeModalControls] = useModal()
  const curCountry = watch("country")

  const countryListQuery = useQuery("countries", async () => {
    const request = await axios.get<Country[]>(
      process.env.NEXT_PUBLIC_GET_COUNTRY_LIST as string
    )
    return request.data
  })

  const companyNameMap = countryListQuery.isSuccess
    ? countryListQuery.data.reduce<{ [key: string]: number }>(
        (acc, cur) => ({
          ...acc,
          [cur.name]: cur.id,
        }),
        {}
      )
    : {}

  const stateListQuery = useQuery(
    ["states", curCountry],
    async () => {
      const request = await axios.get<State[]>(
        process.env.NEXT_PUBLIC_GET_STATE_LIST as string,
        {
          params: { countryId: companyNameMap[curCountry] },
        }
      )
      return request.data
    },
    {
      enabled: !!curCountry,
    }
  )

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <RegistrationInstructionDiv>
        <div>
          <CustomGenesisHeader>IRL Merch Registration</CustomGenesisHeader>
          <P>
            Complete the form below to claim your free Psychedelics Anonymous
            IRL Merchandise Pack(s).
          </P>
          <SizeToggle onClick={() => sizeModalControls.open()}>
            sizing guide
          </SizeToggle>
          <HoodieContainer>
            <img
              src={require("../../images/hoodie-1.png?url")}
              alt="Hoodie #1"
            />
            <img
              src={require("../../images/hoodie-2.png?url")}
              alt="Hoodie #2"
            />
            <img
              src={require("../../images/hoodie-3.png?url")}
              alt="Hoodie #3"
            />
            <img
              src={require("../../images/hoodie-4.png?url")}
              alt="Hoodie #4"
            />
          </HoodieContainer>
        </div>
        <div>
          <IRLAmount
            allowance={allowance}
            amount={amount}
            setAmount={setAmount}
          />
        </div>
      </RegistrationInstructionDiv>
      <QuestionHeader css={{ marginTop: "$xxl !important" }}>
        registration details
      </QuestionHeader>
      <DoubleInput
        label1="First Name"
        label2="Last Name"
        input1={
          <FormInput
            type="text"
            {...register("firstName")}
            error={!!errors.firstName}
          />
        }
        input2={
          <FormInput
            type="text"
            {...register("lastName")}
            error={!!errors.lastName}
          />
        }
        error1={errors.firstName}
        error2={errors.lastName}
      />
      <DoubleInput
        label1="ETH Wallet Address"
        input1={
          <FormInput
            type="text"
            {...register("ethWalletAddress")}
            error={!!errors.ethWalletAddress}
          />
        }
        error1={errors.ethWalletAddress}
      />
      <DoubleInput
        label1="Email Address"
        label2="Country"
        input1={
          <FormInput
            type="text"
            {...register("emailAddress")}
            error={!!errors.emailAddress}
          />
        }
        input2={
          <Select {...register("country")}>
            <option value={undefined}></option>
            {countryListQuery.data &&
              countryListQuery.data.map((country) => (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              ))}
          </Select>
        }
        error1={errors.emailAddress}
        error2={errors.country}
      />
      <DoubleInput
        label1="Tshirt Size"
        label2="Postal Address"
        input1={
          <Select defaultValue="S" {...register("tshirtSize")}>
            <option value="XS">Extra Small (XS)</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
            <option value="XXL">Double Extra Large (XXL)</option>
          </Select>
        }
        input2={
          <FormInput
            type="text"
            {...register("postalAddress")}
            error={!!errors.postalAddress}
          />
        }
        error1={errors.tshirtSize}
        error2={errors.postalAddress}
      />
      <DoubleInput
        label1="City"
        input1={
          <FormInput type="text" {...register("city")} error={!!errors.city} />
        }
        label2="State"
        input2={
          <Select {...register("state")}>
            {stateListQuery.data ? (
              <>
                <option value={undefined}> </option>
                {_generateStateList(stateListQuery.data)}
              </>
            ) : (
              <option disabled={true}>
                {stateListQuery.isLoading
                  ? "Loading..."
                  : "Choose country first."}
              </option>
            )}
          </Select>
        }
        error1={errors.city}
        error2={errors.state}
      />
      <DoubleInput
        label1="ZIP / Post Code"
        input1={
          <FormInput
            type="text"
            {...register("zipCode")}
            error={!!errors.zipCode}
          />
        }
        error1={errors.zipCode}
      />

      {loading ? (
        <LoadingContainer>
          <ScaleLoader color={stitches.theme.colors.paIce.value} height={15} />
        </LoadingContainer>
      ) : (
        <SubmitButton type="submit" value="Submit" />
      )}
      {sizeModal && <IRLSizeModal close={() => sizeModalControls.close()} />}
    </Container>
  )
}

export default IRLForm
