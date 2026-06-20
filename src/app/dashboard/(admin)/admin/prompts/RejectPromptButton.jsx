"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { rejectPrompt } from "@/lib/actions/admin/prompts";

export default function RejectPromptButton({ prompt }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReject = async () => {
        if (!reason.trim()) {
            toast.error("Rejection reason is required");
            return;
        }

        try {
            setLoading(true);

            const res = await rejectPrompt(prompt._id, reason);

            if (res?.modifiedCount > 0) {
                toast.success("Prompt rejected successfully");
                setOpen(false);
                setReason("");
                router.refresh();
            } else {
                toast.error("Reject failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                title="Reject"
            >
                <XCircle size={16} />
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">

                        <h2 className="text-lg font-bold text-red-600 mb-3">
                            Reject Prompt
                        </h2>

                        {/* Prompt Info */}
                        <div className="mb-4 text-sm space-y-1">
                            <p>
                                <span className="font-semibold">Title:</span>{" "}
                                {prompt.title}
                            </p>
                            <p>
                                <span className="font-semibold">Category:</span>{" "}
                                {prompt.category}
                            </p>
                        </div>

                        {/* Feedback Input */}
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Write rejection feedback..."
                            className="w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
                            rows={4}
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleReject}
                                disabled={loading}
                                className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm disabled:opacity-50"
                            >
                                {loading ? "Rejecting..." : "Reject"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}