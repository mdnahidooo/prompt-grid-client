import { getAdminReports } from "@/lib/api/admin/reports";
import AdminReportsClient from "./ReportsClient";

export default async function Page() {
    const data = await getAdminReports();

    return (
        <div className="min-h-screen px-4 md:px-10 py-10">
            <div className="max-w-7xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-slate-900">
                    Reported Prompts
                </h1>
                <p className="text-slate-500 mt-1">
                    Monitor user reports and moderate content
                </p>
            </div>

            <AdminReportsClient initialData={data?.data || []} />
        </div>
    );
}