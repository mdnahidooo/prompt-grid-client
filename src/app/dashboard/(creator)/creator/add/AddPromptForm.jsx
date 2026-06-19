'use client';

import React, { useState } from 'react';
import {
    Form,
    Fieldset,
    TextField,
    TextArea,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
    toast
} from '@heroui/react';

import { ArrowUpToLine, Globe, Factory, ArrowRight, Pencil, ChevronDown } from '@gravity-ui/icons';
import { createPrompt } from '@/lib/actions/prompt';


// Layout Shared Style Constants (UNCHANGED)
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function AddPromptForm({ creator, creatorPrompt }) {

    const [prompt, setPrompt] = useState(creatorPrompt);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    // thumbnail upload
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // upload handler (same logic)
    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, thumbnail: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {
                setThumbnailUrl(data.data.url);
                setErrors(prev => ({ ...prev, thumbnail: null }));
            } else {
                setErrors(prev => ({ ...prev, thumbnail: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, thumbnail: "Network error during upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const description = formData.get('description');
        const content = formData.get('content');
        const category = formData.get('category');
        const aiTool = formData.get('aiTool');
        const tags = formData.get('tags');
        const difficulty = formData.get('difficulty');
        const visibility = formData.get('visibility');

        const newErrors = {};

        if (!title) newErrors.title = "Title is required";
        if (!content) newErrors.content = "Content is required";
        if (!category) newErrors.category = "Category is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newPrompt = {
            title,
            description,
            content,
            category,
            aiTool,
            tags,
            difficulty,
            visibility,
            thumbnail: thumbnailUrl || (prompt?.thumbnail || ''),
            copyCount: 0,
            status: 'pending',
            creatorId: creator?.id
        };

        setPrompt(newPrompt);

        const payload = await createPrompt(newPrompt);

        if (payload?.insertedId) {
            const saved = { ...newPrompt, _id: payload.insertedId };
            setPrompt(saved);
            toast.success("Prompt submitted for review!");
        }

        setErrors({});
        setIsEditing(false);
    };

    const startCreate = () => {
        setThumbnailUrl('');
        setIsEditing(true);
    };

    const startEdit = () => {
        setThumbnailUrl(prompt?.thumbnail || '');
        setIsEditing(true);
    };

    // EMPTY STATE
    if (!prompt?._id && !isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                    <Factory size={24} className="text-zinc-500" />
                </div>

                <h2 className="text-xl font-semibold text-zinc-200">
                    No Prompt Created Yet
                </h2>

                <p className="text-sm text-zinc-500">
                    Create and submit your first AI prompt to the marketplace.
                </p>

                <Button
                    onPress={startCreate}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11"
                >
                    Add Prompt <ArrowRight size={16} className="ml-1" />
                </Button>
            </div>
        );
    }

    // VIEW MODE
    if (prompt && !isEditing) {
        return (
            <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-6">

                <div className="flex justify-between items-start border-b border-zinc-900 pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{prompt.title}</h1>
                        <p className="text-sm text-zinc-400 mt-1">{prompt.category}</p>
                    </div>

                    <Button
                        onPress={startEdit}
                        variant="bordered"
                        className="border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                    >
                        <Pencil size={14} /> Edit
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-300">
                    <div>AI Tool: {prompt.aiTool}</div>
                    <div>Difficulty: {prompt.difficulty}</div>
                    <div>Visibility: {prompt.visibility}</div>
                </div>

                {prompt.description && (
                    <p className="text-zinc-300 bg-zinc-900/20 p-4 rounded-xl">
                        {prompt.description}
                    </p>
                )}

                {prompt.content && (
                    <div className="bg-zinc-900/20 p-4 rounded-xl text-zinc-300 whitespace-pre-wrap">
                        {prompt.content}
                    </div>
                )}
            </div>
        );
    }

    // FORM MODE
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">

            <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-8">

                <Fieldset className="space-y-6">

                    <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 pb-3">
                        {prompt ? 'Update Prompt' : 'Create New Prompt'}
                    </legend>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextField name="title" defaultValue={prompt?.title || ''}>
                            <Label className="text-zinc-400">Prompt Title</Label>
                            <Input className={textInputClass} />
                        </TextField>

                        <Select name="category" className={selectBoxClass}>
                            <Label className="text-zinc-400">Category</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value />
                                <Select.Indicator><ChevronDown size={16} /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="writing" className={listItemClasses}>Writing</ListBox.Item>
                                    <ListBox.Item id="coding" className={listItemClasses}>Coding</ListBox.Item>
                                    <ListBox.Item id="marketing" className={listItemClasses}>Marketing</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextField name="aiTool">
                            <Label className="text-zinc-400">AI Tool</Label>
                            <Input className={textInputClass} />
                        </TextField>

                        <Select name="difficulty" className={selectBoxClass}>
                            <Label className="text-zinc-400">Difficulty</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value />
                                <Select.Indicator><ChevronDown size={16} /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="beginner" className={listItemClasses}>Beginner</ListBox.Item>
                                    <ListBox.Item id="intermediate" className={listItemClasses}>Intermediate</ListBox.Item>
                                    <ListBox.Item id="pro" className={listItemClasses}>Pro</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextField name="tags">
                            <Label className="text-zinc-400">Tags</Label>
                            <Input className={textInputClass} placeholder="comma separated" />
                        </TextField>

                        <Select name="visibility" className={selectBoxClass}>
                            <Label className="text-zinc-400">Visibility</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value />
                                <Select.Indicator><ChevronDown size={16} /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox>
                                    <ListBox.Item id="public" className={listItemClasses}>Public</ListBox.Item>
                                    <ListBox.Item id="private" className={listItemClasses}>Private</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                    </div>

                    {/* Thumbnail */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-zinc-400">Thumbnail Image</Label>
                        <div className="flex items-center gap-4">
                            <label className="w-14 h-14 border border-dashed border-zinc-700 rounded-xl flex items-center justify-center cursor-pointer">
                                <input type="file" hidden onChange={handleThumbnailUpload} />
                                {thumbnailUrl ? (
                                    <img src={thumbnailUrl} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <ArrowUpToLine size={18} />
                                )}
                            </label>
                            <span className="text-xs text-zinc-600">
                                {isUploading ? "Uploading..." : "PNG, JPG up to 5MB"}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <TextField name="description">
                        <Label className="text-zinc-400">Prompt Description</Label>
                        <TextArea className={textAreaClass} rows={3} />
                    </TextField>

                    {/* Content */}
                    <TextField name="content">
                        <Label className="text-zinc-400">Prompt Content</Label>
                        <TextArea className={textAreaClass} rows={5} />
                    </TextField>

                </Fieldset>

                <div className="flex justify-end gap-3 border-t border-zinc-900 pt-5">

                    {prompt && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button type="submit" className="bg-white text-black font-semibold">
                        {prompt ? "Update Prompt" : "Submit Prompt"}
                    </Button>

                </div>

            </Form>
        </div>
    );
}