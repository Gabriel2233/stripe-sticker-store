import { NextApiResponse, NextApiRequest } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(500).end({ message: 'Only POST requests are accepted.' });

  try {
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
