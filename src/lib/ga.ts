export const sendPageViewEvent = (url: string): void => {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // @ts-ignore
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
