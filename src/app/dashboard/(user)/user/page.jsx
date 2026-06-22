import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";

export default async function UserProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/signin");
    }

    const { user } = session;

    // 🔥 FETCH USER STATS FROM DB (you should replace with real API)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/stats?userId=${user.id}`,
        { cache: "no-store" }
    );

    const stats = await res.json();

    const totalCopy = stats?.totalCopy || 0;
    const totalPrompts = stats?.totalPrompts || 0;
    const totalBookmarks = stats?.bookmarks || 0;

    const currentPlan = user.plan || "free";

    return (
        <div className="space-y-6 max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="border-b border-[#306D29]/10 pb-4">
                <h1 className="text-2xl font-black text-black">
                    Account Profile
                </h1>
                <p className="text-xs text-black/60">
                    Manage your account, plan, and activity overview
                </p>
            </div>

            {/* PROFILE CARD */}
            <div className="bg-white border border-[#306D29]/10 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">

                {/* IMAGE */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#306D29]/20 bg-[#306D29]/5">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-black text-[#306D29]">
                            {user.name?.[0]?.toUpperCase()}
                        </div>
                    )}
                </div>

                {/* INFO */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                    <h2 className="text-lg font-black text-black">
                        {user.name}
                    </h2>
                    <p className="text-xs text-black/60">{user.email}</p>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">

                        <span className="text-[10px] px-2 py-1 rounded bg-[#306D29]/10 text-[#306D29] font-bold uppercase">
                            Role: {user.role}
                        </span>

                        <span
                            className={`text-[10px] px-2 py-1 rounded font-bold uppercase border ${currentPlan === "premium"
                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                    : "bg-gray-100 text-gray-600 border-gray-200"
                                }`}
                        >
                            Plan: {currentPlan}
                        </span>

                        <span className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-600 font-bold uppercase">
                            ID: {user.id}
                        </span>
                    </div>
                </div>

                {/* UPGRADE SECTION */}
                <div className="w-full sm:w-auto">
                    {currentPlan === "free" ? (
                        <form action="/api/subscription" method="POST">
                            <Button
                                type="submit"
                                className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-700 w-full"
                            >
                                Upgrade to Premium ($5)
                            </Button>
                        </form>
                    ) : (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold text-center">
                            You are Premium User ✔
                        </div>
                    )}
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="p-5 bg-white border rounded-2xl shadow-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase">
                        Total Prompts
                    </p>
                    <h2 className="text-3xl font-black mt-2">{totalPrompts}</h2>
                </div>

                <div className="p-5 bg-white border rounded-2xl shadow-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase">
                        Total Copy
                    </p>
                    <h2 className="text-3xl font-black mt-2">{totalCopy}</h2>
                </div>

                <div className="p-5 bg-white border rounded-2xl shadow-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase">
                        Bookmarks
                    </p>
                    <h2 className="text-3xl font-black mt-2">{totalBookmarks}</h2>
                </div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-white border rounded-2xl p-5">
                <h3 className="text-sm font-bold mb-3">Account Info</h3>

                <div className="text-xs text-gray-600 space-y-1">
                    <p>📧 Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
                    <p>📅 Created: {new Date(user.createdAt).toDateString()}</p>
                    <p>🔐 Role: {user.role}</p>
                    <p>💳 Plan: {currentPlan}</p>
                </div>
            </div>
        </div>
    );
}