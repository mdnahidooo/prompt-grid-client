"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "react-toastify";
import { submitReport } from "@/lib/actions/report";

export default function ReportButton({
    promptId,
    user,
    visibility,
}) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const userPlan = (user?.plan || "free").toLowerCase();
    const isPrivate = visibility === "private";

    // ❌ ONLY BLOCK RULE
    const isBlocked = userPlan === "free" && isPrivate;

    const handleSubmit = async () => {
        if (!user) return toast.error("Login required");

        if (isBlocked) {
            return toast.error("Not allowed for this prompt");
        }

        if (!reason.trim()) {
            return toast.error("Please write a reason");
        }

        try {
            setLoading(true);

            await submitReport(promptId, {
                userId: user.id,
                reason,
            });

            toast.success("Report submitted");
            setReason("");
            setOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Report failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* BUTTON */}
            <button
                onClick={() => setOpen(true)}
                disabled={isBlocked}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                    ${isBlocked
                        ? "bg-gray-300 text-gray-500"
                        : "bg-red-100 text-red-600"
                    }
                `}
            >
                <Flag size={16} />
                Report
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-100 p-5 rounded-xl space-y-4">

                        <h2 className="text-lg font-semibold">
                            Report Prompt
                        </h2>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Write your reason..."
                            className="w-full border p-2 rounded-md text-sm"
                            rows={4}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-3 py-1 text-sm bg-gray-200 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}