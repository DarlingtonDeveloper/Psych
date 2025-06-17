import stitches from "../../stitches"

const Button = stitches.styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid $paMoonLight",
  boxShadow: "none",
  backgroundColor: "$paMoonLight",
  textTransform: "uppercase",
  color: "$paLupine",
  padding: "$sm $md",
  fontSize: "$sm",
  fontWeight: "bold",
  fontFamily: "$inter",
  borderRadius: "10px",
  width: "fit-content",
  "&:not([disabled]):hover": {
    cursor: "pointer",
    backgroundColor: "$paLupine",
    border: "1px solid $paLupine",
    color: "$paMoonLight",
  },
  "&:disabled": {
    opacity: 0.9,
    "&:hover": {
      cursor: "not-allowed",
    },
  },
  transition: "background-color ease-in 0.3s",
  variants: {
    color: {
      lupine: {
        border: "1px solid $paLupine",
        backgroundColor: "$paLupine",
        color: "$paMoonLight",
        "&:not([disabled]):hover": {
          cursor: "pointer",
          backgroundColor: "transparent",
          color: "$paLupine",
        },
      },
      lupineInverse: {
        border: "1px solid $paLupine",
        backgroundColor: "transparent",
        color: "$paLupine",
        "&:not([disabled]):hover": {
          cursor: "pointer",
          backgroundColor: "$paLupine",
          color: "$paMoonLight",
        },
      },
      moonlight: {
        border: "1px solid $paMoonLight",
        backgroundColor: "transparent",
        color: "$paMoonLight",
        "&:not([disabled]):hover": {
          cursor: "pointer",
          backgroundColor: "$paMoonLight",
          color: "$paMid",
        },
      },
      green: {
        border: "1px solid $paGreenV2",
        backgroundColor: "$paGreenV2",
        color: "$paMoonLight",
        "&:not([disabled]):hover": {
          border: "1px solid $paGreenV2",
          cursor: "pointer",
          backgroundColor: "$paMoonLight",
          color: "$paGreenV2",
        },
      },
      flame: {
        border: "1px solid $paFlame",
        backgroundColor: "$paFlame",
        color: "$paMoonLight",
        "&:not([disabled]):hover": {
          cursor: "pointer",
          backgroundColor: "$paLupine",
          border: "1px solid $paLupine",
          color: "$paMoonLight",
        },
      },
    },
    shape: {
      circular: {
        borderRadius: "50px",
        padding: "$sm",
      },
    },
    text: {
      normal: {
        textTransform: "unset",
      },
    },
    size: {
      full: {
        width: "100%",
        minWidth: "max-content",
      },
    },
  },
})

export default Button
