import PromptDetailsClient from "@/components/PromptDetailsClient";
import RatingSection from "@/components/RatingSection";
import { getPromptById } from "@/lib/api/prompt";
import { getUserSession } from "@/lib/core/session";

export default async function PromptDetailsPage({ params }) {

    const { id } = await params;

    // fetch data
    const prompt = await getPromptById(id);

    // fetch user session (IMPORTANT FIX)
    const user = await getUserSession();

    return (
        <div>

            <PromptDetailsClient
                prompt={prompt}
                user={user}
            />

            <RatingSection
                promptId={prompt._id}
                initialAvg={prompt.ratingAvg || 0}
                user={user}
            />

        </div>
    );
}