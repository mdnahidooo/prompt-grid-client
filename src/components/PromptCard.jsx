import Image from "next/image";
import Link from "next/link";
import {
    Copy,
    Lock,
    Globe,
    Star,
    User,
    Eye,
} from "lucide-react";

export default function PromptCard({ prompt, creator, user }) {
    const isPrivate = prompt.visibility === "private";

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-[#E7E1B1] bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

            {/* Featured Badge */}
            {prompt.isFeatured && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#059669] text-white text-[11px] font-medium">
                        <Star size={11} fill="currentColor" />
                        Featured
                    </span>
                </div>
            )}

            {/* CONTENT */}
            <div className="p-4">

                {/* TOP */}
                <div className="flex gap-3">

                    {/* IMAGE */}
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl border border-[#E7E1B1] bg-[#FBF5DD]">

                        {prompt.thumbnail ? (
                            <Image
                                src={prompt.thumbnail}
                                alt={prompt.title}
                                fill
                                className={`object-cover ${isPrivate ? "blur-[2px]" : ""}`}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                No Img
                            </div>
                        )}

                        {isPrivate && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Lock size={16} className="text-white" />
                            </div>
                        )}
                    </div>

                    {/* TITLE */}
                    <div className="min-w-0 flex-1">

                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#FBF5DD] text-[#059669] text-[11px] font-medium">
                            {prompt.category}
                        </span>

                        <h3 className="mt-1 text-sm font-semibold text-[#212121] line-clamp-1">
                            {prompt.title}
                        </h3>

                        <p className="text-[11px] text-gray-500 line-clamp-1">
                            {prompt.aiTool}
                        </p>

                    </div>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-3 text-[12px] text-gray-600 line-clamp-2">
                    {prompt.description}
                </p>

                {/* CREATOR + RATING */}
                <div className="mt-4 flex items-center justify-between">

                    {/* CREATOR */}
                    <div className="flex items-center gap-2">

                        <div className="w-8 h-8 rounded-full bg-[#FBF5DD] border border-[#E7E1B1] overflow-hidden flex items-center justify-center">

                            {creator?.image ? (
                                <Image
                                    src={creator.image}
                                    alt={creator.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            ) : (
                                <User size={14} className="text-[#059669]" />
                            )}

                        </div>

                        <div className="leading-tight">
                            <p className="text-[12px] font-medium text-[#212121]">
                                {creator?.name || "Unknown"}
                            </p>
                            <p className="text-[10px] text-gray-500">
                                Creator
                            </p>
                        </div>

                    </div>

                    {/* COPY + RATING (FIXED HERE) */}
                    <div className="text-right text-[11px] text-gray-600 space-y-1">

                        <div className="flex items-center gap-1 justify-end">
                            <Copy size={12} />
                            {prompt.copyCount || 0}
                        </div>

                        {/* ⭐ ADDED RATING */}
                        <div className="flex items-center gap-1 justify-end text-yellow-600">
                            <Star size={12} className="fill-yellow-500" />
                            {Number(prompt.ratingAvg || 0).toFixed(1)}
                        </div>

                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-[#E7E1B1] bg-[#FBF5DD]/40 px-4 py-3 flex items-center justify-between text-[11px]">

                {/* VISIBILITY */}
                <div className="flex items-center gap-1">
                    {prompt.visibility === "public" ? (
                        <>
                            <Globe size={13} className="text-[#059669]" />
                            <span className="text-[#059669]">Public</span>
                        </>
                    ) : (
                        <>
                            <Lock size={13} className="text-orange-500" />
                            <span className="text-orange-500">Private</span>
                        </>
                    )}
                </div>

                {/* VIEW BUTTON FIXED */}
                <Link
                    href={`/prompts/${prompt._id}`}
                >
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#059669] text-white text-[11px] font-medium hover:bg-[#047857] transition">
                        <Eye size={12} />
                        View
                    </button>
                </Link>

            </div>
        </div>
    );
}