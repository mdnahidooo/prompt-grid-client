"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export const incrementCopyCount = async (id, payload) => {
    const result = await serverMutation(
        `/api/prompts/${id}/copy`,
        payload,
        "PATCH"
    );
    revalidatePath("/dashboard/creator/my-prompts");
    return result;
};


// DELETE SINGLE COPIED ITEM
export const deleteCopiedPrompt = async (id) => {
    const result = await serverMutation(
        `/api/user/copied-prompts/${id}`,
        {},
        "DELETE"
    );

    revalidatePath("/dashboard/user/copied-prompts");

    return result;
};

// CLEAR ALL HISTORY
export const clearCopiedHistory = async (userId) => {
    const result = await serverMutation(
        `/api/user/copied-prompts?userId=${userId}`,
        {},
        "DELETE"
    );

    revalidatePath("/dashboard/user/copied-prompts");

    return result;
};