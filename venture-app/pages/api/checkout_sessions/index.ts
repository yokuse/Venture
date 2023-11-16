import { NextApiRequest, NextApiResponse } from 'next'

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
import { formatAmountForStripe } from '../../../utils/stripe-helpers'
import logger from "../../../Logger"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount
    const projId: number = req.body.projId
    const userEmail: string = req.body.userEmail
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: CURRENCY,
                unit_amount: formatAmountForStripe(amount, CURRENCY),
                product_data: {
                    name: 'Custom amount donation',
                },
            },
            quantity: 1, 
        }],
        metadata: {projectId : projId, userEmail: userEmail},
        mode: 'payment',
        //success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${req.headers.origin}/result`,
        cancel_url: `${req.headers.origin}/`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)
      logger.info(`CheckoutSession created successfully`)
      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      logger.error(`CheckoutSession create failed: ${errorMessage}`)
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    logger.notice('Non POST Request made to CheckoutSession API')
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
