"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { getPromptRating } from "@/lib/api/rating";
import { ratePrompt } from "@/lib/actions/rating";

export default function RatingSection({
    promptId,
    user,
    visibility,
    initialAvg = 0,
    initialCount = 0,
    userPreviousRating = 0,
}) {
    const [selected, setSelected] = useState(userPreviousRating);
    const [hovered, setHovered] = useState(0);

    const [avg, setAvg] = useState(initialAvg);
    const [count, setCount] = useState(initialCount);

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(
        !!userPreviousRating
    );

    const userPlan = (user?.plan || "free").toLowerCase();
    const isPrivate = visibility === "private";

    // ONLY BLOCK RULE
    const isBlocked = userPlan === "free" && isPrivate;

    // 🔄 SYNC FROM BACKEND (IMPORTANT FIX)
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getPromptRating(promptId);

                setAvg(data.avg || 0);
                setCount(data.count || 0);
            } catch (err) {
                console.error("Rating load error:", err);
            }
        };

        load();
    }, [promptId]);

    const handleSubmit = async () => {
        if (!user) return toast.error("Login required");

        if (isBlocked) {
            return toast.error(
                "Upgrade to premium to rate private prompts"
            );
        }

        if (submitted) {
            return toast.error("You already rated this prompt");
        }

        if (!selected) {
            return toast.error("Select rating first");
        }

        try {
            setLoading(true);

            const res = await ratePrompt(promptId, {
                userId: user.id,
                rating: selected,
            });

            // 🔥 instant UI sync (no refresh needed)
            setAvg(res.avg || 0);
            setCount(res.count || 0);

            setSubmitted(true);

            toast.success("Thanks for your rating!");
        } catch (err) {
            console.error(err);
            toast.error("Rating failed");
        } finally {
            setLoading(false);
        }
    };

    const activeValue = hovered || selected;
    const disabled = loading || isBlocked || submitted;

    return (
        <div className="flex flex-col gap-3 mt-6 p-4 bg-white border border-[#E7E1B1] rounded-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                    Rate this prompt
                </p>

                <span className="text-sm text-gray-500">
                    ⭐ {avg.toFixed(1)} / 5 ({count})
                </span>
            </div>

            {/* STARS */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        disabled={disabled}
                        onMouseEnter={() => setHovered(num)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setSelected(num)}
                        className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
                    >
                        <Star
                            size={22}
                            className={`transition-colors ${num <= activeValue
                                    ? "text-yellow-500 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* PREVIEW */}
            {selected > 0 && !submitted && (
                <p className="text-xs text-gray-500">
                    You selected {selected} star
                    {selected > 1 ? "s" : ""}
                </p>
            )}

            {/* BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={disabled}
                className={`w-fit px-5 py-1.5 rounded-full text-xs font-semibold transition
                    ${isBlocked
                        ? "bg-gray-300 text-gray-500"
                        : submitted
                            ? "bg-gray-200 text-gray-500"
                            : "bg-[#059669] text-white hover:bg-[#047857]"
                    }
                `}
            >
                {isBlocked
                    ? "Locked"
                    : submitted
                        ? "Rated"
                        : loading
                            ? "Submitting..."
                            : "Submit Rating"}
            </button>
        </div>
    );
}