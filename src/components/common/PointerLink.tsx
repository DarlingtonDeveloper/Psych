import React from "react"
import Link from "next/link"
import stitches from "../../stitches"

interface PointerLinkProps {
  path: string
  native?: boolean
}

const Container = stitches.styled("span", {
  color: "inherit",
  height: "fit-content",
  "&:hover": {
    cursor: "pointer",
  },
})

const CustomAnchor = stitches.styled("a", {
  color: "inherit",
  "&:visited": {
    color: "inherit",
  },
})

const PointerLink: React.FC<PointerLinkProps> = ({
  path,
  native = false,
  children,
}) =>
  native ? (
    <Container>
      <CustomAnchor href={path} target="_blank" rel="noreferrer">
        {children}
      </CustomAnchor>
    </Container>
  ) : (
    <Link href={path} passHref>
      <Container>{children}</Container>
    </Link>
  )

export default PointerLink
