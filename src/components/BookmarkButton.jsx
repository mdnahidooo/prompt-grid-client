"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";

import {
    addBookmark,
    removeBookmark,
    getBookmarkStatus,
} from "@/lib/actions/bookmark";

export default function BookmarkButton({
    promptId,
    user,
    visibility,
    currentUser
}) {
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    const userPlan = currentUser?.plan || "free";
    const isPrivate = visibility === "private";

    // ❌ ONLY BLOCK CONDITION
    const isBlocked = userPlan === "free" && isPrivate;

    // LOAD STATUS
    useEffect(() => {
        if (!user?.id || !promptId) return;

        const load = async () => {
            try {
                const status = await getBookmarkStatus(
                    promptId,
                    user.id
                );
                setBookmarked(status);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [promptId, user]);

    const handleToggle = async () => {
        if (!user) return toast.error("Login required");

        // 🚨 BLOCK RULE (ONLY FREE + PRIVATE)
        if (isBlocked) {
            return toast.error(
                "Upgrade to premium to use private prompts"
            );
        }

        try {
            setLoading(true);

            if (bookmarked) {
                await removeBookmark(promptId, user.id);
                setBookmarked(false);
                toast.success("Bookmark removed");
            } else {
                await addBookmark(promptId, user.id);
                setBookmarked(true);
                toast.success("Bookmarked");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading || isBlocked}
            className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium transition
                ${bookmarked
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600"
                }
                ${loading || isBlocked
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
            `}
        >
            <Bookmark
                size={16}
                className={bookmarked ? "fill-yellow-500" : ""}
            />

            {isBlocked
                ? "Locked (Upgrade)"
                : bookmarked
                    ? "Saved"
                    : "Bookmark"}
        </button>
    );
}