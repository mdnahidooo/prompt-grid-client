import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CopiedPromptDashboard from "./CopiedPromptDashboard";
import { getCopiedPrompts } from "@/lib/api/copied-prompts";


export default async function MyPromptsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/signin");
    }

    const user = session.user;

    // fetch copied prompts
    const res = await getCopiedPrompts(user.id);

    return (
        <div className="p-6">
            <CopiedPromptDashboard
                initialData={res.data}
                stats={res.stats}
                userId={user.id}
            />
        </div>
    );
}