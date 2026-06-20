
import Image from "next/image";
import Link from "next/link";
import {
    Eye,
    Star,
    CheckCircle2,
    XCircle,
    Trash2,
} from "lucide-react";

import { getAdminPrompts } from "@/lib/api/admin/prompts";
import DeletePromptModal from "./DeletePromptModal";
import ApprovePromptButton from "./ApprovePromptButton";
import RejectPromptButton from "./RejectPromptButton";

export default async function AdminPromptsPage() {
    const prompts = await getAdminPrompts();
    // console.log(prompts);

    

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-[#0D530E]">
                    All Prompts
                </h1>
                <p className="text-sm text-black/60">
                    Manage prompt approvals, featured status and moderation.
                </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E7E1B1] bg-white">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#FBF5DD] border-b border-[#E7E1B1]">
                        <tr className="text-left">
                            <th className="px-4 py-4 font-bold">
                                Prompt Details
                            </th>

                            <th className="px-4 py-4 font-bold">
                                Creator
                            </th>

                            <th className="px-4 py-4 font-bold">
                                AI Tool
                            </th>

                            <th className="px-4 py-4 font-bold">
                                Visibility
                            </th>

                            <th className="px-4 py-4 font-bold">
                                Featured
                            </th>

                            <th className="px-4 py-4 font-bold">
                                Status
                            </th>

                            <th className="px-4 py-4 font-bold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {prompts?.map((prompt) => (
                            <tr
                                key={prompt._id}
                                className="border-b border-[#E7E1B1]/60 hover:bg-[#FBF5DD]/30 transition"
                            >
                                {/* Prompt Details */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#E7E1B1] shrink-0">
                                            <Image
                                                src={
                                                    prompt.thumbnail ||
                                                    "/placeholder.png"
                                                }
                                                alt={prompt.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div>
                                            <p className="font-bold text-black">
                                                {prompt.title}
                                            </p>

                                            <p className="text-xs text-black/60">
                                                Category:{" "}
                                                {prompt.category}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Creator */}
                                <td className="px-4 py-4">
                                    <div>
                                        <p className="font-semibold">
                                            {prompt.creatorName ||
                                                "Unknown"}
                                        </p>

                                        <p className="text-xs text-black/60">
                                            {prompt.creatorEmail ||
                                                "No Email"}
                                        </p>
                                    </div>
                                </td>

                                {/* AI Tool */}
                                <td className="px-4 py-4">
                                    {prompt.aiTool}
                                </td>

                                {/* Visibility */}
                                <td className="px-4 py-4">
                                    <span
                                        className={`px - 3 py - 1 rounded - full text - xs font - bold ${prompt.visibility ===
                                                "public"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                            } `}
                                    >
                                        {prompt.visibility}
                                    </span>
                                </td>

                                {/* Featured */}
                                <td className="px-4 py-4">
                                    <button
                                        className={`px - 3 py - 1 rounded - xl text - xs font - bold transition ${prompt.isFeatured
                                                ? "bg-amber-500 text-white"
                                                : "bg-slate-200 text-slate-700"
                                            } `}
                                    >
                                        <Star
                                            size={14}
                                            className="inline mr-1"
                                        />
                                        Featured
                                    </button>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    <span
                                        className={`px - 3 py - 1 rounded - full text - xs font - bold ${prompt.status ===
                                                "approved"
                                                ? "bg-green-100 text-green-700"
                                                : prompt.status ===
                                                    "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            } `}
                                    >
                                        {prompt.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        {/* <button
                                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                                            title="Approve"
                                        >
                                            <CheckCircle2 size={16} />
                                        </button> */}

                                        <ApprovePromptButton promptId={prompt._id} />

                                        {/* <button
                                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                                            title="Reject"
                                        >
                                            <XCircle size={16} />
                                        </button> */}

                                        <RejectPromptButton prompt={prompt} />

                                        {/* <button
                                            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button> */}

                                        <DeletePromptModal prompt={prompt}></DeletePromptModal>

                                        <Link
                                            href={`/ dashboard / admin / prompts / ${prompt._id} `}
                                            className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                                            title="View"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {prompts?.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-12 text-black/50"
                                >
                                    No prompts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

