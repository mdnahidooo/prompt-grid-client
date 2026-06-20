"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { toggleFeature } from "@/lib/actions/admin/prompts";

export default function FeatureToggleButton({ prompt }) {
    const [isFeatured, setIsFeatured] = useState(prompt.isFeatured);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            try {
                await toggleFeature(prompt._id, isFeatured);

                setIsFeatured(!isFeatured);

                toast.success(
                    !isFeatured ? "Marked as Featured" : "Removed from Featured"
                );
            } catch (err) {
                toast.error("Failed to update feature");
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition
                ${isFeatured
                    ? "bg-amber-500 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
        >
            <Star size={14} />
            {isFeatured ? "Featured" : "Not Featured"}
        </button>
    );
}