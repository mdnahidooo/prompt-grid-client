"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PromptCard from "@/components/PromptCard";

export default function PromptsContainer({
    initialData,
    initialFilters
}) {

    const router = useRouter();

    // ---------------- STATE ----------------
    const [data, setData] = useState(initialData.data || []);
    const [total, setTotal] = useState(initialData.total || 0);

    const [search, setSearch] = useState(initialFilters.search || "");
    const [category, setCategory] = useState(initialFilters.category || "all");
    const [aiTool, setAiTool] = useState(initialFilters.aiTool || "all");
    const [difficulty, setDifficulty] = useState(initialFilters.difficulty || "all");
    const [sort, setSort] = useState(initialFilters.sort || "latest");
    const [page, setPage] = useState(Number(initialFilters.page || 1));

    const limit = 12;

    const totalPages = Math.ceil(total / limit);

    // ---------------- URL SYNC (CRITICAL) ----------------
    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (category !== "all") params.set("category", category);
        if (aiTool !== "all") params.set("aiTool", aiTool);
        if (difficulty !== "all") params.set("difficulty", difficulty);
        if (sort) params.set("sort", sort);
        if (page) params.set("page", page);

        // router.push(`/prompts?${params.toString()}`);

        const url = `/prompts?${params.toString()}`;

        router.replace(url);
        router.refresh(); // 🔥 THIS IS THE MAGIC

    }, [search, category, aiTool, difficulty, sort, page]);

    // ---------------- UI ----------------
    return (
        <div className="max-w-7xl mx-auto">

            {/* ================= FILTER BAR ================= */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">

                {/* SEARCH */}
                <input
                    className="border p-2 rounded"
                    placeholder="Search prompts..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset page on search
                    }}
                />

                {/* CATEGORY */}
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All Category</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="coding">Coding</option>
                </select>

                {/* AI TOOL */}
                <select
                    value={aiTool}
                    onChange={(e) => {
                        setAiTool(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All AI Tools</option>
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Claude">Claude</option>
                </select>

                {/* DIFFICULTY */}
                <select
                    value={difficulty}
                    onChange={(e) => {
                        setDifficulty(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All Difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="pro">Pro</option>
                </select>

                {/* SORT */}
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="copied">Most Copied</option>
                </select>

            </div>

            {/* ================= RESULTS INFO ================= */}
            <div className="mb-4 text-sm text-gray-500">
                Showing {data.length} of {total} prompts
            </div>

            {/* ================= CARDS ================= */}
            {data.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No prompts found
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((prompt) => (
                        <PromptCard
                            key={prompt._id}
                            prompt={prompt}
                            creator={prompt.creator}
                        />
                    ))}
                </div>
            )}

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center mt-10 gap-2">

                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : ""
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>
    );
}