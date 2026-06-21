import { serverMutation } from "@/lib/core/server";

export const submitReport = async (id, data) => {
    return serverMutation(
        `/api/prompts/${id}/report`,
        data,
        "POST"
    );
};