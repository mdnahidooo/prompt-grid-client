import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import EditProfileModal from "./EditProfileModal";
import { getCreatorDashboard } from "@/lib/api/creators";

export default async function CreatorProfilePage() {
    const user = await getUserSession();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-500">
                Please login to view profile
            </div>
        );
    }

    const dashboard = await getCreatorDashboard(user.id);
    console.log(dashboard); // 👈 MUST check this

    const stats = dashboard?.stats || {};
    const mostPopular = dashboard?.mostPopular;
    const recent = dashboard?.recentActivity || [];

    return (
        <div className="min-h-screen py-10 px-4">

            <div className="max-w-5xl mx-auto space-y-6">

                {/* ================= HERO CARD ================= */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                        {/* AVATAR */}
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600">

                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                user.name?.[0]
                            )}

                        </div>

                        {/* INFO */}
                        <div className="flex-1 text-center md:text-left">

                            <h1 className="text-2xl font-bold text-slate-900">
                                {user.name}
                            </h1>

                            <p className="text-slate-500 text-sm">
                                {user.email}
                            </p>

                            <div className="flex gap-2 mt-3 justify-center md:justify-start">
                                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 border">
                                    {user.role || "creator"}
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
                                    {user.plan || "free"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <EditProfileModal user={user} />
                    </div>
                </div>

                {/* ================= STATS GRID ================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <StatCard label="Prompts" value={stats.totalPrompts || 0} />
                    <StatCard label="Copies" value={stats.totalCopies || 0} />
                    <StatCard label="Ratings" value={stats.totalRatings || 0} />
                    <StatCard label="Avg Rating" value={stats.avgRating || 0} />

                </div>

                {/* ================= INSIGHTS ================= */}
                <div className="grid md:grid-cols-2 gap-4">

                    {/* Engagement */}
                    <div className="bg-white border rounded-2xl p-5">
                        <p className="text-sm text-slate-500">Engagement Score</p>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {stats.engagementScore || 0}
                        </h2>
                    </div>

                    {/* Most Popular */}
                    <div className="bg-white border rounded-2xl p-5">
                        <p className="text-sm text-slate-500">Most Popular Prompt</p>
                        <h3 className="font-semibold text-slate-900 mt-1">
                            {mostPopular?.title || "No data"}
                        </h3>
                        <p className="text-xs text-slate-500">
                            Copies: {mostPopular?.copyCount || 0}
                        </p>
                    </div>
                </div>

                {/* ================= RECENT ACTIVITY ================= */}
                <div className="bg-white border rounded-2xl p-5">
                    <h2 className="font-semibold text-slate-900 mb-4">
                        Recent Activity
                    </h2>

                    {recent.length === 0 ? (
                        <p className="text-sm text-slate-500">No activity yet</p>
                    ) : (
                        <div className="space-y-3">
                            {recent.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between text-sm border-b pb-2"
                                >
                                    <span className="text-slate-700">
                                        Prompt copied
                                    </span>
                                    <span className="text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* SMALL UI COMPONENT */
function StatCard({ label, value }) {
    return (
        <div className="bg-white border rounded-2xl p-5 text-center">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
    );
}