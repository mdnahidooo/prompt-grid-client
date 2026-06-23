import { serverFetch } from "@/lib/core/server";

/* =========================
   GET ALL REPORTS
========================= */
export const getAdminReports = async (queryString = "") => {
    return serverFetch(`/api/admin/reports?${queryString}`);
};

/* =========================
   GET SINGLE REPORT
========================= */
export const getReportedPromptById = async (id) => {
    return serverFetch(`/api/admin/reports/${id}`);
};