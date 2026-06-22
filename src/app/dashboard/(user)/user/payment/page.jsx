import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@heroui/react";

export default async function PaymentPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/auth/signin");

    const user = session.user;
    const isPremium = (user.plan || "free").toLowerCase() === "premium";

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">

            {/* HEADER */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-black">
                    Upgrade to Premium
                </h1>
                <p className="text-sm text-gray-500">
                    Unlock all premium prompts and boost your productivity
                </p>
            </div>

            {/* PLAN CARD */}
            <div className="bg-white border rounded-3xl shadow-sm p-8 space-y-6">

                {/* PRICE BOX */}
                <div className="text-center space-y-2">
                    <h2 className="text-5xl font-black text-[#306D29]">
                        $5
                    </h2>
                    <p className="text-sm text-gray-500">
                        One-time payment — lifetime access
                    </p>
                </div>

                {/* BENEFITS */}
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        ✔ Access all private prompts
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        ✔ Unlimited copy feature
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        ✔ Premium badge on profile
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        ✔ Priority updates
                    </div>
                </div>

                {/* STATUS */}
                <div className="text-center pt-4">
                    {isPremium ? (
                        <div className="space-y-2">
                            <p className="text-green-600 font-bold text-lg">
                                ✔ You are already a Premium User
                            </p>
                            <p className="text-xs text-gray-500">
                                Enjoy all unlocked features 🎉
                            </p>

                            <Button
                                disabled
                                className="bg-green-100 text-green-700 font-bold px-6 py-2 rounded-xl cursor-not-allowed"
                            >
                                Active Plan
                            </Button>
                        </div>
                    ) : (
                        <form action="/api/subscription" method="POST">
                            <Button
                                type="submit"
                                className="bg-[#306D29] hover:bg-[#24521f] text-white font-bold px-8 py-3 rounded-xl transition-all"
                            >
                                Pay $5 & Unlock Premium
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            {/* INFO NOTE */}
            <div className="text-center text-xs text-gray-400">
                Secure payment powered by Stripe • One-time payment • No hidden fees
            </div>
        </div>
    );
}