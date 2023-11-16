import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../lib/prisma'
import logger from "../../../Logger"

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err)
      logger.error(`Webhook error: ${errorMessage}`)
      console.log(`❌ Error message: ${errorMessage}`)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // Cast event data to Stripe object.
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      )
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge
      console.log(`💵 Charge id: ${charge.id}`)
    } else if (event.type === 'checkout.session.completed') {
        const fulfill = event.data.object as Stripe.Checkout.Session
        const projectId: number | null = +fulfill.metadata!.projectId
        const price: number = +fulfill.amount_subtotal!
        const userEmail = fulfill.metadata!.userEmail
        console.log(userEmail)
        const projectRaised = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                raise_amt: true
            }
        })
        const updateProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                raise_amt: price+projectRaised!.raise_amt
            }
        })

        const userProjects = await prisma.user.findUnique({
          where: {
            email: userEmail
          },
          select: {
            investedProjects: true
          }
        })
        const newList = [...new Set([...userProjects?.investedProjects!, projectId])]
        const updateList = await prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            investedProjects: newList
          }
        })

    } else {
      logger.warn(`Unhandled event type: ${event.type}`)
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)

    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    logger.notice('Non POST Request made to Stripe Webhook API')
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler as any)
