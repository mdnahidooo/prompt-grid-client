"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PromptCard from "@/components/PromptCard";

export default function PromptsContainer({ initialData, initialFilters }) {
    const router = useRouter();
    const pathname = usePathname();

    // স্টেট ম্যানেজমেন্ট
    const [search, setSearch] = useState(initialFilters.search || "");
    const [category, setCategory] = useState(initialFilters.category || "all");
    const [aiTool, setAiTool] = useState(initialFilters.aiTool || "all");
    const [difficulty, setDifficulty] = useState(initialFilters.difficulty || "all");
    const [sort, setSort] = useState(initialFilters.sort || "latest");
    const [page, setPage] = useState(Number(initialFilters.page || 1));

    const data = initialData.data || [];
    const total = initialData.total || 0;
    const limit = 12;
    const totalPages = Math.ceil(total / limit);

    // সব ফিল্টার ও সার্চ একসাথে এপ্লাই করার ফাংশন
    const applyFilters = (newParams) => {
        const params = new URLSearchParams();

        // নতুন প্যারামিটার বা বর্তমান স্টেট থেকে ভ্যালু নেওয়া
        const s = newParams.search !== undefined ? newParams.search : search;
        const c = newParams.category || category;
        const a = newParams.aiTool || aiTool;
        const d = newParams.difficulty || difficulty;
        const so = newParams.sort || sort;
        const p = newParams.page || page;

        if (s) params.set("search", s);
        if (c !== "all") params.set("category", c);
        if (a !== "all") params.set("aiTool", a);
        if (d !== "all") params.set("difficulty", d);
        if (so !== "latest") params.set("sort", so);
        if (p > 1) params.set("page", p.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                {/* Search */}
                <input
                    className="border p-2 rounded"
                    placeholder="Search & Press Enter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setPage(1);
                            applyFilters({ search: e.target.value, page: 1 });
                        }
                    }}
                />

                {/* Category */}
                <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); applyFilters({ category: e.target.value, page: 1 }); }}>
                    <option value="all">All Category</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="coding">Coding</option>
                </select>

                {/* AI Tool */}
                <select value={aiTool} onChange={(e) => { setAiTool(e.target.value); setPage(1); applyFilters({ aiTool: e.target.value, page: 1 }); }}>
                    <option value="all">All AI Tools</option>
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Claude">Claude</option>
                </select>

                {/* Difficulty */}
                <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value); setPage(1); applyFilters({ difficulty: e.target.value, page: 1 }); }}>
                    <option value="all">All Difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="pro">Pro</option>
                </select>

                {/* Sort */}
                <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); applyFilters({ sort: e.target.value, page: 1 }); }}>
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="copied">Most Copied</option>
                </select>
            </div>

            <div className="mb-4 text-sm text-gray-500">
                Showing {data.length} of {total} prompts
            </div>

            {/* Cards */}
            {data.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No prompts found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((prompt) => (
                        <PromptCard key={prompt._id} prompt={prompt} creator={prompt.creator} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2">
                <button disabled={page <= 1} onClick={() => { setPage(page - 1); applyFilters({ page: page - 1 }); }} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => { setPage(i + 1); applyFilters({ page: i + 1 }); }} className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : ""}`}>
                        {i + 1}
                    </button>
                ))}
                <button disabled={page >= totalPages} onClick={() => { setPage(page + 1); applyFilters({ page: page + 1 }); }} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
            </div>
        </div>
    );
}