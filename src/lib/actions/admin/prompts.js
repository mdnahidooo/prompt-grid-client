"use server";

import { serverMutation } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { revalidatePath } from "next/cache";

// Approve prompt
export const approvePrompt = async (id) => {
    const res = await serverMutation(
        `/api/admin/prompts/${id}/status`,
        { status: "approved" },
        "PATCH"
    );

    revalidatePath("/dashboard/admin/prompts");
    return res;
};

// Reject prompt
export const rejectPrompt = async (data, id) => {
    const res = await serverMutation(
        `/api/admin/prompts/${id}/reject`,
        data,
        "PATCH"
    );

    revalidatePath("/dashboard/admin/prompts");

    return res;
};

// Toggle feature
export const toggleFeature = async (id, current) => {
    const res = await serverMutation(
        `/api/admin/prompts/${id}/feature`,
        { isFeatured: !current },
        "PATCH"
    );

    revalidatePath("/dashboard/admin/prompts");
    return res;
};


// Delete prompt
export const deletePrompt = async (id) => {
    const user = await getUserSession();

    // ❌ BLOCK NON-ADMINS
    if (!user || user.role !== "admin") {
        throw new Error("Unauthorized: Admin only action");
    }

    const res = await serverMutation(
        `/api/prompts/${id}`,
        {},
        "DELETE"
    );

    revalidatePath("/dashboard/admin/prompts");

    return res;
};