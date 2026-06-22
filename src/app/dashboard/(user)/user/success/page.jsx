
import { subscription } from '@/lib/actions/payment'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { ArrowLeft, CheckCircle2, Crown } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'



export default async function Success({ searchParams }) {
    const { session_id } = await searchParams
    
    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    console.log(metadata);

    if (status === 'open') {
        return redirect('/dashboard/user')
    }
    

    if (status === 'complete') {

        await subscription({
            sessionId: session_id,
            userId: metadata.userId,
            userEmail: metadata.userEmail,
            priceId: metadata.priceId,
            amount: metadata.amount,
        });

        // await auth.api.updateUser({
        //     headers: await headers(),
        //     body: {
        //         plan: "premium"
        //     },
        // });

        // revalidatePath('/dashboard/user');
        

        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
                <div className="max-w-2xl w-full bg-white border border-[#059669]/10 rounded-3xl shadow-sm overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-linear-to-r from-[#059669] to-[#047857] p-8 text-center text-white">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                                <CheckCircle2 size={42} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black">
                            Payment Successful 🎉
                        </h1>

                        <p className="mt-2 text-white/80 text-sm">
                            Welcome to Premium Membership
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8">

                        <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl p-4 mb-6">
                            <Crown className="text-[#059669]" size={22} />
                            <div>
                                <h3 className="font-bold text-black">
                                    Premium Access Activated
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Your account has been upgraded successfully.
                                </p>
                            </div>
                        </div>

                        {/* Transaction Summary */}
                        <div className="space-y-4 border rounded-2xl p-5 bg-gray-50">

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Payment Status
                                </span>
                                <span className="font-semibold text-green-600">
                                    Successful
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Plan
                                </span>
                                <span className="font-semibold">
                                    Premium
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Amount
                                </span>
                                <span className="font-semibold">
                                    $5 USD
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Email
                                </span>
                                <span className="font-semibold truncate max-w-55">
                                    {customerEmail}
                                </span>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mt-8">
                            <h3 className="font-bold text-black mb-4">
                                Premium Benefits Unlocked
                            </h3>

                            <div className="grid gap-3">

                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#059669]"
                                    />
                                    Access all private prompts
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#059669]"
                                    />
                                    Unlimited prompt copying
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#059669]"
                                    />
                                    Premium creator content
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#059669]"
                                    />
                                    Priority future features
                                </div>

                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8">

                            <Link
                                href="/dashboard/user"
                                className="flex-1"
                            >
                                <button className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold transition">
                                    Go to Profile
                                </button>
                            </Link>

                            <Link
                                href="/prompts"
                                className="flex-1"
                            >
                                <button className="w-full py-3 rounded-xl border font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                    <ArrowLeft size={16} />
                                    Browse Prompts
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}