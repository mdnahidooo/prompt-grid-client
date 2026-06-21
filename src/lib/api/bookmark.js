import { serverFetch } from "@/lib/core/server";

export const fetchBookmarkStatus = async (promptId, userId) => {
    const res = await serverFetch(
        `/api/prompts/${promptId}/bookmark/${userId}`
    );

    return res?.bookmarked || false;
};


export const getUserBookmarks = async (userId) => {
    return serverFetch(`/api/bookmarks/user/${userId}`);
};