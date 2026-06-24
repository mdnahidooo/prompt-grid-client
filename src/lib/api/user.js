import { serverFetch } from "@/lib/core/server";

export const getUserStats = async (userId) => {
    return serverFetch(`/api/user/stats?userId=${userId}`);
};



// try to solve payment by this: 

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/* GET CURRENT USER (FRESH FROM DB) */
export const getCurrentUser = async (userId) => {
    const res = await fetch(`${baseUrl}/api/user/me?userId=${userId}`, {
        cache: "no-store"
    });

    return res.json();
};