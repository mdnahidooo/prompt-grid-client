"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
    return await serverMutation('/api/prompts', newPromptData);
};


// Update prompt status or content
export const updatePrompt = async (id, data) => {
    const result = await serverMutation(`/api/prompts/${id}`,data,'PATCH');
    revalidatePath('/dashboard/creator/my-prompts');

    return result;
};

// Delete a specific prompt
export const deletePrompt = async (id) => {
    const result = await serverMutation(`/api/prompts/${id}`,{},"DELETE");
    revalidatePath("/dashboard/creator/my-prompts");

    return result;
};

export const incrementCopyCount = async (id) => {
    const result = await serverMutation(
        `/api/prompts/${id}/copy`,
        {},
        "PATCH"
    );

    // optional: if you show copy count in dashboard or details cache
    revalidatePath(`/prompts`);

    return result;
};