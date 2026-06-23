"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    CartesianGrid
} from "recharts";

export default function AdminDashboardClient({ data }) {

    const overview = data?.overview || {};
    const users = data?.users || {};
    const content = data?.content || {};
    const reports = data?.reports || {};
    const subscriptions = data?.subscriptions || {};
    const ratings = data?.ratings || {};

    // COLORS
    const COLORS = ["#6366F1", "#22C55E", "#F97316", "#EF4444", "#8B5CF6"];

    // USER PIE
    const userPie = [
        { name: "Free", value: users.free || 0 },
        { name: "Premium", value: users.premium || 0 }
    ];

    // ROLE PIE
    const rolePie = [
        { name: "Creators", value: users.creators || 0 },
        { name: "Users", value: users.total - users.creators || 0 }
    ];

    // CONTENT BAR
    const contentBar = [
        { name: "Approved", value: content.approved || 0 },
        { name: "Pending", value: content.pending || 0 },
        { name: "Rejected", value: content.rejected || 0 },
        { name: "Hidden", value: content.hidden || 0 }
    ];

    // REPORT PIE
    const reportPie = [
        { name: "Pending", value: reports.pending || 0 },
        { name: "Dismissed", value: reports.dismissed || 0 },
        { name: "Removed", value: reports.removed || 0 }
    ];

    // SUBSCRIPTION
    const revenueData = [
        { name: "Revenue", value: subscriptions.revenue || 0 },
        { name: "Paid Users", value: subscriptions.paidUsers || 0 }
    ];

    return (
        <div className="px-6 md:px-10 py-8">

            {/* ================= HEADER ================= */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Admin Analytics Dashboard
                </h1>
                <p className="text-slate-500 mt-2">
                    System overview, engagement & SaaS insights
                </p>
            </div>

            {/* ================= KPI CARDS ================= */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">

                <KPI title="Users" value={overview.totalUsers} />
                <KPI title="Prompts" value={overview.totalPrompts} />
                <KPI title="Reviews" value={overview.totalReviews} />
                <KPI title="Copies" value={overview.totalCopies} />
                <KPI title="Bookmarks" value={overview.totalBookmarks} />

            </div>

            {/* ================= USER ANALYTICS ================= */}
            <SectionTitle title="User Analytics" />

            <div className="grid md:grid-cols-2 gap-6 mb-10">

                <ChartBox title="Free vs Premium Users">
                    <PieChart width={300} height={250}>
                        <Pie data={userPie} dataKey="value" outerRadius={90}>
                            {userPie.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartBox>

                <ChartBox title="Role Distribution">
                    <PieChart width={300} height={250}>
                        <Pie data={rolePie} dataKey="value" outerRadius={90}>
                            {rolePie.map((_, i) => (
                                <Cell key={i} fill={COLORS[i + 2]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartBox>

            </div>

            {/* ================= CONTENT ================= */}
            <SectionTitle title="Content Analytics" />

            <div className="bg-white p-6 rounded-2xl border mb-10">

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={contentBar}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366F1" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

            </div>

            {/* ================= REPORTS ================= */}
            <SectionTitle title="Reports Overview" />

            <div className="grid md:grid-cols-2 gap-6 mb-10">

                <ChartBox title="Report Status">
                    <PieChart width={300} height={250}>
                        <Pie data={reportPie} dataKey="value" outerRadius={90}>
                            {reportPie.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartBox>

                <div className="bg-white border rounded-2xl p-6">
                    <h2 className="font-semibold mb-4">System Health</h2>

                    <div className="space-y-3 text-sm">

                        <Stat label="Report Rate" value={`${reports.total || 0}`} />
                        <Stat label="Active Users" value={users.total || 0} />
                        <Stat label="Avg Rating" value={ratings.avgRating || 0} />

                    </div>
                </div>

            </div>

            {/* ================= REVENUE ================= */}
            <SectionTitle title="SaaS Revenue" />

            <div className="bg-white border rounded-2xl p-6">

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22C55E"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}

/* ================= KPI ================= */
function KPI({ title, value }) {
    return (
        <div className="bg-white border rounded-2xl p-4 text-center shadow-sm">
            <p className="text-xs text-slate-500">{title}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
    );
}

/* ================= SECTION TITLE ================= */
function SectionTitle({ title }) {
    return (
        <h2 className="text-xl font-bold text-slate-900 mb-4 mt-2">
            {title}
        </h2>
    );
}

/* ================= CHART BOX ================= */
function ChartBox({ title, children }) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">{title}</h3>
            {children}
        </div>
    );
}

/* ================= STAT ================= */
function Stat({ label, value }) {
    return (
        <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">{label}</span>
            <span className="font-semibold text-slate-900">{value}</span>
        </div>
    );
}