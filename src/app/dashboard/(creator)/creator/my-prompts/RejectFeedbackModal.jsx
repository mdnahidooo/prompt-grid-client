"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { getRejectionFeedback } from "@/lib/api/feedback";

export default function RejectFeedbackModal({ prompt }) {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = async () => {
        try {
            setLoading(true);

            const res = await getRejectionFeedback(prompt._id);

            console.log("rejected data:", res?.data?.rejectionReason);

            setFeedback(res?.data || null);
            setOpen(true);

        } catch (error) {
            console.error("Failed to load rejection feedback:", error);
            setFeedback(null);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // ❌ Not rejected → hide button completely
    if (prompt.status !== "rejected") {
        return (
            <span className="text-xs text-gray-400">-</span>
        );
    }

    // ❌ Rejected but no feedback yet → disabled button
    if (!prompt?._id) {
        return (
            <button
                disabled
                className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-400 cursor-not-allowed"
            >
                No Data
            </button>
        );
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={handleOpen}
                disabled={loading}
                className={`px-2 py-1 text-xs rounded 
                ${loading
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
            >
                {loading ? "Loading..." : "View Feedback"}
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl">

                        {/* HEADER */}
                        <h2 className="text-lg font-bold text-gray-800 mb-3">
                            Rejection Feedback
                        </h2>

                        {/* PROMPT INFO */}
                        <div className="mb-4">
                            <p className="font-semibold text-gray-900">
                                {prompt.title}
                            </p>
                            <p className="text-xs text-gray-500">
                                Category: {prompt.category}
                            </p>
                        </div>

                        {/* FEEDBACK */}
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                            {feedback?.rejectionReason
                                ? feedback.rejectionReason
                                : "No rejection feedback available"}
                        </div>

                        {/* FOOTER */}
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    setFeedback(null);
                                }}
                                className="bg-gray-200 text-black"
                            >
                                Close
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}