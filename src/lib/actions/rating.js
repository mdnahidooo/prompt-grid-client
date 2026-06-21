import { serverMutation } from "../core/server";

// ADD / UPDATE rating
export const ratePrompt = async (id, data) => {
    return serverMutation(
        `/api/prompts/${id}/rate`,
        data,
        "POST"
    );
};