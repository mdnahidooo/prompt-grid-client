"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

import { incrementCopyCount } from "@/lib/actions/prompt";

export default function CopyButton({
    promptId,
    user,
    visibility,
    content,
}) {
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const userPlan = (user?.plan || "free").toLowerCase();
    const isPrivate = visibility === "private";

    // ONLY BLOCK RULE
    const isBlocked = userPlan === "free" && isPrivate;

    const handleCopy = async () => {
        if (!user) {
            return toast.error("Login required");
        }

        // BLOCK CHECK
        if (isBlocked) {
            return toast.error(
                "Upgrade to premium to copy private prompts"
            );
        }

        try {
            setLoading(true);

            // copy text
            await navigator.clipboard.writeText(content || "");

            setCopied(true);

            // increment backend copy count
            await incrementCopyCount(promptId);

            toast.success("Copied!");

            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error(err);
            toast.error("Copy failed");
        } finally {
            setLoading(false);
        }
    };

    const disabled = loading || isBlocked;

    return (
        <button
            onClick={handleCopy}
            disabled={disabled}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-white font-medium transition
                ${isBlocked
                    ? "bg-gray-400"
                    : "bg-[#059669] hover:bg-[#047857]"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            <Copy size={14} />

            {isBlocked
                ? "Locked"
                : copied
                    ? "Copied!"
                    : loading
                        ? "Copying..."
                        : "Copy"}
        </button>
    );
}