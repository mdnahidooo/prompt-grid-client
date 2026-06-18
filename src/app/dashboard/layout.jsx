import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardLayout({ children }) {
    // 1. Authenticate session securely against MongoDB via Better-Auth
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/signin");
    }

    const user = session.user;
    const role = user.role || "user"; // Fallback to safe default role

    // 2. Define functional links matching requirement mappings
    const linksByRole = {
        admin: [
            { label: "Platform Insights", path: "/dashboard/admin" },
            { label: "User Directory", path: "/dashboard/admin/users" },
            { label: "Marketplace Control", path: "/dashboard/admin/prompts" },
            { label: "Transaction Logs", path: "/dashboard/admin/payments" },
            { label: "Moderation Queue", path: "/dashboard/admin/reports" },
        ],
        creator: [
            { label: "Creator Home", path: "/dashboard/creator" },
            { label: "Add Prompt", path: "/dashboard/creator/add" },
            { label: "My Submissions", path: "/dashboard/creator/my-prompts" },
        ],
        user: [
            { label: "Profile Overview", path: "/dashboard/user" },
            { label: "Add Prompt", path: "/dashboard/user/add" },
            { label: "My Submissions", path: "/dashboard/user/my-prompts" },
            { label: "Saved Bookmarks", path: "/dashboard/user/bookmarks" },
            { label: "My Reviews", path: "/dashboard/user/reviews" },
        ],
    };

    const activeNavigation = linksByRole[role] || linksByRole.user;

    return (
        <div className="min-h-screen bg-[#FBF5DD]/30 text-black flex flex-col md:flex-row">

            {/* --- Dynamic Sidebar Frame --- */}
            <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#306D29]/10 p-6 flex flex-col justify-between shrink-0">
                <div className="space-y-6">
                    {/* Brand Banner */}
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-lg text-[#306D29] font-black">[ ⬚ ]</span>
                        <div className="flex flex-col">
                            <span className="font-black text-sm tracking-tight leading-none">PromptGrid</span>
                            <span className="text-[10px] uppercase font-black tracking-wider text-[#306D29] mt-1 bg-[#306D29]/10 px-1.5 py-0.5 rounded-md w-max">
                                {role} panel
                            </span>
                        </div>
                    </div>

                    {/* Conditional Dynamic Link Tree */}
                    <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-2 md:pb-0">
                        {activeNavigation.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.path}
                                className="whitespace-nowrap text-xs font-black px-4 py-2.5 rounded-xl hover:bg-[#306D29]/5 text-black/70 hover:text-[#306D29] transition-colors block border border-transparent hover:border-[#306D29]/10"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Base Context Identity */}
                <div className="hidden md:flex items-center gap-3 border-t border-black/5 pt-4">
                    <div className="relative w-8 h-8 rounded-full bg-[#306D29]/10 border border-[#306D29]/20 flex items-center justify-center font-mono font-black text-xs text-[#306D29] overflow-hidden">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User Avatar"}
                                fill
                                className="object-cover"
                                unoptimized // Allows dynamic fallback links from social logins without explicit remotePattern domains
                            />
                        ) : (
                            user.name?.[0]?.toUpperCase() || "U"
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black truncate">{user.name}</span>
                        <span className="text-[10px] text-black/40 font-mono truncate">{user.email}</span>
                    </div>
                </div>
            </aside>

            {/* --- Dynamic Viewing Workspace Context --- */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}