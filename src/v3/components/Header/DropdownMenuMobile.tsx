import React from "react"
import { motion } from "framer-motion"
import stitches from "../../../stitches"
import BaseButton from "../BaseButton"
import { FooterLinks } from "../FooterLinks"
import { redesignAssets } from "../assets"

const Container = stitches.styled(motion.menu, {
  position: "fixed",
  left: 0,
  top: -12,
  margin: 0,
  width: "100vw",
  height: "100vh",
  padding: 48,
  background: "$paMidnight",
  color: "$paMoonLight",
  "> nav": {
    marginTop: 38,
  },
  "ul, li": {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  ".header": {
    marginTop: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".menu": {
    marginBottom: 36,

    "> h2": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      marginBottom: 12,
    },
  },

  ".submenu": {
    fontFamily: "Inter",
    fontSize: 14,
    padding: 14,
    paddingLeft: 22,
    fontWeight: 700,
    borderBottom: "1px solid $paLupine",
  },
  p: {
    textAlign: "center",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "11px",
    marginTop: 34,
  },
  "@bp2": {
    display: "none",
  },
})

type Props = {
  onClose: () => void
}

const mobileMenuItems = [
  {
    title: "Psychedelics Anonymous",
    subitems: [
      {
        subtitle: "Overview",
        href: "#",
      },
      {
        subtitle: "Staking",
        href: "#",
      },
    ],
  },
  {
    title: "Game Theory",
    subitems: [
      {
        subtitle: "Overview",
        href: "#",
      },
      {
        subtitle: "Events",
        href: "#",
      },
    ],
  },
]

const Psychedelics = stitches.styled("div", {
  position: "relative",
  width: "100%",
  height: "auto",
  marginTop: 54,
  ".eyes": {
    position: "absolute",
    top: 36,
    left: 36,
  },
  "> h2": {
    fontWeight: 700,
    fontSize: 34,
    color: "$paMoonLight",
    position: "absolute",
    left: "50%",
    bottom: 32,
    transform: "translateX(-50%)",
  },
})

export default function DropdownMenuMobile({ onClose }: Props) {
  return (
    <Container
      initial={{ opacity: 0, transform: "translate(-100%, 0px)" }}
      animate={{ opacity: 1, transform: "translate(-0%, 0px)" }}
      exit={{ opacity: 0, transform: "translate(-100%, 0px)" }}
    >
      <div className="header">
        <img src={redesignAssets.logos.pa} alt="Psychedelics Anonymous" />

        <BaseButton onClick={onClose}>
          <img src={redesignAssets.icons.close} alt="Close Button" />
        </BaseButton>
      </div>

      <nav>
        <ul>
          {mobileMenuItems.map((item) => (
            <li className="menu" key={item.title}>
              <h2>{item.title}</h2>

              <ul>
                {item.subitems.map((subitem) => (
                  <li className="submenu" key={subitem.subtitle}>
                    {subitem.subtitle}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <Psychedelics>
        <BaseButton>
          <img
            src={redesignAssets.image.psychedelicsMenu}
            width="100%"
            height="auto"
            alt="Psychedelics"
          />
          <img
            className="eyes"
            width={36}
            height={36}
            src={redesignAssets.icons.circleEye}
            alt="eye"
          />
        </BaseButton>

        <h2>Psychedelics</h2>
      </Psychedelics>

      <FooterLinks />
    </Container>
  )
}
