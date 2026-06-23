import { getAdminAnalytics } from "@/lib/api/admin/analytics";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function Page() {
    const data = await getAdminAnalytics();

    return (
        <div className="min-h-screen">
            <AdminDashboardClient data={data} />
        </div>
    );
}