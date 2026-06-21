"use client";

import { useState } from "react";
import { removeBookmark } from "@/lib/actions/bookmark";
import { toast } from "react-toastify";

export default function BookmarkListClient({ initialData, user }) {
    const [items, setItems] = useState(initialData || []);

    const handleRemove = async (promptId) => {
        try {
            await removeBookmark(promptId, user.id);

            setItems((prev) =>
                prev.filter((p) => p._id !== promptId)
            );

            toast.success("Removed from bookmarks");
        } catch {
            toast.error("Failed to remove");
        }
    };

    if (!items.length) {
        return (
            <p className="text-gray-500">
                No bookmarks found
            </p>
        );
    }

    return (
        <div className="grid gap-4">
            {items.map((p) => (
                <div
                    key={p._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                >
                    <div>
                        <h2 className="font-semibold">
                            {p.title}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {p.category}
                        </p>
                    </div>

                    <button
                        onClick={() => handleRemove(p._id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}