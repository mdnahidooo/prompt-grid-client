import { protectedServerFetch } from "@/lib/core/getTokenServer";


/* =========================================
   GET ADMIN ANALYTICS DASHBOARD DATA
========================================= */
export const getAdminAnalytics = async (queryString = "") => {
    return protectedServerFetch(`/api/admin/analytics?${queryString}`);
};