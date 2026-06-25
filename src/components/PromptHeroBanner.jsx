"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

const trendingTags = [
    "ChatGPT Prompts",
    "Marketing AI",
    "Productivity",
    "Coding Helper",
    "Content Writing",
    "Business Ideas",
    "SEO Boost",
    "Automation"
];

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function PromptHeroBanner() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSearch = (value) => {
        const params = new URLSearchParams();
        if (value) params.set("search", value);
        router.push(`/prompts?${params.toString()}`);
    };

    return (
        <section className="relative w-full bg-[#FAF7F0] py-16 md:py-10 overflow-hidden">
            <div className="absolute top-[20] left-20 w-72 h-72 bg-[#059669]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#E7E1B1] blur-3xl rounded-full" />

            <motion.div
                className="max-w-5xl mx-auto px-4 text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* ICON */}
                <motion.div variants={itemVariants} className="flex justify-center mb-4">
                    <div className="p-3 rounded-2xl bg-white shadow-sm border border-[#E7E1B1]">
                        <Sparkles className="text-[#059669]" />
                    </div>
                </motion.div>

                {/* TITLE */}
                <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-[#212121] leading-tight">
                    Discover Powerful <span className="text-[#059669]">AI Prompts</span>
                    <br />
                    for Creativity & Productivity
                </motion.h1>

                {/* SUBTITLE */}
                <motion.p variants={itemVariants} className="mt-4 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                    Explore thousands of prompts for ChatGPT, Gemini, Claude and more.
                    Boost your workflow with automation and smart AI ideas.
                </motion.p>

                {/* SEARCH BAR */}
                <motion.div variants={itemVariants} className="mt-8 flex items-center gap-2 bg-white border border-[#E7E1B1] rounded-2xl p-2 shadow-sm max-w-2xl mx-auto">
                    <Search className="ml-2 text-gray-400" size={18} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSearch(search); }}
                        placeholder="Search prompts (AI, marketing, coding...)"
                        className="w-full outline-none bg-transparent px-2 text-sm text-[#212121]"
                    />
                    <button
                        onClick={() => handleSearch(search)}
                        className="bg-[#059669] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#047857] transition"
                    >
                        Search
                    </button>
                </motion.div>

                {/* TRENDING TAGS */}
                <motion.div variants={itemVariants} className="mt-6 flex flex-wrap justify-center gap-2">
                    {trendingTags.map((tag, i) => (
                        <button
                            key={i}
                            onClick={() => handleSearch(tag)}
                            className="px-3 py-1 text-xs rounded-full border border-[#E7E1B1] bg-white hover:bg-[#059669] hover:text-white transition"
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* CTA BUTTON */}
                <motion.div variants={itemVariants} className="mt-10">
                    <button
                        onClick={() => router.push("/prompts")}
                        className="inline-flex items-center gap-2 bg-[#059669] text-white px-6 py-3 rounded-2xl font-medium hover:bg-[#047857] transition shadow-md"
                    >
                        <Wand2 size={18} />
                        Explore All Prompts
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}