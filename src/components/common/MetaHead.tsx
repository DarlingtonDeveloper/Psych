import React from "react"
import Head from "next/head"

interface MetaHeadProps {
  title: string
  description: string
  link: string
}

const MetaHead: React.FC<MetaHeadProps> = ({ title, description, link }) => (
  <Head>
    <title key="title">{title}</title>
    <meta name="title" content={title} key="meta-title" />
    <meta name="description" content={description} key="description" />
    <meta name="robots" content="index, follow" key="robots" />

    <meta property="og:type" content="article" key="og:type" />
    <meta property="og:title" content={title} key="og:title" />
    <meta
      property="og:description"
      content={description}
      key="og:description"
    />
    <meta
      property="og:image"
      content={`${process.env.NEXT_PUBLIC_SITE_URL}/social-preview.png`}
      key="og:image"
    />
    <meta
      property="og:image:alt"
      content="Psychedelics Anonymous Banner"
      key="og:image:alt"
    />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@psychedelic_nft" />
    <meta name="twitter:title" content={title} key="twitter:title" />
    <meta
      name="twitter:description"
      content={description}
      key="twitter:description"
    />
    <meta
      name="twitter:image"
      content={`${process.env.NEXT_PUBLIC_SITE_URL}/social-preview.png`}
      key="twitter:image"
    />
    <meta
      name="twitter:image:alt"
      content="Psychedelics Anonymous Banner"
      key="twitter:image:alt"
    />
    <meta name="twitter:card" content="summary" />

    <meta property="og:url" content={link} key="og:url" />
    <meta
      property="og:site_name"
      content="Psychedelics Anonymous | A Web3 brand."
      key="og:site_name"
    />
    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
    <link
      rel="icon"
      href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`}
      type="image/x-icon"
    />
    <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${link}`} />
  </Head>
)

export default MetaHead
