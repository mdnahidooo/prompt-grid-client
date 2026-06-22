import { serverFetch } from "@/lib/core/server";

// GET COPIED PROMPTS + STATS
export const getCopiedPrompts = async (userId) => {
    return serverFetch(`/api/user/copied-prompts?userId=${userId}`);
};

