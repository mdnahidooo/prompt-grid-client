import { getFeaturedPrompts } from "@/lib/api/prompt";
import PromptCard from "./PromptCard";

export default async function FeaturedPromptsSection() {

    const prompts = await getFeaturedPrompts();

    return (
        <section className="py-20 bg-[#FBF5DD]">

            <div className="max-w-7xl mx-auto px-4">

                {/* HEADER */}
                <div className="text-center mb-12">

                    <span className="inline-block px-4 py-1 rounded-full bg-[#059669]/10 text-[#059669] font-medium text-sm">
                        Featured Prompts
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-black">
                        Discover Top AI Prompts
                    </h2>

                    <p className="mt-3 text-black/60 max-w-2xl mx-auto">
                        Explore high-quality prompts created by our community.
                        From coding to marketing, find prompts that boost productivity.
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {prompts?.length > 0 ? (
                        prompts.map((prompt) => (
                            <PromptCard
                                key={prompt._id}
                                prompt={prompt}
                                creator={prompt.creator}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No featured prompts found
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}