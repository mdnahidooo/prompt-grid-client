import { serverFetch } from "@/lib/core/server";

export const getUserStats = async (userId) => {
    return serverFetch(`/api/user/stats?userId=${userId}`);
};