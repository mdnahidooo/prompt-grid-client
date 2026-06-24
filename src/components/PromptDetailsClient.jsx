"use client";

import Image from "next/image";
import {
    Copy,
    Lock,
    Globe,
    Star,
    User,
    Tag,
    BarChart3,
    Bookmark,
    Flag
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import BookmarkButton from "./BookmarkButton";
import CopyButton from "./CopyButton";
import ReportButton from "./ReportButton";
import RatingSection from "./RatingSection";
import { incrementCopyCount } from "@/lib/actions/copied-prompts";

export default function PromptDetailsClient({
    prompt,
    user,
    fullAccess = false,
    currentUser
}) {
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    if (!prompt) {
        return (
            <div className="p-10 text-center text-gray-500">
                Prompt not found
            </div>
        );
    }

    const isPrivate = prompt.visibility === "private";
    const isLocked = isPrivate && !fullAccess;

    const imageSrc = prompt.thumbnail?.trim()
        ? prompt.thumbnail
        : "/placeholder.png";

    // ---------------- COPY ----------------
    const handleCopy = async () => {
        if (isLocked) {
            toast.error("Premium required to copy this prompt");
            return;
        }

        try {
            await navigator.clipboard.writeText(prompt.content || "");

            await incrementCopyCount(prompt._id);

            setCopied(true);
            toast.success("Copied!");

            setTimeout(() => setCopied(false), 1500);
        } catch {
            toast.error("Copy failed");
        }
    };

    // ---------------- BOOKMARK (UI ONLY NOW) ----------------
    const handleBookmark = () => {
        if (isLocked) {
            toast.error("Premium required to bookmark");
            return;
        }

        setBookmarked(!bookmarked);
        toast.success(bookmarked ? "Removed bookmark" : "Bookmarked");
    };

    // ---------------- REPORT (UI ONLY NOW) ----------------
    const handleReport = () => {
        if (isLocked) {
            toast.error("Premium required to report");
            return;
        }

        toast.success("Reported successfully");
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            {/* TOP GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                    <div className="relative h-52">
                        <Image
                            src={imageSrc}
                            alt={prompt.title}
                            fill
                        // className="object-cover"
                        />

                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                            {isPrivate ? (
                                <>
                                    <Lock size={13} />
                                    Private
                                </>
                            ) : (
                                <>
                                    <Globe size={13} />
                                    Public
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-4 space-y-2">
                        <h1 className="font-bold text-lg text-gray-900">
                            {prompt.title}
                        </h1>

                        <p className="text-sm text-gray-600 line-clamp-2">
                            {prompt.description}
                        </p>

                        <div className="flex gap-2 flex-wrap text-xs mt-2">
                            <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                <Tag size={12} />
                                {prompt.category}
                            </span>

                            <span className="bg-gray-100 px-2 py-1 rounded-full">
                                {prompt.aiTool}
                            </span>

                            <span className="bg-gray-100 px-2 py-1 rounded-full">
                                {prompt.difficulty}
                            </span>

                            <span className={`px-2 py-1 rounded-full text-xs ${prompt.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : prompt.status === "rejected"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                                {prompt.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 space-y-4">

                    {/* CREATOR CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center">

                        <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <User size={18} />
                            </div>

                            <div>
                                <p className="font-semibold text-gray-900">
                                    {prompt.creator?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {prompt.creator?.email}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                                <Star size={14} className="text-yellow-500" />
                                <span className="font-semibold">
                                    {prompt.ratingAvg?.toFixed?.(1) || "0.0"}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">
                                {prompt.ratingCount || 0} reviews
                            </p>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">

                        <div className="flex justify-between mb-3 items-center">
                            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
                                <BarChart3 size={16} />
                                Prompt Content
                            </h2>

                            {isLocked && (
                                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1">
                                    <Lock size={12} />
                                    Premium Locked
                                </span>
                            )}
                        </div>

                        <div className={`whitespace-pre-wrap text-sm leading-relaxed text-gray-700 ${isLocked ? "blur-sm select-none" : ""
                            }`}>
                            {prompt.content}
                        </div>
                    </div>

                    {/* METADATA SECTION (NEW CLEAN BLOCK) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <p className="text-gray-500 text-xs">Tags</p>
                            <p className="font-medium">{prompt.tags}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs">Visibility</p>
                            <p className="font-medium">{prompt.visibility}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs">Copy Count</p>
                            <p className="font-medium">{prompt.copyCount}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs">Created At</p>
                            <p className="font-medium">
                                {new Date(prompt.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center">

                        {/* COPY COUNT */}
                        <div className="text-sm text-gray-600">
                            Copy Count:{" "}
                            <span className="font-semibold text-gray-900">
                                {prompt.copyCount || 0}
                            </span>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-2 flex-wrap">

                            <CopyButton
                                promptId={prompt._id}
                                user={user}
                                currentUser={currentUser}
                                visibility={prompt.visibility}
                                content={prompt.content}
                                title={prompt.title}
                            />

                            <BookmarkButton
                                promptId={prompt._id}
                                user={user}
                                currentUser={currentUser}
                                visibility={prompt.visibility}
                            />

                            <ReportButton
                                promptId={prompt._id}
                                user={user}
                                currentUser={currentUser}
                                visibility={prompt.visibility}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <RatingSection
                    promptId={prompt._id}
                    initialAvg={prompt.ratingAvg || 0}
                    initialCount={prompt.ratingCount || 0}
                    user={user}
                    visibility={prompt.visibility}
                    
                />
            </div>
        </div>
    );
}