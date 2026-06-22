import { serverFetch } from "@/lib/core/server";

export const getAllReviews = async () => {
    return await serverFetch("/api/reviews/all");
};


export const getMyReviews = async (userId) => {
    return serverFetch(`/api/reviews/my?userId=${userId}`);
};