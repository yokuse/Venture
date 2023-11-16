import { Stripe, loadStripe } from '@stripe/stripe-js';


const getStripe = () => {
  let stripePromise: Promise<Stripe|null>;
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  return stripePromise;
};

export default getStripe;