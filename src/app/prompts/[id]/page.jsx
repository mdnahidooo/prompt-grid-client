import PromptDetailsClient from "@/components/PromptDetailsClient";
import RatingSection from "@/components/RatingSection";
import { getPromptById } from "@/lib/api/prompt";
import { getUserSession } from "@/lib/core/session";
import { notFound } from "next/navigation";

export default async function PromptDetailsPage({ params }) {
    const { id } = await params;

    const prompt = await getPromptById(id);
    const user = await getUserSession();

    // ❌ only approved allowed
    if (!prompt || prompt.status !== "approved") {
        return notFound();
    }

    const isPrivate = prompt.visibility === "private";
    const isPremium = user?.plan === "premium";
    const isOwner = user?._id === prompt.creatorId;

    // full access only for premium OR owner
    const fullAccess = !isPrivate || isPremium || isOwner;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            <PromptDetailsClient
                prompt={prompt}
                user={user}
                fullAccess={fullAccess}
            />

            <RatingSection
                promptId={prompt._id}
                initialAvg={prompt.ratingAvg || 0}
                initialCount={prompt.ratingCount || 0}
                user={user}
                disabled={!fullAccess}
            />
        </div>
    );
}