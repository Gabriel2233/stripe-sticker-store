import { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";
import { stripeDB } from "../../../utils/stripeDB";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(500).end({ message: "Only POST requests are accepted." });

  try {
    const params: Stripe.Checkout.SessionCreateParams = {};

    const checkoutSession: Stripe.Checkout.Session = await stripeDB.checkout.sessions.create(
      params
    );

    return res.status(201).json({ sessionId: checkoutSession.id });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
