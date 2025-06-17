import React, { useState } from "react"
import stitches from "../../../stitches"
import BaseButton from "../BaseButton"
import DropdownMenu from "./DropdownMenu"
import { AnimatePresence, motion } from "framer-motion"
import DropdownMenuMobile from "./DropdownMenuMobile"
import { redesignAssets } from "../assets"

const Container = stitches.styled("header", {
  position: "absolute",
  top: 35,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 0,
  paddingLeft: "$md",
  paddingRight: "$md",
  width: "100%",
  "@bp2": {
    top: 88,
  },
  zIndex: 4,
})

const FlexContainer = stitches.styled("div", {
  width: "100%",
  maxWidth: 1337,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
  position: "relative",
})

const MenuIcon = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const Icon = stitches.styled(motion.img, {
  position: "absolute",
  right: 0,
  top: 0,
  variants: {
    icon: {
      close: {
        right: 4,
        top: 4,
      },
    },
  },
})

const Socials = stitches.styled("div", {
  display: "none",
  visibility: "hidden",
  "@bp2": {
    visibility: "visible",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    justifySelf: "start",
  },
})

const LogoWrapper = stitches.styled("div", {
  justifySelf: "flex-start",
  "@bp2": {
    justifySelf: "initial",
  },
})

export function HeaderV3() {
  const [isOpen, setIsOpen] = useState(false)

  const animation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }

  return (
    <Container>
      <FlexContainer>
        <Socials>
          <BaseButton>
            <img src={redesignAssets.logos.discord} alt="Discord Logo" />
          </BaseButton>

          <BaseButton>
            <img src={redesignAssets.logos.twitter} alt="Tiwtter Logo" />
          </BaseButton>
        </Socials>
        <LogoWrapper>
          <img src={redesignAssets.logos.pa} alt="Psychedelics Anonymous" />
        </LogoWrapper>

        <BaseButton onClick={() => setIsOpen(!isOpen)}>
          <AnimatePresence>
            <MenuIcon key={isOpen ? "menu-icon-a" : "menu-icon-b"}>
              {isOpen ? (
                <Icon
                  {...animation}
                  src={redesignAssets.icons.close}
                  alt="Close Icon"
                  icon="close"
                />
              ) : (
                <Icon
                  {...animation}
                  src={redesignAssets.icons.menu}
                  alt="Menu Icon"
                />
              )}
            </MenuIcon>
          </AnimatePresence>
        </BaseButton>

        <AnimatePresence>
          {isOpen && (
            <>
              <DropdownMenu />
              <DropdownMenuMobile onClose={() => setIsOpen(false)} />
            </>
          )}
        </AnimatePresence>
      </FlexContainer>
    </Container>
  )
}
