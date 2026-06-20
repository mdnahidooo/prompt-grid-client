"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { deletePrompt } from "@/lib/actions/admin/prompts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePromptModal({ prompt }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deletePrompt(prompt._id);

            if (result?.deletedCount > 0) {
                toast.success("Prompt deleted successfully!");
                router.refresh();
            } else {
                toast.error("Delete failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <AlertDialog>
            {/* Trigger Button (Admin Only UI) */}
            <Button
                size="sm"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
                <Trash2 size={16} />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-md">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Heading className="text-red-600">
                                Delete Prompt
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            Are you sure you want to delete{" "}
                            <span className="font-bold">
                                {prompt.title}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="flex gap-2 justify-end">

                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                onClick={handleDelete}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Confirm Delete
                            </Button>

                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}