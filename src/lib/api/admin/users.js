import { protectedServerFetch } from "@/lib/core/getTokenServer";


export const getAdminUsers = async () => {
    return protectedServerFetch("/api/admin/users");
};