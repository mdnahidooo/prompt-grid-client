import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";


export async function POST() {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const userSession = await auth.api.getSession({
            headers: await headers(),
        });

        const user = userSession?.user;
        console.log(user);
        const PRICE_ID = "price_1Tl1Z45Wf1iVfbePvtAMFo9f";

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                priceId: PRICE_ID,
                userId: user.id,
                userEmail: user.email,
            },
            mode: "payment",
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: "hello from subscription api route" });
}