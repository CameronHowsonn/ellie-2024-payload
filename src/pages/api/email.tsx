import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, message } = req.body

  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const messageBody = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `

  const mailOptions = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: 'Contact Form Submission',
    text: messageBody,
  }

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        res.status(500).json({ status: 'Error' })
        throw new Error('Error sending email')
      } else {
        res.status(200).json({ status: 'OK' })
      }
    })

    res.status(200).json({ status: 'OK' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'Error' })
  }
}
