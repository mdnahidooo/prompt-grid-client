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
}) {
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(0);

    const [review, setReview] = useState("");

    const [avg, setAvg] = useState(0);
    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const userPlan = user?.plan || "free";
    const isPrivate = visibility === "private";

    // ONLY BLOCK RULE (FREE + PRIVATE)
    const isBlocked = userPlan === "free" && isPrivate;

    // LOAD RATING
    useEffect(() => {
        if (!promptId) return;

        const load = async () => {
            try {
                const data = await getPromptRating(promptId);

                setAvg(data.avg || 0);
                setCount(data.count || 0);
            } catch (err) {
                console.error(err);
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
                userName: user.name,
                userImage: user.image,

                rating: selected,
                review,

                userPlan: user.plan,
            });

            setAvg(res.avg || 0);
            setCount(res.count || 0);

            setSubmitted(true);
            toast.success("Thanks for your rating!");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const activeValue = hovered || selected;
    const disabled = loading || isBlocked || submitted;

    return (
        <div className="flex flex-col gap-3 p-4 border rounded-xl bg-white">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                    Rate this prompt
                </p>

                <span className="text-xs text-gray-500">
                    ⭐ {avg.toFixed(1)} / 5 ({count})
                </span>
            </div>

            {/* STARS */}
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        disabled={disabled}
                        onMouseEnter={() => setHovered(num)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setSelected(num)}
                    >
                        <Star
                            size={20}
                            className={
                                num <= activeValue
                                    ? "text-yellow-500 fill-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    </button>
                ))}
            </div>

            {/* REVIEW INPUT (NEW ADD) */}
            {!submitted && (
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    disabled={disabled}
                    placeholder="Write your review (optional)..."
                    className="w-full text-xs border rounded-lg p-2 min-h-17.5 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            )}

            {/* BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={disabled}
                className={`px-4 py-1.5 text-xs rounded-full transition font-medium
                    ${isBlocked
                        ? "bg-gray-300 text-gray-500"
                        : submitted
                            ? "bg-gray-200 text-gray-500"
                            : "bg-green-600 text-white hover:bg-green-700"
                    }
                `}
            >
                {isBlocked
                    ? "Locked Submit"
                    : submitted
                        ? "Rated"
                        : loading
                            ? "Submitting..."
                            : "Submit Rating"}
            </button>
        </div>
    );
}