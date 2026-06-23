import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import { getCreatorDashboard } from "@/lib/api/creators";
import CreatorAnalyticsDashboard from "./CreatorAnalyticsDashboard";

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
        <div className="min-h-screen px-4">

            <CreatorAnalyticsDashboard dashboard={dashboard} />

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