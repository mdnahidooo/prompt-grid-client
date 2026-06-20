"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { deletePrompt } from "@/lib/actions/prompt";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DeletePromptModal({ prompt }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deletePrompt(prompt._id);

            if (result.deletedCount > 0) {
                toast.success("Prompt deleted successfully!");
                router.refresh();
            } else {
                toast.error("Delete failed!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger" size="sm">
                Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete {prompt.title}?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            This will permanently delete this prompt.
                        </AlertDialog.Body>

                        <AlertDialog.Footer>

                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                onClick={handleDelete}
                                variant="danger"
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