import stitches from "../stitches"
import Fold from "../components/common/Fold"
import VerticalGrid from "../components/common/VerticalGrid"
import Box from "../components/common/Box"
import Button from "../components/common/ButtonV2"
import MaxContainer from "../components/common/MaxContainer"

export const Container = stitches.styled(Fold, {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  justifyContent: "initial",
  backgroundImage: `url(${require("../images/forest/Start.png?url")})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const EnterContainer = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const GameContainer = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "rgb(45, 45, 45)",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const LunarContainer = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paDustv2",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const CherryContainer = stitches.styled("section", {
  minHeight: "100vh",
  width: "100%",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  backgroundImage: `url(${require("../images/forest/cherry.png?url")})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
})

export const LoreContainer = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  backgroundImage: `url(${require("../images/forest/lore2.png?url")})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const Lore3Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  backgroundImage: `url(${require("../images/forest/lore3.png?url")})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const Lore4Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundImage: `url(${require("../images/forest/lore4.png?url")})`,
  backgroundBlendMode: "color-dodge",
  backgroundColor: "$paDark",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const Lore5Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundImage: `url(${require("../images/forest/lore5.png?url")})`,
  // backgroundBlendMode: "color-dodge",
  backgroundColor: "$paDark",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const Lore6Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundImage: `url(${require("../images/forest/lore6.png?url")})`,
  backgroundColor: "$paDark",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const Lore7Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
  padding: "8rem $lg",
  width: "100%",
  backgroundImage: `url(${require("../images/forest/lore7.png?url")})`,
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "$paWhite",
    mixBlendMode: "soft-light",
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
})

export const TheLightButton = stitches.styled(Button, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundImage: `url(${require("../images/forest/become-the-light-btn-bg.png?url")})`,
  fontFamily: "$inter",
  border: "0px",
  width: "220px",
  height: "50px",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "$paWhite",
    mixBlendMode: "soft-light",
    borderRadius: "10px",
    pointerEvents: "none",
  },
  "& > .become-light-text-wrapper": {
    position: "relative",
    zIndex: 1,
    color: "$paMidnight",
    fontSize: "$sm",
    fontWeight: "bold",
    fontFamily: "$inter",
  },
})

export const AscensionContentContainer = stitches.styled(MaxContainer, {
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 16rem)",
})

export const G2Container = stitches.styled(Fold, {
  display: "flex",
  justifyContent: "initial",
  alignContent: "center",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paMid",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

export const ContentContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  color: "$paIce",
  height: "100%",
})

export const EgoHeader = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: "7rem",
  lineHeight: 0.85,
  textAlign: "left",
  "@bp1": {
    fontSize: "5rem",
  },
})

export const EgoDescription = stitches.styled(VerticalGrid, {
  width: "100%",
  lineHeight: 1.75,
  textAlign: "left",
})

export const ConnectWallet = stitches.styled(Box, {
  width: "100%",
  display: "flex",
  marginTop: "$lg",
  justifyContent: "flex-start",
})

export const DisconnectBtn = stitches.styled(Button, {
  backgroundColor: "$paLupine",
  borderBlockColor: "$paLupine",
  color: "$paIce",
  border: "none",
})

export const NaturalText = stitches.styled(Box, {
  alignItems: "center",
  display: "flex",
  margin: "$lg $lg 42px $lg",
  textTransform: "uppercase",
  justifyContent: "center",
})

export const EnterBtn = stitches.styled(Box, {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "49px",
  "@bp3": {
    justifyContent: "center",
  },
})

export const DisconnectWrapper = stitches.styled(Box, {
  width: "100%",
  display: "flex",
  marginBottom: "$lg",
  justifyContent: "flex-end",
  "@bp3": {
    marginBottom: "0",
  },
})

export const CherryContentWrapper = stitches.styled(Box, {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%",
  flex: "1",
})

export const CherryItem = stitches.styled(Box, {
  alignItems: "center",
  display: "flex",
  paddingBottom: "$md",
  justifyContent: "flext-start",
  color: "$paLupine",
  fontWeight: "bold",
})

export const ForestItem = stitches.styled(Box, {
  alignItems: "center",
  display: "flex",
  paddingBottom: "$md",
  justifyContent: "flext-start",
  color: "$paMoonLight",
})

export const CherryDesc = stitches.styled(Box, {
  color: "$paLupine",
  fontWeight: "lighter",
  lineHeight: "32px",
})

export const LoreDesc = stitches.styled(Box, {
  color: "$paIce",
  fontWeight: "lighter",
  lineHeight: "32px",
})

export const LockContentWrapper = stitches.styled(Box, {
  display: "flex",
  justifyContent: "normal",
  alignItems: "center",
  flexDirection: "column",
  flex: "1",
})

export const LockDesc = stitches.styled(Box, {
  color: "$paWhite",
  lineHeight: "32px",
  textAlign: "center",
  fontWeight: "400",
  margin: "23px 0 0 0",
})

export const LockItem = stitches.styled("p", {
  alignItems: "center",
  display: "flex",
  paddingBottom: "$md",
  color: "$paWhite",
  textTransform: "uppercase",
  margin: "0",
})

export const LockTitle = stitches.styled("p", {
  color: "$paWhite",
  margin: "23px 0 23px 0",
  fontSize: "$rg",
  fontWeight: "lighter",
})

export const Wrapper = stitches.styled(Box, {
  width: "100%",
  display: "flex",
  justifyContent: "flex",
  marginTop: "$md",
})

export const StyledButton = stitches.styled(Button, {
  backgroundColor: "$paLupine",
  color: "$paIce",
  border: "$paLupine",
})

export const Image = stitches.styled("img", {
  width: "390px",
  height: "390px",
  "@bp3": {
    objectPosition: "center",
    objectFit: "cover",
  },
})

export const LunarDesc = stitches.styled(Box, {
  color: "$paLupine",
  fontWeight: "lighter",
  lineHeight: "32px",
})

export const ErrorText = stitches.styled("p", {
  backgroundColor: "$paRed",
  color: "$paWhite",
  border: "$paRed",
  padding: "10px 15px",
  borderRadius: "5px",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
})
