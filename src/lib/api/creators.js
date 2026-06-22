import { serverFetch } from "@/lib/core/server";

export const getTopCreators = async () => {
    return serverFetch("/api/creators/top");
};

export const getCreatorDashboard = async (userId) => {
    return serverFetch(`/api/creator/dashboard?userId=${userId}`);
};