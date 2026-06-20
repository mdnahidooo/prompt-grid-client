"use client";

import Image from "next/image";
import {
    Copy,
    Lock,
    Globe,
    Star,
    User,
    Eye,
    Tag,
    BarChart3
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PromptDetailsClient({ prompt }) {
    const [copied, setCopied] = useState(false);

    if (!prompt) {
        return (
            <div className="p-10 text-center text-gray-500">
                Prompt not found
            </div>
        );
    }

    const isPrivate = prompt.visibility === "private";

    const imageSrc =
        prompt.thumbnail?.trim()
            ? prompt.thumbnail
            : "/placeholder.png";

    const handleCopy = async () => {
        if (isPrivate) {
            toast.error("This is a private prompt");
            return;
        }

        try {
            await navigator.clipboard.writeText(prompt.content || "");
            setCopied(true);
            toast.success("Copied!");

            setTimeout(() => setCopied(false), 1500);
        } catch {
            toast.error("Copy failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* TOP GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT IMAGE CARD */}
                <div className="lg:col-span-1 bg-white border border-[#E7E1B1] rounded-2xl overflow-hidden shadow-sm">

                    <div className="relative w-full h-52 bg-[#FBF5DD]">

                        <Image
                            src={imageSrc}
                            alt={prompt.title || "Prompt"}
                            fill
                            className="object-cover"
                        />

                        {/* visibility badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold">

                            {prompt.visibility === "public" ? (
                                <>
                                    <Globe size={14} className="text-green-600" />
                                    Public
                                </>
                            ) : (
                                <>
                                    <Lock size={14} className="text-orange-500" />
                                    Private
                                </>
                            )}

                        </div>

                    </div>

                    {/* QUICK INFO */}
                    <div className="p-4 space-y-3">

                        <h1 className="text-lg font-bold text-[#212121]">
                            {prompt.title}
                        </h1>

                        <p className="text-sm text-gray-600 line-clamp-3">
                            {prompt.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs">

                            <span className="px-2 py-1 bg-[#FBF5DD] text-[#059669] rounded-full flex items-center gap-1">
                                <Tag size={12} />
                                {prompt.category}
                            </span>

                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {prompt.aiTool}
                            </span>

                        </div>

                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* CREATOR CARD */}
                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-full bg-[#FBF5DD] flex items-center justify-center border border-[#E7E1B1]">
                                <User className="text-[#059669]" />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    {prompt.creator?.name || "Unknown Creator"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {prompt.creator?.email || "No email"}
                                </p>
                            </div>

                        </div>

                        <div className="text-right">
                            <p className="text-sm font-semibold flex items-center gap-1 justify-end">
                                <Star size={14} className="text-yellow-500" />
                                4.5
                            </p>
                            <p className="text-xs text-gray-500">
                                Rating
                            </p>
                        </div>

                    </div>

                    {/* CONTENT BOX (LOCKED IF PRIVATE) */}
                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-5">

                        <div className="flex items-center justify-between mb-3">

                            <h2 className="font-semibold flex items-center gap-2">
                                <BarChart3 size={16} />
                                Prompt Content
                            </h2>

                            {isPrivate && (
                                <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 flex items-center gap-1">
                                    <Lock size={12} />
                                    Locked (Premium)
                                </span>
                            )}

                        </div>

                        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isPrivate ? "blur-sm select-none" : ""}`}>
                            {prompt.content || "No content available"}
                        </div>

                    </div>

                    {/* STATS + COPY */}
                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-4 flex items-center justify-between">

                        <div className="text-sm text-gray-600">
                            Copy Count:{" "}
                            <span className="font-semibold text-black">
                                {prompt.copyCount || 0}
                            </span>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-white font-medium transition
                                ${isPrivate
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#059669] hover:bg-[#047857]"
                                }`}
                        >
                            <Copy size={14} />
                            {copied ? "Copied!" : "Copy"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}