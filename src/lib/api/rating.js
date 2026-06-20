import { serverFetch, serverMutation } from "@/lib/core/server";

// GET rating
export const getPromptRating = async (id) => {
    return serverFetch(`/api/prompts/${id}/rating`);
};

// ADD / UPDATE rating
export const ratePrompt = async (id, data) => {
    return serverMutation(
        `/api/prompts/${id}/rate`,
        data,
        "POST"
    );
};