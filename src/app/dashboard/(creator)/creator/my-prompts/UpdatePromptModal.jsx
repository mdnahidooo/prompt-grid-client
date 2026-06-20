"use client";

import React from "react";
import {
    Button,
    Fieldset,
    Form,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
    Select,
    SelectItem
} from "@heroui/react";

import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updatePrompt } from "@/lib/actions/prompt";
import Image from "next/image";


export default function UpdatePromptModal({ prompt }) {
    const router = useRouter();

    console.log(prompt);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedPrompt = {
            title: formData.get("title"),
            category: formData.get("category"),
            visibility: formData.get("visibility"),
            difficulty: formData.get("difficulty"),
            description: formData.get("description"),
            content: formData.get("content"),
            thumbnail: formData.get("thumbnail"),
        };

        console.log(updatedPrompt);
        try {
            const result = await updatePrompt(prompt._id, updatedPrompt);

            if (result.modifiedCount > 0) {
                toast.success("Prompt updated successfully!");
                router.refresh();
            } else {
                toast.info("No changes detected!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <Modal>

            {/* OPEN BUTTON */}
            <Button
                variant="outline"
                className="border border-slate-200 bg-slate-100 hover:bg-slate-200 text-[#3F4255]"
            >
                <BiEdit size={18} />
                Edit
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">

                    <Modal.Dialog className="sm:max-w-4xl rounded-3xl overflow-hidden border border-slate-200">

                        <Modal.CloseTrigger />

                        {/* HEADER */}
                        <Modal.Header className="border-b border-slate-200 bg-[#F8FAFC]">
                            <div>
                                <Modal.Heading className="text-2xl font-bold text-[#3F4255]">
                                    Edit Prompt
                                </Modal.Heading>
                                <p className="text-sm text-slate-500 mt-1">
                                    Update your AI prompt details
                                </p>
                            </div>
                        </Modal.Header>

                        {/* BODY */}
                        <Modal.Body className="p-6 bg-[#F8FAFC]">

                            <Surface className="rounded-3xl border border-slate-200 bg-white p-6">

                                <Form onSubmit={onSubmit} className="space-y-5">

                                    {/* TITLE */}
                                    <TextField name="title" defaultValue={prompt?.title}>
                                        <Label>Title</Label>
                                        <Input />
                                    </TextField>

                                    {/* CATEGORY (SELECT) */}
                                    <div>
                                        <Label>Category</Label>
                                        <select
                                            name="category"
                                            defaultValue={prompt?.category}
                                            className="w-full h-11 px-3 rounded-xl border border-slate-200"
                                        >
                                            <option value="coding">Coding</option>
                                            <option value="writing">Writing</option>
                                            <option value="business">Business</option>
                                            <option value="marketing">Marketing</option>
                                        </select>
                                    </div>

                                    {/* VISIBILITY */}
                                    <div>
                                        <Label>Visibility</Label>
                                        <select
                                            name="visibility"
                                            defaultValue={prompt?.visibility}
                                            className="w-full h-11 px-3 rounded-xl border border-slate-200"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>

                                    {/* DIFFICULTY */}
                                    <div>
                                        <Label>Difficulty</Label>
                                        <select
                                            name="difficulty"
                                            defaultValue={prompt?.difficulty}
                                            className="w-full h-11 px-3 rounded-xl border border-slate-200"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <TextField name="description" defaultValue={prompt?.description}>
                                        <Label>Description</Label>
                                        <TextArea />
                                    </TextField>

                                    {/* CONTENT */}
                                    <TextField name="content" defaultValue={prompt?.content}>
                                        <Label>Content</Label>
                                        <TextArea />
                                    </TextField>

                                    {/* IMAGE (ImageBB URL) */}
                                    <TextField name="thumbnail" defaultValue={prompt?.thumbnail}>
                                        <Label>Image (ImageBB URL)</Label>
                                        <Input placeholder="https://i.ibb.co/..." />
                                    </TextField>

                                    {prompt?.thumbnail && (
                                        <div className="relative w-full h-40 mt-2 rounded-xl border overflow-hidden">
                                            <Image
                                                src={prompt.thumbnail}
                                                alt="preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* ACTIONS */}
                                    <Fieldset.Actions className="flex justify-end gap-3 pt-4">

                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-[#14B8A6] text-white"
                                        >
                                            <BiEdit size={18} />
                                            Update
                                        </Button>

                                    </Fieldset.Actions>

                                </Form>

                            </Surface>

                        </Modal.Body>

                    </Modal.Dialog>

                </Modal.Container>
            </Modal.Backdrop>

        </Modal>
    );
}