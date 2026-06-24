import PromptDetailsClient from "@/components/PromptDetailsClient";
import { getPromptById } from "@/lib/api/prompt";
import { getCurrentUser } from "@/lib/api/user";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/session";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";


export async function generateMetadata({ params }) {
    const { id } = await params;

    const prompt = await getPromptById(id);

    return {
        title: prompt?.title || "Prompt Details",
        description:
            prompt?.description || "View prompt details",
    };
}


export default async function PromptDetailsPage({ params }) {
    const { id } = await params;

    const prompt = await getPromptById(id);
    const user = await getUserSession();

     const session = await auth.api.getSession({
            headers: await headers(),
        });
    
    const res = await getCurrentUser(session.user.id);
    const currentUser = res?.user;

    if (!currentUser) redirect("/auth/signin");


    // ❌ only approved allowed
    if (!prompt || prompt.status !== "approved") {
        return notFound();
    }

    const isPrivate = prompt.visibility === "private";
    const isPremium = currentUser?.plan === "premium";
    const isOwner = currentUser?._id === prompt.creatorId;

    // full access only for premium OR owner
    const fullAccess = !isPrivate || isPremium || isOwner;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            <PromptDetailsClient
                prompt={prompt}
                user={user}
                fullAccess={fullAccess}
                currentUser={currentUser}
            />

        </div>
    );
}