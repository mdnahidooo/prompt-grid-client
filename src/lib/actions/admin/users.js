"use server";

import { serverMutationWithToken } from "@/lib/core/getTokenServer";
import { serverMutation } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

// UPDATE USER
export const updateUser = async (id, payload) => {
    const res = await serverMutationWithToken(
        `/api/admin/users/${id}`,
        payload,
        "PATCH"
    );

    revalidatePath("/dashboard/admin/users");
    return res;
};

// DELETE USER
export const deleteUser = async (id) => {
    const res = await serverMutationWithToken(
        `/api/admin/users/${id}`,
        {},
        "DELETE"
    );

    revalidatePath("/dashboard/admin/users");
    return res;
};