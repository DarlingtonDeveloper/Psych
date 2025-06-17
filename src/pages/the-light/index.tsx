import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import MetaHead from "../../components/common/MetaHead"
import {
  Container,
  ContentContainer,
  Emphasis,
  Flex,
  Grid,
  Header,
  Heading,
  NavLink,
  DesktopNav,
  StickyNavWrapper,
  Strong,
  Text,
  VerticalLine,
  MobileNav,
  MobileNavLink,
  Video,
} from "../../styles/light-styles"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import NftButton from "../../features/light/components/NftButton"
import LockIcon from "../../features/light/assets/LockIcon"
import GenesisIcon from "../../features/light/assets/GenesisIcon"
import PAPPIcon from "../../features/light/assets/PAPPIcon"
import ComponentIcon from "../../features/light/assets/ComponentIcon"
import IRLIcon from "../../features/light/assets/IRLIcon"
import MetaverseIcon from "../../features/light/assets/MetaverseIcon"

const Light = () => {
  const [stickyTop, setStickyTop] = useState<number>(0)
  const [isSticky, setIsSticky] = useState(false)
  const [open, setOpen] = useState(false)

  const { ref: theLightRef, inView: theLightInView } = useInView()
  const { ref: equationRef, inView: equationInView } = useInView()
  const { ref: nftsRef, inView: nftsInView } = useInView()
  const { ref: burnRef, inView: burnInView } = useInView()
  const { ref: faqsRef, inView: faqsInView } = useInView()

  const activeSection = useMemo(() => {
    if (faqsInView) {
      return "faqs"
    }
    if (burnInView) {
      return "burn"
    }
    if (nftsInView) {
      return "nfts"
    }
    if (equationInView) {
      return "equation"
    }
    if (theLightInView) {
      return "theLight"
    }
    return "none"
  }, [burnInView, equationInView, faqsInView, nftsInView, theLightInView])

  const toggleMobileMenu = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  useEffect(() => {
    const stickyNav = document
      .querySelector("#sticky-nav")
      ?.getBoundingClientRect()
    setStickyTop(stickyNav?.top ?? 0)
  }, [])

  const handleScroll = useCallback(() => {
    const stickyNav = document.querySelector("#sticky-nav")
    if (stickyNav) {
      const scrollTop = window.scrollY
      setIsSticky(scrollTop >= stickyTop - 10)
    }
  }, [stickyTop])

  useEffect(() => {
    if (!stickyTop) return

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [stickyTop, handleScroll])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous - The Light"
        description="We are the light"
        link="/the-light"
      />
      <ContentContainer>
        <Header>
          We Are
          <br />
          The Light
        </Header>
        <Video
          key="the-light-render"
          src="https://psychedelicsanonymous-assets.b-cdn.net/animations/The-Lightrender_FINAL.mp4"
          width="100%"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
        />
      </ContentContainer>
      <StickyNavWrapper sticky={isSticky} id="sticky-nav">
        <DesktopNav sticky={isSticky}>
          <Flex css={{ width: "130px", columnGap: "20px" }}>
            <GenesisIcon css={{ width: "29px", height: "auto" }} />
            <PAPPIcon
              css={{ width: "29px", height: "auto", color: "$paMoonLight" }}
            />
            <ComponentIcon
              css={{ width: "29px", height: "auto", color: "$paMoonLight" }}
            />
          </Flex>
          <Flex
            css={{
              alignItems: "center",
              "@bp2": {
                columnGap: "28px",
              },
            }}
          >
            <NavLink href="#the-light" active={activeSection === "theLight"}>
              The Light
            </NavLink>
            <NavLink href="#equation" active={activeSection === "equation"}>
              Equation
            </NavLink>
            <NavLink href="#nfts" active={activeSection === "nfts"}>
              Equation NFTs
            </NavLink>
            <NavLink href="#burn" active={activeSection === "burn"}>
              Burn
            </NavLink>
            <NavLink href="/forest">The Forest</NavLink>
            <NavLink href="#faqs" active={activeSection === "faqs"}>
              FAQs
            </NavLink>
          </Flex>
          <Flex
            css={{
              width: "130px",
              columnGap: "20px",
              justifyContent: "flex-end",
            }}
          >
            <MetaverseIcon css={{ width: "29px", height: "auto" }} />
            <IRLIcon css={{ width: "29px", height: "auto" }} />
          </Flex>
        </DesktopNav>
        <MobileNav>
          <Box
            as="button"
            css={{
              all: "unset",
              height: "90px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderBottom: "1px solid $paDark",
            }}
            onClick={toggleMobileMenu}
          >
            Menu
          </Box>
          <Box
            data-open={open}
            css={{
              maxHeight: 0,
              transition: "all 0.3s ease-in-out",
              "&[data-open=true]": {
                maxHeight: "634px",
              },
            }}
          >
            <MobileNavLink
              href="#the-light"
              active={activeSection === "theLight"}
              onClick={toggleMobileMenu}
            >
              The Light
            </MobileNavLink>
            <MobileNavLink
              href="#equation"
              active={activeSection === "equation"}
              onClick={toggleMobileMenu}
            >
              Equation
            </MobileNavLink>
            <MobileNavLink
              href="#nfts"
              active={activeSection === "nfts"}
              onClick={toggleMobileMenu}
            >
              Equation NFTs
            </MobileNavLink>
            <MobileNavLink
              href="#burn"
              active={activeSection === "burn"}
              onClick={toggleMobileMenu}
            >
              Burn
            </MobileNavLink>
            <MobileNavLink href="/forest" onClick={toggleMobileMenu}>
              The Forest
            </MobileNavLink>
            <MobileNavLink
              href="#faqs"
              active={activeSection === "faqs"}
              onClick={toggleMobileMenu}
            >
              FAQs
            </MobileNavLink>
          </Box>
        </MobileNav>
      </StickyNavWrapper>
      <Flex
        id="the-light"
        ref={theLightRef}
        css={{
          background: `url(${require("../../images/light/symbol-v1.svg?url")}) no-repeat, $paMoonLight`,
          backgroundSize: "200% auto",
          backgroundPosition: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          padding: "9rem 0",

          "@bp3": {
            backgroundSize: "90% auto",
          },
        }}
      >
        <Heading
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          Become
          <br />
          Light
        </Heading>
        <Text
          css={{
            maxWidth: "360px",
            margin: "0 40px 64px 40px",
            textAlign: "center",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          Beyond the pixilations of eye-drooling & empty movements – we become{" "}
          <Strong>The Light.</Strong>
        </Text>
        <VerticalLine
          length="long"
          color="dark"
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        />
        <Text
          css={{
            maxWidth: "360px",
            margin: "0 40px 64px 40px",
            textAlign: "center",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          Complete <Emphasis>Season II</Emphasis> and your Genesis tokens will
          be granted access to <Strong>The Light.</Strong>
        </Text>
        <VerticalLine
          id="equation"
          ref={equationRef}
          length="long"
          color="dark"
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        />
        <Heading
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          The
          <br />
          Equation
        </Heading>
        <Text
          css={{
            maxWidth: "360px",
            margin: "0 40px 64px 40px",
            textAlign: "center",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          (G-3 + C2 + PAPP) + (G-4 + C1-3 + C3 + PAPP) + Pass + BURN x 3 ={" "}
          <Strong>The Light</Strong>
        </Text>
        <VerticalLine
          length="long"
          color="dark"
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        />
        <Text
          css={{
            maxWidth: "360px",
            margin: "0 40px 64px 40px",
            textAlign: "center",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        >
          To complete the equation
          <br />
          <Strong>you must burn.</Strong>
        </Text>
        <VerticalLine
          length="long"
          color="dark"
          css={{
            margin: "0 40px 64px 40px",

            "@bp3": {
              margin: "0 7.5rem 64px 7.5rem",
            },
          }}
        />
        <Flex
          css={{
            display: "none",
            columnGap: "64px",
            alignItems: "center",
            "@bp3": {
              display: "flex",
            },
          }}
        >
          <GenesisIcon
            css={{
              width: "84px",
              height: "auto",
            }}
          />
          <PAPPIcon
            css={{
              color: "$paMoonLight",

              width: "84px",
              height: "auto",
            }}
          />
          <ComponentIcon
            css={{
              color: "$paMoonLight",
              width: "84px",
              height: "auto",
            }}
          />
          <MetaverseIcon
            css={{
              width: "auto",
              height: "58px",
            }}
          />
          <IRLIcon
            css={{
              width: "auto",
              height: "58px",
            }}
          />
        </Flex>
        <Flex
          css={{
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            "@bp1": {
              flexDirection: "row",
            },
            "@bp3": {
              columnGap: "64px",
              display: "none",
            },
          }}
        >
          <Flex css={{ gap: "16px" }}>
            <GenesisIcon
              css={{
                width: "42px",
                height: "auto",
              }}
            />
            <PAPPIcon
              css={{
                width: "42px",
                height: "auto",
                color: "$paMoonLight",
              }}
            />
            <ComponentIcon
              css={{
                width: "42px",
                height: "auto",
                color: "$paMoonLight",
              }}
            />
          </Flex>
          <Flex css={{ gap: "16px" }}>
            <MetaverseIcon
              css={{
                width: "auto",
                height: "29px",
              }}
            />
            <IRLIcon
              css={{
                width: "auto",
                height: "29px",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        id="nfts"
        ref={nftsRef}
        css={{
          background: `url(${require("../../images/light/symbol-v2.svg?url")}) no-repeat, white`,
          backgroundSize: "auto 90%",
          backgroundPosition: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          padding: "9rem 0",

          "@bp2": {
            backgroundSize: "auto 107.5%",
          },
        }}
      >
        <Heading>NFTs</Heading>
        <Flex
          css={{
            flexDirection: "column",
            alignItems: "center",
            rowGap: "24px",
            maxWidth: "540px",
            margin: "0 40px 24px 40px",

            "@bp3": {
              margin: "0 7.5rem 24px 7.5rem",
            },
          }}
        >
          <Text css={{ textAlign: "center" }}>
            Reach the end of <Emphasis>The Forest</Emphasis> and you will find{" "}
            <Strong>The Light</Strong>.
          </Text>
          <Text css={{ textAlign: "center" }}>
            To complete <Emphasis>The Equation</Emphasis> you will need a{" "}
            <Strong>Genesis NFT</Strong> and at least{" "}
            <Strong>10,000 PSY Points</Strong> to access the{" "}
            <Emphasis>Burn Platform</Emphasis>.
          </Text>
          <Text css={{ textAlign: "center" }}>
            You will also require the following for the burn –
          </Text>
          <Text css={{ textAlign: "center" }}>
            <Strong>1x</Strong> Component One, <Strong>1x</Strong> Component
            Two, <Strong>1x</Strong> Component Three, <br /> <Strong>1x</Strong>{" "}
            PAPP, <Strong>1x</Strong> Pass (IRL or Metaverse) +{" "}
            <Strong>10,000</Strong> PSY Points.
          </Text>
          <Text css={{ textAlign: "center" }}>
            Your <Strong>Genesis NFT</Strong> will be{" "}
            <Strong>light-enabled</Strong> after the burn.
          </Text>
          <Text css={{ textAlign: "center" }}>
            <Strong>
              You can only use a Genesis NFT once. If you wish to perform
              multiple burns, you will require multiple Genesis NFTs.
            </Strong>
          </Text>
        </Flex>
        <VerticalLine
          length="long"
          color="dark"
          css={{
            margin: "0 auto",
            marginBottom: "24px",
          }}
        />
        <Flex
          css={{
            width: "100%",
            flexDirection: "column",

            "@bp1": {
              paddingLeft: "40px",
              paddingRight: "40px",
            },

            "@bp3": {
              paddingLeft: "7.5rem",
              paddingRight: "7.5rem",
            },
          }}
        >
          <Text
            css={{
              padding: "56px 0",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Purchase Requirements
          </Text>
          <Grid
            css={{
              gridTemplateColumns: "234px",
              gap: "24px",
              margin: "0 auto",

              "@bp2": {
                gridTemplateColumns: "234px 234px",
              },

              "@bp3": {
                gridTemplateColumns: "234px 234px 234px",
              },

              "@bp4": {
                gap: "64px",
              },
            }}
          >
            <NftButton type="C1" />
            <NftButton type="C2" />
            <NftButton type="C3" />
            <NftButton type="PAPP" />
            <NftButton type="IRL" />
            <NftButton type="Metaverse" />
          </Grid>
        </Flex>
      </Flex>
      <Box
        id="burn"
        ref={burnRef}
        css={{
          backgroundColor: "#131312",
          color: "$paMoonLight",
          width: "100%",
        }}
      >
        <Heading color="light" css={{ marginTop: "9rem" }}>
          Burn
          <br />
          Everything
        </Heading>
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "24px",
            maxWidth: "32.5rem",
            padding: "0 40px",
            margin: "0 auto",
          }}
        >
          <Text css={{ textAlign: "center" }}>
            The <Emphasis>Burn Process</Emphasis> will consume the requirements
            as follows –
          </Text>
          <Text css={{ textAlign: "center" }}>
            (3000 PSY Points + 1x Component Two + 1x PAPP)
            <br />
            (4000 PSY Points + 1x Component One + 3000 PSY Points + 1x Component
            Three) + 1x Pass
          </Text>
        </Box>
        <Box
          css={{
            display: "none",
            "@bp2": {
              display: "block",
            },
          }}
        >
          <Flex
            css={{
              background: `url(${require("../../images/light/burn-bg.png?url")}) no-repeat, #131312`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "4rem",
              paddingTop: "70px",
              paddingBottom: "45rem",
            }}
          >
            <VerticalLine />
            <Button color="flame" css={{ columnGap: "$sm" }} disabled>
              <LockIcon />
              BURN
            </Button>
          </Flex>
        </Box>
        <Flex
          css={{
            flexDirection: "column",
            alignItems: "center",
            rowGap: "4rem",
            paddingTop: "50px",
            "@bp2": {
              display: "none",
            },
          }}
        >
          <Box
            css={{
              borderLeft: "0.5px solid $paMoonLight",
              borderRight: "0.5px solid $paMoonLight",
              height: 128,
              width: 0,
            }}
          />
          <Flex
            css={{
              background: `url(${require("../../images/light/burn-bg.png?url")}) no-repeat, #131312`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              paddingBottom: "16rem",
              justifyContent: "center",
            }}
          >
            <Button color="flame" css={{ columnGap: "$sm" }}>
              <img
                src={require("../../images/forest/unlock.png?url")}
                alt="Impact Logo"
              />
              BURN
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box id="faqs" ref={faqsRef}>
        <Box
          css={{
            padding: "9rem 16px",
            paddingBottom: "20rem",

            "@bp2": {
              padding: "9rem 7.5rem",
              paddingBottom: "20rem",
            },
          }}
        >
          <Heading>FAQS</Heading>
          <Box
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "32.5rem",
              rowGap: "$lg",
            }}
          >
            <Flex
              css={{
                flexDirection: "column",
                alignItems: "center",
                columnGap: "$sm",
                rowGap: "$sm",
                "@bp2": {
                  flexDirection: "row",
                },
              }}
            >
              <Text css={{ textAlign: "center" }}>
                Is this a new collection? <Strong>No</Strong>
              </Text>
              <Strong css={{ display: "none", "@bp2": { display: "block" } }}>
                /
              </Strong>
              <Text css={{ textAlign: "center" }}>
                Does this dilute Genesis? <Strong>No</Strong>
              </Text>
            </Flex>
            <Flex
              css={{
                flexDirection: "column",
                columnGap: "$sm",
                rowGap: "$sm",
                "@bp2": {
                  flexDirection: "row",
                },
              }}
            >
              <Text css={{ textAlign: "center" }}>
                Does this cost money? <Strong>No</Strong>
              </Text>
              <Strong css={{ display: "none", "@bp2": { display: "block" } }}>
                /
              </Strong>
              <Text css={{ textAlign: "center" }}>
                Is this a new mint? <Strong>No</Strong>
              </Text>
            </Flex>
            <Flex css={{ columnGap: "$xs" }}>
              <Text css={{ textAlign: "center" }}>
                Will it burn the NFTs mentioned in the equation?{" "}
                <Strong>Yes</Strong>
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default Light
