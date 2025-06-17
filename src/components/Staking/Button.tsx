import stitches from "../../stitches"

const Button = stitches.styled("button", {
  border: "1px solid $paIce",
  boxShadow: "none",
  background: "transparent",
  textTransform: "uppercase",
  color: "$paIce",
  padding: "$sm",
  width: "100%",
  fontSize: "$sm",
  fontWeight: "600",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "$paIce",
    color: "$paDark",
  },
  transition: "background ease-in 0.3s",
  userSelect: "none",
  variants: {
    variant: {
      transparent: {
        border: "none",
        lineHeight: "0.8",
        textUnderlineOffset: "10px",
        "&:hover": {
          color: "$paIce",
          background: "transparent",
          textDecoration: "underline",
        },
      },
    },
    zero: {
      true: {
        width: "auto",
        padding: 0,
      },
    },
    sm: {
      true: {
        width: "100%",
        padding: "$sm",
        "@bp3": {
          width: "auto",
        },
      },
    },
    selected: {
      true: {},
    },
  },
  compoundVariants: [
    {
      selected: true,
      variant: "transparent",
      css: {
        textDecoration: "underline",
      },
    },
  ],
})

export default Button
