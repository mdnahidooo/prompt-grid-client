import { protectedServerFetch } from "@/lib/core/getTokenServer";


export const getAdminPrompts = async () => {
    return protectedServerFetch("/api/admin/prompts");
};