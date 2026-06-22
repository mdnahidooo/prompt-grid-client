import { serverFetch } from "@/lib/core/server";

export const getAllReviews = async () => {
    return await serverFetch("/api/reviews/all");
};