import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/signin");
    }

    const user = session.user;
    const role = user.role || "user";

    const linksByRole = {
        admin: [
            { label: "Admin Analytics", path: "/dashboard/admin", icon: "ShieldCheck" },
            { label: "All Users", path: "/dashboard/admin/users", icon: "Users" },
            { label: "All Prompts", path: "/dashboard/admin/prompts", icon: "FileText" },
            { label: "All Payments", path: "/dashboard/admin/payments", icon: "CreditCard" },
            { label: "Reported Prompts", path: "/dashboard/admin/reports", icon: "Flag" },
        ],
        creator: [
            { label: "Creator Home", path: "/dashboard/creator", icon: "Home" },
            { label: "Add Prompt", path: "/dashboard/creator/add", icon: "PlusCircle" },
            { label: "My Prompts", path: "/dashboard/creator/my-prompts", icon: "FolderKanban" },
            { label: "Profile Overview", path: "/dashboard/creator/profile", icon: "UserCircle" },
        ],
        user: [
            { label: "My profile", path: "/dashboard/user", icon: "UserCircle" },
            { label: "My Prompts", path: "/dashboard/user/my-prompts", icon: "FileText" },
            { label: "Saved Bookmarks", path: "/dashboard/user/bookmarks", icon: "Bookmark" },
            { label: "My Reviews", path: "/dashboard/user/reviews", icon: "Star" },
        ],
    };

    return (
        <div className="min-h-screen bg-[#FBF5DD]/30 text-black flex flex-col md:flex-row">
            <Sidebar user={user} role={role} linksByRole={linksByRole} />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}

                
            </main>
        </div>
    );
}