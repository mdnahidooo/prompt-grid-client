"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { ratePrompt } from "@/lib/api/rating";
import { toast } from "react-toastify";

export default function RatingSection({
    promptId,
    initialAvg = 0,
    user,
    userPreviousRating = 0,
}) {
    const [selected, setSelected] = useState(userPreviousRating);
    const [hovered, setHovered] = useState(0);
    const [avg, setAvg] = useState(initialAvg);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(!!userPreviousRating);

    const handleSubmit = async () => {
        if (!user) return toast.error("Login required");

        if (submitted) return toast.error("Already rated");

        if (!selected) return toast.error("Select rating first");

        try {
            setLoading(true);

            const res = await ratePrompt(promptId, {
                userId: user.id,
                rating: selected,
            });

            setAvg(res.avg);
            setSubmitted(true);

            toast.success("Thanks for rating!");
        } catch {
            toast.error("Failed to submit rating");
        } finally {
            setLoading(false);
        }
    };

    const activeValue = hovered || selected;

    return (
        <div className="flex flex-col gap-3 mt-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                    Rate this prompt
                </p>

                <span className="text-sm text-gray-500">
                    ⭐ {avg.toFixed(1)} / 5
                </span>
            </div>

            {/* STARS */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        disabled={submitted}
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

            {/* SMALL PREVIEW TEXT */}
            {selected > 0 && !submitted && (
                <p className="text-xs text-gray-500">
                    You selected {selected} star{selected > 1 ? "s" : ""}
                </p>
            )}

            {/* PILL BUTTON (NEW DESIGN) */}
            <button
                onClick={handleSubmit}
                disabled={loading || submitted}
                className={`
                    w-fit px-5 py-1.5 rounded-full text-xs font-semibold
                    transition-all duration-200
                    ${submitted
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#059669] text-white hover:bg-[#047857]"
                    }
                `}
            >
                {submitted
                    ? "Rated"
                    : loading
                        ? "Submitting..."
                        : "Submit Rating"}
            </button>
        </div>
    );
}