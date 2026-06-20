'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Form,
    Fieldset,
    TextField,
    TextArea,
    Label,
    Input,
    Select,
    ListBox,
    Button,
    toast
} from '@heroui/react';

import { ArrowUpToLine, ChevronDown } from '@gravity-ui/icons';
import { createPrompt } from '@/lib/actions/prompt';
import Image from 'next/image';

// Updated Theme Constants (#FDFCF4 background)
const textInputClass = "w-full bg-[#FDFCF4] border border-zinc-300 text-zinc-900 rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-400 focus:border-red-500 transition";
const textAreaClass = "w-full bg-[#FDFCF4] border border-zinc-300 text-zinc-900 rounded-lg p-3 outline-none placeholder:text-zinc-400 focus:border-red-500 transition resize-none";
const triggerClasses = "w-full bg-[#FDFCF4] border border-zinc-300 text-zinc-900 rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-red-500";
const popoverClasses = "bg-[#FDFCF4] border border-zinc-300 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-700 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-200 hover:text-black outline-none";
const labelClass = "text-black font-medium";

export default function AddPromptForm({ creator, creatorPrompt }) {
    const router = useRouter();
    const formRef = useRef(null);
    const [prompt, setPrompt] = useState(creatorPrompt);
    const [thumbnailUrl, setThumbnailUrl] = useState(creatorPrompt?.thumbnail || '');
    const [isUploading, setIsUploading] = useState(false);

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setThumbnailUrl(data.data.url);
            } else {
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!thumbnailUrl) {
            toast.error("Thumbnail image is required!");
            return;
        }

        const newPrompt = {
            title: formData.get('title'),
            category: formData.get('category'),
            aiTool: formData.get('aiTool'),
            difficulty: formData.get('difficulty'),
            visibility: formData.get('visibility'),
            tags: formData.get('tags'),
            description: formData.get('description'),
            content: formData.get('content'),
            thumbnail: thumbnailUrl,
            copyCount: 0,
            rejectionReason: null,
            status: 'pending',
            isFeatured: false,
            creatorId: creator?.id
        };

        const payload = await createPrompt(newPrompt);

        // Check if the submission was successful
        if (payload?.insertedId) {
            // 1. Show Success Toast
            toast.success("Prompt submitted for review successfully!");

            // 2. Clear Form Fields
            formRef.current?.reset();

            // 3. Clear Image State
            setThumbnailUrl('');

            // 4. Redirect
            router.push('/dashboard/creator/my-prompts');
        } else {
            // Optional: Handle error case if submission fails
            toast.error("Failed to submit prompt. Please try again.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-8 bg-[#FDFCF4] p-8 border border-zinc-200 rounded-xl shadow-sm">
            <Form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <Fieldset className="space-y-6">
                    <legend className="text-xl font-semibold text-zinc-900 border-b border-zinc-200 pb-3 w-full">
                        {prompt ? 'Create New Prompt' : 'Update Prompt'}
                        {/* Create New Prompt */}
                    </legend>

                    {/* Thumbnail Upload */}
                    <div className="flex flex-col gap-2">
                        <Label className={labelClass}>Thumbnail Image *</Label>
                        <div className="flex items-center gap-4">
                            <label className="w-20 h-20 border-2 border-dashed border-red-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-red-500 transition">
                                <input type="file" hidden onChange={handleThumbnailUpload} accept="image/*" required />
                                {thumbnailUrl ? (
                                    <Image
                                        src={thumbnailUrl}
                                        alt="Thumbnail"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <ArrowUpToLine size={24} className="text-red-500" />
                                )}
                            </label>
                            <span className="text-xs text-red-400">
                                {isUploading ? "Uploading..." : "Click to upload *"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="title" isRequired>
                            <Label className={labelClass}>Prompt Title</Label>
                            <Input className={textInputClass} placeholder='Enter your prompt title' required />
                        </TextField>

                        <Select name="category" isRequired className="w-full flex flex-col gap-1">
                            <Label className={labelClass}>Category</Label>
                            <Select.Trigger className={triggerClasses}><Select.Value /><ChevronDown size={16} /></Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="writing" className={listItemClasses}>Writing</ListBox.Item>
                                    <ListBox.Item id="coding" className={listItemClasses}>Coding</ListBox.Item>
                                    <ListBox.Item id="marketing" className={listItemClasses}>Marketing</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="aiTool" isRequired>
                            <Label className={labelClass}>AI Tool</Label>
                            <Input className={textInputClass} required />
                        </TextField>

                        <Select name="difficulty" isRequired className="w-full flex flex-col gap-1">
                            <Label className={labelClass}>Difficulty</Label>
                            <Select.Trigger className={triggerClasses}><Select.Value /><ChevronDown size={16} /></Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="beginner" className={listItemClasses}>Beginner</ListBox.Item>
                                    <ListBox.Item id="intermediate" className={listItemClasses}>Intermediate</ListBox.Item>
                                    <ListBox.Item id="pro" className={listItemClasses}>Pro</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="tags" isRequired>
                            <Label className={labelClass}>Tags</Label>
                            <Input className={textInputClass} placeholder="comma separated" required />
                        </TextField>

                        <Select name="visibility" isRequired className="w-full flex flex-col gap-1">
                            <Label className={labelClass}>Visibility</Label>
                            <Select.Trigger className={triggerClasses}><Select.Value /><ChevronDown size={16} /></Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="public" className={listItemClasses}>Public</ListBox.Item>
                                    <ListBox.Item id="private" className={listItemClasses}>Private</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <TextField name="description" isRequired>
                        <Label className={labelClass}>Description</Label>
                        <TextArea className={textAreaClass} rows={3} required />
                    </TextField>

                    <TextField name="content" isRequired>
                        <Label className={labelClass}>Content</Label>
                        <TextArea className={textAreaClass} rows={5} required />
                    </TextField>
                </Fieldset>

                <div className="flex justify-end pt-5 border-t border-zinc-200">
                    <Button type="submit" className="bg-zinc-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition">
                        Submit for Review
                    </Button>
                </div>
            </Form>
        </div>
    );
}