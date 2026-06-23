import { serverFetch } from "@/lib/core/server";

/* =========================================
   GET ADMIN ANALYTICS DASHBOARD DATA
========================================= */
export const getAdminAnalytics = async (queryString = "") => {
    return serverFetch(`/api/admin/analytics?${queryString}`);
};