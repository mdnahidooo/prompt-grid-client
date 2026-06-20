import { serverFetch } from "@/lib/core/server";

// Creator fetch rejection feedback for their prompt
export const getRejectionFeedback = async (promptId) => {
    if (!promptId) return null;

    return serverFetch(`/api/feedback/${promptId}`);
};