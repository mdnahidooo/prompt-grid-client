"use client";

import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { approvePrompt } from "@/lib/actions/admin/prompts";

export default function ApprovePromptButton({ promptId }) {
    const router = useRouter();

    const handleApprove = async () => {
        try {
            const res = await approvePrompt(promptId);

            if (res?.modifiedCount > 0) {
                toast.success("Prompt approved successfully");
                router.refresh();
            } else {
                toast.error("Approval failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <button
            onClick={handleApprove}
            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
            title="Approve"
        >
            <CheckCircle2 size={16} />
        </button>
    );
}