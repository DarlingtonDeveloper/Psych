import React from "react"
import Link from "next/link"
import stitches from "../../../stitches"
import Image from "next/image"
import { motion } from "framer-motion"
import BaseButton from "../BaseButton"
import { redesignAssets } from "../assets"

const Container = stitches.styled(motion.menu, {
  position: "absolute",
  display: "none",
  left: "50%",
  transform: "translateX(-50%)",
  top: 52,
  width: "100%",
  height: 300,
  zIndex: 10,
  background: "$paMidnight",
  color: "white",
  justifyContent: "center",
  borderRadius: 5,
  boxShadow: "0px 0px 32px 4px rgba(0, 0, 0, 0.5)",
  "ul,li": {
    listStyleType: "none",
    fontFamily: "$inter",
    padding: 0,
  },
  ".title": {
    fontSize: 12,
    fontWeight: 700,
  },
  "> nav": {
    padding: 50,
  },
  a: {
    color: "white",
    textDecoration: "none",
    fontFamily: "$inter",
    fontSize: 12,
  },
  ".main-ul": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  },
  "@bp2": {
    maxWidth: 1337,
    display: "flex",
  },
})

const MenuItems = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
})

const Psychedelics = stitches.styled("div", {
  position: "relative",
  width: 300,
  height: 300,
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

const menus = [
  {
    title: "Psychedelics Anonymous",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Staking",
        href: "#",
      },
      {
        name: "Lore",
        href: "#",
      },
      {
        name: "PSY Points",
        href: "#",
      },
      {
        name: "Accelerator",
        href: "#",
      },
    ],
  },
  {
    title: "Game Theory",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Events",
        href: "#",
      },
      {
        name: "NTFs",
        href: "#",
      },
      {
        name: "Season",
        href: "#",
      },
    ],
  },
  {
    title: "Products",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Coaching",
        href: "#",
      },
      {
        name: "Merchandise",
        href: "#",
      },
      {
        name: "New Dawn",
        href: "#",
      },
      {
        name: "Wear2Earn",
        href: "#",
      },
    ],
  },
  {
    title: "Psychedelics",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Coaching",
        href: "#",
      },
      {
        name: "Events & Courses",
        href: "#",
      },
      {
        name: "Resources",
        href: "#",
      },
    ],
  },
  {
    title: "Project",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Roadmap",
        href: "#",
      },
      {
        name: "Donations",
        href: "#",
      },
      {
        name: "Partnerships",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    menuItems: [
      {
        name: "Overview",
        href: "#",
      },
      {
        name: "Mission",
        href: "#",
      },
      {
        name: "Values",
        href: "#",
      },
      {
        name: "Team",
        href: "#",
      },
    ],
  },
]

export default function DropdownMenu() {
  return (
    <Container
      initial={{ opacity: 0, transform: "translate(-50%, -32px)" }}
      animate={{ opacity: 1, transform: "translate(-50%, 0px)" }}
      exit={{ opacity: 0, transform: "translate(-50%, 32px)" }}
    >
      <nav>
        <ul className="main-ul">
          {menus.map((menu) => (
            <MenuItems key={menu.title}>
              <li className="title">{menu.title}</li>
              <ul>
                {menu.menuItems.map((menuItem) => (
                  <li key={menuItem.name}>
                    <Link href={menuItem.href}>{menuItem.name}</Link>
                  </li>
                ))}
              </ul>
            </MenuItems>
          ))}
        </ul>
      </nav>

      <Psychedelics>
        <BaseButton>
          <Image
            src={redesignAssets.image.psychedelicsMenu}
            width={300}
            height={300}
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
    </Container>
  )
}
