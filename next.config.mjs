import withPayload from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['localhost', 'www.juicer.io', 'howson.codes', 'ellie.howson.codes'],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL,
    FRONTEND_API_URL: process.env.FRONTEND_API_URL,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
}

export default withPayload(nextConfig)
