import { serverFetch } from "@/lib/core/server";

export const getAdminUsers = async () => {
    return serverFetch("/api/admin/users");
};