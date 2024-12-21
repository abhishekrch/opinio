import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
  let customer;
  if (userSubscription) {
    //updating user subscription or get the stripe customer
    customer = {
      id: userSubscription.stripeCustomerId,
    };
  } else {
    // creating the user subscription
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: userId,
      },
    };

    const response = await stripe.customers.create(customerData);

    customer = { id: response.id };

    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: customer.id,
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!customer?.id) {
    return new Response(
      JSON.stringify({ error: "Failed to get a customer id" }),
      { status: 500 }
    );
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${baseUrl}/payments`,
    });

    if (session?.url) {
      return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to create a portal" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create a portal" }),
      { status: 500 }
    );
  }
}
