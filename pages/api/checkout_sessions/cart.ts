import { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";
import { stripeDB } from "../../../utils/stripeDB";
import { validateCartItems } from "use-shopping-cart/src/serverUtil";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(500).end({ message: "Only POST requests are accepted." });

  try {
    const cartItems = req.body;

    const products = await stripeDB.products.list();

    const prices = await stripeDB.prices.list();

    const productsAndPrices = products.data.map((product) => {
      const price = prices.data.find((price) => price.product === product.id);

      const productWithPrice = {
        ...product,
        price: price.unit_amount,
        sku: price.id,
        currency: "usd",
      };

      return productWithPrice;
    });

    const line_items = validateCartItems(productsAndPrices, cartItems);

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      submit_type: "pay",
      line_items,
      cancel_url: `${process.env.SITE_URL}/cart`,
      success_url: `${process.env.SITE_URL}/success`,
    };

    const checkoutSession: Stripe.Checkout.Session = await stripeDB.checkout.sessions.create(
      params
    );

    return res.status(201).json(checkoutSession);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
