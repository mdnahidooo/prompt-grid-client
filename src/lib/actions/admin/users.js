"use server";

import { serverMutation } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

// UPDATE USER
export const updateUser = async (id, payload) => {
    const res = await serverMutation(
        `/api/admin/users/${id}`,
        payload,
        "PATCH"
    );

    revalidatePath("/dashboard/admin/users");
    return res;
};

// DELETE USER
export const deleteUser = async (id) => {
    const res = await serverMutation(
        `/api/admin/users/${id}`,
        {},
        "DELETE"
    );

    revalidatePath("/dashboard/admin/users");
    return res;
};