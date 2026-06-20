import { serverFetch } from "@/lib/core/server";

export const getAdminPrompts = async () => {
    return serverFetch("/api/admin/prompts");
};