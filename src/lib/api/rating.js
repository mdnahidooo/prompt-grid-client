import { serverFetch } from "@/lib/core/server";

export const getPromptRating = async (id) => {
    const res = await serverFetch(`/api/prompts/${id}/rating`);

    return {
        avg: res?.avg || 0,
        count: res?.count || 0,
        reviews: res?.reviews || [],
    };
};

