import { serverFetch, serverMutation } from "@/lib/core/server";

// CHECK STATUS
export const getBookmarkStatus = async (promptId, userId) => {
    const res = await serverFetch(
        `/api/prompts/${promptId}/bookmark/${userId}`
    );

    return res?.bookmarked || false;
};

// ADD BOOKMARK
export const addBookmark = async (promptId, userId) => {
    return serverMutation(
        `/api/prompts/${promptId}/bookmark`,
        { userId },
        "POST"
    );
};

// REMOVE BOOKMARK
export const removeBookmark = async (promptId, userId) => {
    return serverMutation(
        `/api/prompts/${promptId}/bookmark/${userId}`,
        {},
        "DELETE"
    );
};

