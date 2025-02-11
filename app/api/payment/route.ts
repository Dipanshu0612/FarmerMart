import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("No STRIPE_SECRET_KEY found");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const { products_data } = await req.json();
    const products = products_data as ProductType[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineItems = products.map((item:any) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.media[0]],
          },
          unit_amount: item.selling_price * 100,
        },
        quantity: item.quantity || 1,
      };
    }); 

    const shippingRate = await stripe.shippingRates.create({
      display_name: "Delivery Charges",
      type: "fixed_amount",
      fixed_amount: {
        amount: 50 * 100,
        currency: "inr",
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/checkout/success`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        {
          shipping_rate: shippingRate.id,
        },
      ],
    });
    
    if (session.url) {
      return NextResponse.json({ url: session.url });
    } else {
      throw new Error("Session URL is null");
    }
  } catch (err: unknown) {
    console.error("Stripe API error:", err);
    return NextResponse.json(
      { error: "Payment session creation failed" },
      { status: 500 }
    );
  }
};
