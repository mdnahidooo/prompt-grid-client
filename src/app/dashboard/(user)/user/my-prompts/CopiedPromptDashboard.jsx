"use client";

import { useMemo, useState } from "react";
import { Search, Trash2, Copy } from "lucide-react";
import { toast } from "react-toastify";

import {
    deleteCopiedPrompt,
    clearCopiedHistory
} from "@/lib/actions/copied-prompts";

export default function CopiedPromptDashboard({
    initialData = [],
    stats,
    userId,
}) {
    const [items, setItems] = useState(initialData);
    const [search, setSearch] = useState("");

    // 🔎 FILTER (Notion-style search)
    const filtered = useMemo(() => {
        return items.filter((item) =>
            item.promptTitle?.toLowerCase().includes(search.toLowerCase()) ||
            item.content?.toLowerCase().includes(search.toLowerCase())
        );
    }, [items, search]);

    // ❌ DELETE SINGLE
    const handleDelete = async (id) => {
        try {
            await deleteCopiedPrompt(id);
            setItems((prev) => prev.filter((i) => i._id !== id));
            toast.success("Deleted successfully");
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    // 🧹 CLEAR ALL
    const handleClearAll = async () => {
        try {
            await clearCopiedHistory(userId);
            setItems([]);
            toast.success("History cleared");
        } catch (err) {
            toast.error("Failed to clear history");
        }
    };

    // 📋 COPY AGAIN (optional UX feature)
    const handleCopyAgain = async (text) => {
        try {
            await navigator.clipboard.writeText(text || "");
            toast.success("Copied again!");
        } catch {
            toast.error("Copy failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-5">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-black">
                    My Copied Prompts
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Total copied prompts:{" "}
                    <span className="font-semibold text-black">
                        {stats?.totalCopy || items.length || 0}
                    </span>
                </p>
            </div>

            {/* SEARCH + CLEAR */}
            <div className="flex gap-3 flex-col sm:flex-row">

                {/* SEARCH BOX */}
                <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white w-full">
                    <Search size={16} className="text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search copied prompts..."
                        className="w-full outline-none text-sm"
                    />
                </div>

                {/* CLEAR ALL */}
                {items.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* LIST */}
            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

                {/* HEADER ROW */}
                <div className="grid grid-cols-12 p-3 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                    <div className="col-span-3">Prompt</div>
                    <div className="col-span-5">Copied Text</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* EMPTY STATE */}
                {filtered.length === 0 ? (
                    <div className="p-10 text-center text-gray-400 text-sm">
                        No copied prompts found
                    </div>
                ) : (
                    filtered.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 p-3 border-b hover:bg-gray-50 transition"
                        >
                            {/* TITLE */}
                            <div className="col-span-3">
                                <p className="font-medium text-sm text-black truncate">
                                    {item.promptTitle || "Untitled Prompt"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.category || "General"}
                                </p>
                            </div>

                            {/* CONTENT */}
                            <div className="col-span-5 text-sm text-gray-600 line-clamp-2">
                                {item.content || "No content stored"}
                            </div>

                            {/* DATE */}
                            <div className="col-span-2 text-xs text-gray-400">
                                {item.createdAt
                                    ? new Date(item.createdAt).toLocaleString()
                                    : "N/A"}
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-2 flex justify-end gap-2">

                                {/* COPY AGAIN */}
                                <button
                                    onClick={() =>
                                        handleCopyAgain(item.content)
                                    }
                                    className="text-green-600 hover:text-green-700"
                                >
                                    <Copy size={14} />
                                </button>

                                {/* DELETE */}
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                                
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}