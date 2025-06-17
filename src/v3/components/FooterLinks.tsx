import React from "react"
import Link from "next/link"
import stitches from "../../stitches"
import { PAGE } from "../../utils/pages"

const LINKS = [
  { label: "NFT LICENSE", href: PAGE.NFT_LICENSE },
  {
    label: "PRIVACY",
    href: PAGE.PRIVACY_POLICY,
  },
  {
    label: "PSY TERMS",
    // TODO GET PSY TERMS LINK
    href: PAGE.PSY_TERMS,
  },
]

const FooterList = stitches.styled("ul", {
  listStyleType: "none",
  paddingInlineStart: 0,
  li: {
    display: "inline",
  },
  "& > li": {
    fontSize: "0.6875rem",
    color: stitches.theme.colors.paWhite,
    "::before": {
      padding: "0 0.5rem",
      content: "/",
    },
  },
  ":first-child": {
    "::before": {
      content: "",
    },
  },
})

const FooterLink = stitches.styled("a", {
  fontFamily: stitches.theme.fonts.inter,
  color: stitches.theme.colors.paMoonLight,
  textDecoration: "none",
})

export const FooterLinks = () => {
  return (
    <FooterList>
      {LINKS.map(({ label, href }) => (
        <li key={label}>
          <Link href={href} passHref>
            <FooterLink target="_blank">{label}</FooterLink>
          </Link>
        </li>
      ))}
    </FooterList>
  )
}
