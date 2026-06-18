import { auth } from "@/lib/auth"; // Adjust this path to wherever your auth configuration is exported
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // Fetch the active session from your MongoDB collections via Better-Auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If no active token matches in the session collection, kick them out
    if (!session) {
        redirect("/auth/signin");
    }

    const user = session.user;

    // Direct them dynamically based on their database role string
    if (user.role === "admin") {
        redirect("/dashboard/admin");
    } else if (user.role === "creator") {
        redirect("/dashboard/creator");
    } else {
        redirect("/dashboard/user");
    }
}