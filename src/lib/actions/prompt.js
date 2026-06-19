"use server";

import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
    return await serverMutation('/api/prompts', newPromptData);
};