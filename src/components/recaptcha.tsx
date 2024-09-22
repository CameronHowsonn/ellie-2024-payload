// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
// import Button from '@/components/button'
// import React from 'react'

// const CaptchaButton = ({ onVerifyCaptcha }) => {
//   const { executeRecaptcha } = useGoogleReCaptcha()
//   const clickHandler = async () => {
//     if (!executeRecaptcha) {
//       return
//     }

//     const token = await executeRecaptcha('contact')

//     onVerifyCaptcha(token)
//   }

//   return <Button onClick={clickHandler}>Please validate you are a human.</Button>
// }

export const ReCaptcha = ({ onVerifyCaptcha }: any) => (
  <></>
  // <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SECRET_KEY ?? ''}>
  //   <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
  // </GoogleReCaptchaProvider>
)
