"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { rejectPrompt } from "@/lib/actions/admin/prompts";

export default function RejectPromptModal({ prompt }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(prompt);

    const handleReject = async () => {
        if (!reason.trim()) {
            toast.error("Rejection reason required");
            return;
        }

        try {
            setLoading(true);

            const res = await rejectPrompt(
                {
                    reason,
                    adminId: session?.user?.id
                },
                prompt._id
            );

            if (res?.acknowledged || res?.success) {
                toast.success("Prompt rejected successfully");
                setOpen(false);
                setReason("");
                router.refresh();
            } else {
                toast.error("Failed to reject prompt");
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
            {/* TRIGGER */}
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                title="Reject"
            >
                <XCircle size={16} />
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">

                        <h2 className="text-lg font-bold text-red-600">
                            Reject Prompt
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {prompt.title} • {prompt.category}
                        </p>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Write rejection feedback..."
                            className="w-full border rounded-lg p-2 mt-4 text-sm"
                            rows={4}
                        />

                        <div className="flex justify-end gap-2 mt-4">

                            <button
                                onClick={() => setOpen(false)}
                                className="px-3 py-1.5 rounded bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleReject}
                                disabled={loading}
                                className="px-3 py-1.5 rounded bg-red-600 text-white"
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