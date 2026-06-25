"use server";

import { serverMutationWithToken } from "@/lib/core/getTokenServer";
// import { serverMutation } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { revalidatePath } from "next/cache";

/* ===============================
   DISMISS REPORT
================================= */
export const dismissReport = async (reportId) => {

    const user = await getUserSession();

    if (!user || user.role !== "admin") {
        throw new Error("Unauthorized: Admin only action");
    }

    const res = await serverMutationWithToken(
        `/api/admin/reports/${reportId}/dismiss`,
        {},
        "PATCH"
    );

    revalidatePath("/dashboard/admin/reports");

    return res;
};

/* ===============================
   WARN CREATOR
================================= */
export const warnCreator = async (reportId) => {

    const user = await getUserSession();

    if (!user || user.role !== "admin") {
        throw new Error("Unauthorized: Admin only action");
    }

    const res = await serverMutationWithToken(
        `/api/admin/reports/${reportId}/warn`,
        {},
        "PATCH"
    );

    revalidatePath("/dashboard/admin/reports");

    return res;
};

/* ===============================
   REMOVE PROMPT
================================= */
export const removeReportedPrompt = async (reportId) => {

    const user = await getUserSession();

    if (!user || user.role !== "admin") {
        throw new Error("Unauthorized: Admin only action");
    }

    const res = await serverMutationWithToken(
        `/api/admin/reports/${reportId}/remove`,
        {},
        "PATCH"
    );

    revalidatePath("/dashboard/admin/reports");

    return res;
};