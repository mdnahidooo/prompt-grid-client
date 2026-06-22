import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";
import { getCopiedPrompts } from "@/lib/api/copied-prompts";

export default async function UserProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/auth/signin");

    const user = session.user;

    // ONLY YOUR WORKING COPY SYSTEM
    const copyRes = await getCopiedPrompts(user.id);
    const totalCopy = copyRes?.stats?.totalCopy || 0;

    // PLAN FIX (force latest value from session)
    const plan = (user.plan || "free").toLowerCase();
    const isPremium = plan === "premium";

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-black text-black">
                    My Profile
                </h1>
                <p className="text-sm text-black/60">
                    Manage your account & subscription
                </p>
            </div>

            {/* PROFILE CARD */}
            <div className="bg-white border rounded-3xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">

                {/* IMAGE */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border bg-gray-50">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-black text-[#306D29]">
                            {user.name?.[0]?.toUpperCase()}
                        </div>
                    )}
                </div>

                {/* USER INFO */}
                <div className="flex-1 space-y-2">

                    <h2 className="text-2xl font-black text-black">
                        {user.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>

                    {/* EXTRA USER INFO */}
                    <div className="text-xs text-gray-500 space-y-1 pt-1">
                        <p>📅 Joined: {new Date(user.createdAt).toDateString()}</p>
                    </div>

                    {/* BADGES */}
                    <div className="flex flex-wrap gap-2 pt-3">

                        <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                            Role: {user.role}
                        </span>

                        <span className={`px-3 py-1 text-xs rounded-full font-bold
                            ${isPremium
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {isPremium ? "Premium User" : "Free Plan"}
                        </span>

                        <span className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                            Copied: {totalCopy}
                        </span>

                    </div>
                </div>

                {/* UPGRADE SECTION (FIXED UI ISSUE) */}
                <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-black/5 sm:pl-6 flex flex-col items-center sm:items-start gap-2">

                    {!isPremium ? (
                        <>
                            <div className="text-center sm:text-left">
                                <h4 className="text-xs font-black text-amber-700 uppercase">
                                    Unlock Premium
                                </h4>
                                <p className="text-[11px] text-black/50 mt-1">
                                    Get full access for $5 only
                                </p>
                            </div>

                            <form action="/api/subscription" method="POST">
                                <Button
                                    type="submit"
                                    className="bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-amber-700 w-full sm:w-auto"
                                >
                                    Upgrade to Premium
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center sm:items-start gap-2">
                            <div className="text-green-600 font-black text-sm">
                                ✔ You are Premium User
                            </div>

                            <button
                                disabled
                                className="bg-green-100 text-green-700 text-xs px-4 py-2 rounded-xl cursor-not-allowed font-bold"
                            >
                                Already Upgraded
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* STATS (NO EXTRA API USED) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="bg-white border rounded-2xl p-5">
                    <p className="text-xs text-gray-500">Total Copied Prompts</p>
                    <h2 className="text-3xl font-black">{totalCopy}</h2>
                </div>

                <div className="bg-white border rounded-2xl p-5">
                    <p className="text-xs text-gray-500">Account Status</p>
                    <h2 className="text-xl font-black">
                        {isPremium ? "Premium Active" : "Free Account"}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                        {isPremium
                            ? "All features unlocked"
                            : "Upgrade to unlock premium prompts"}
                    </p>
                </div>

            </div>
        </div>
    );
}