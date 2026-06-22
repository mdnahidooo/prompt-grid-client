import { serverFetch } from "@/lib/core/server";

export const getAllReviews = async () => {
    return await serverFetch("/api/reviews/all");
};


export const getMyReviews = async (userId) => {
    if (!userId) {
        throw new Error("userId is required");
    }

    return serverFetch(`/api/user/reviews?userId=${userId}`);
};