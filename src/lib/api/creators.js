import { serverFetch } from "@/lib/core/server";

export const getTopCreators = async () => {
    return serverFetch("/api/creators/top");
};