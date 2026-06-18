import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function UserProfilePage() {
    // 1. Fetch user data directly from MongoDB session payload
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/signin");
    }

    const { user } = session;

    // 2. Fallback placeholder stats (Aggregate these dynamically via MongoDB later)
    const totalPromptsCount = 0;
    const currentPlan = user.plan || "free"; // Default to 'free' matching auth config

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header section */}
            <div className="border-b border-[#306D29]/10 pb-4">
                <h1 className="text-2xl font-black tracking-tight text-black">Account Profile</h1>
                <p className="text-xs text-black/60">Manage your subscription, view platform metrics, and control account states.</p>
            </div>

            {/* Profile Detail Card */}
            <div className="bg-white border border-[#306D29]/10 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                {/* Profile Photo via Next.js Image component */}
                <div className="relative w-24 h-24 rounded-2xl border-2 border-[#306D29]/20 overflow-hidden bg-[#306D29]/5 shrink-0">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Profile"}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-black text-2xl text-[#306D29]">
                            {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                    )}
                </div>

                {/* Identity Metadata Fields */}
                <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                    <h2 className="text-lg font-black text-black truncate">{user.name}</h2>
                    <p className="text-xs text-black/60 font-mono truncate">{user.email}</p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                        <span className="text-[10px] uppercase font-black tracking-wider bg-[#306D29]/10 text-[#306D29] px-2 py-0.5 rounded-md">
                            Role: {user.role || "User"}
                        </span>
                        <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md ${currentPlan === "premium"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-black/5 text-black/60"
                            }`}>
                            Plan: {currentPlan}
                        </span>
                    </div>
                </div>

                {/* Requirement-specific dynamic premium CTA upgrade card */}
                {currentPlan === "free" && (
                    <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-black/5 sm:pl-6 flex flex-col items-center sm:items-start gap-2">
                        <div className="text-center sm:text-left">
                            <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider">Unlock Pro Access</h4>
                            <p className="text-[11px] text-black/50 mt-0.5 max-w-45">Gain entry to premium locked prompts for just $5.</p>
                        </div>
                        <Link
                            href="/dashboard/payment"
                            className="w-full sm:w-auto text-center text-xs font-black bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
                        >
                            Upgrade to Premium
                        </Link>
                    </div>
                )}
            </div>

            {/* General Profile Overview Grid Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-black/5 rounded-2xl shadow-sm">
                    <h3 className="text-xs font-black uppercase text-black/40 tracking-wider">Total Submissions</h3>
                    <p className="text-3xl font-black mt-2 text-black">{totalPromptsCount}</p>
                    <p className="text-[10px] text-black/50 mt-1">
                        {currentPlan === "free" ? `${3 - totalPromptsCount} free slots remaining` : "Unlimited premium slots"}
                    </p>
                </div>

                <div className="p-5 bg-white border border-black/5 rounded-2xl shadow-sm">
                    <h3 className="text-xs font-black uppercase text-black/40 tracking-wider">Account Tier Status</h3>
                    <p className="text-3xl font-black mt-2 capitalize text-black">{currentPlan}</p>
                    <p className="text-[10px] text-black/50 mt-1">
                        {currentPlan === "premium" ? "Full access unlocked" : "Standard platform user restrictions apply"}
                    </p>
                </div>
            </div>
        </div>
    );
}