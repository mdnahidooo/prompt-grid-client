"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

export default function CreatorAnalyticsDashboard({ dashboard }) {

    const stats = dashboard?.stats || {};
    const recent = dashboard?.recentActivity || [];
    const mostPopular = dashboard?.mostPopular;

    const COLORS = ["#6366F1", "#22C55E", "#F97316", "#EF4444"];

    // ✅ REAL DATA ONLY (NO MOCK)
    const distributionData = [
        { name: "Prompts", value: stats.totalPrompts || 0 },
        { name: "Copies", value: stats.totalCopies || 0 },
        { name: "Ratings", value: stats.totalRatings || 0 }
    ];

    // Derived Insight Data (NOT MOCK, from backend stats)
    const impactData = [
        {
            label: "Avg Rating Impact",
            value: Number(stats.avgRating || 0) * 10
        },
        {
            label: "Copy Influence",
            value: stats.totalCopies || 0
        },
        {
            label: "Engagement Score",
            value: stats.engagementScore || 0
        }
    ];

    return (
        <div className="min-h-screen ">

            {/* ================= HEADER ================= */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900">
                    Creator Analytics Dashboard
                </h1>
                <p className="text-slate-500 mt-2">
                    Powered by real-time user activity & prompt performance data
                </p>
            </div>

            {/* ================= KPI CARDS ================= */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-5 mb-10">

                <KPI title="Prompts" value={stats.totalPrompts || 0} />
                <KPI title="Copies" value={stats.totalCopies || 0} />
                <KPI title="Ratings" value={stats.totalRatings || 0} />
                <KPI title="Avg Rating" value={stats.avgRating || 0} />
                <KPI title="Engagement" value={stats.engagementScore || 0} />

            </div>

            {/* ================= MAIN CHARTS ================= */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 mb-10">

                {/* PIE (REAL DISTRIBUTION) */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-4">
                        📊 Content Distribution
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={distributionData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                innerRadius={70}
                                paddingAngle={5}
                            >
                                {distributionData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* REAL IMPACT BAR */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-4">
                        ⚡ Creator Impact Score
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={impactData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366F1" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ================= INSIGHTS SECTION ================= */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

                {/* MOST POPULAR */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm">
                    <h2 className="font-semibold mb-4">🔥 Most Popular Prompt</h2>

                    {mostPopular ? (
                        <div>
                            <p className="font-medium text-slate-900">
                                {mostPopular.title}
                            </p>
                            <p className="text-sm text-slate-500 mt-2">
                                Copies: {mostPopular.copyCount || 0}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">No data available</p>
                    )}
                </div>

                {/* REAL RECENT ACTIVITY */}
                <div className="md:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">
                    <h2 className="font-semibold mb-4">🕒 Recent Activity</h2>

                    <div className="space-y-4">
                        {recent.length === 0 ? (
                            <p className="text-sm text-slate-500">
                                No activity yet
                            </p>
                        ) : (
                            recent.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between border-b pb-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            {item.title || "Prompt copied"}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            User interaction recorded
                                        </p>
                                    </div>

                                    <span className="text-xs text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= KPI CARD ================= */
function KPI({ title, value }) {
    return (
        <div className="bg-white border rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <p className="text-xs text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {value}
            </h3>
        </div>
    );
}