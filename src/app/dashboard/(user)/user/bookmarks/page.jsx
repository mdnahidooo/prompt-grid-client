import { getUserSession } from "@/lib/core/session";
import { getUserBookmarks } from "@/lib/api/bookmark";
import { redirect } from "next/navigation";
import BookmarkListClient from "./BookmarkListClient";

export default async function BookmarksPage() {
    const user = await getUserSession();

    // ONLY USER ACCESS
    if (!user) {
        redirect("/login");
    }

    // optional rule: block admin/creator if needed
    if (user.role === "admin") {
        redirect("/dashboard/admin");
    }

    const res = await getUserBookmarks(user.id);
    const bookmarks = res?.data || [];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-xl font-bold mb-4">
                My Bookmarks
            </h1>

            <BookmarkListClient
                initialData={bookmarks}
                user={user}
            />
        </div>
    );
}