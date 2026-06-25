import { protectedServerFetch } from "@/lib/core/getTokenServer";
// import { serverFetch } from "@/lib/core/server";

/* =========================
   GET ALL REPORTS
========================= */
export const getAdminReports = async (queryString = "") => {
    return protectedServerFetch(`/api/admin/reports?${queryString}`);
};

/* =========================
   GET SINGLE REPORT
========================= */
export const getReportedPromptById = async (id) => {
    return protectedServerFetch(`/api/admin/reports/${id}`);
};