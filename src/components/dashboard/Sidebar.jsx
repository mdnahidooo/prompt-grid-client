import Link from "next/link";
import Image from "next/image";

export default function Sidebar({ user }) {
    const role = user.role || "user";

    // Role-based navigation mapping
    const links = {
        admin: [
            { label: "Overview", path: "/dashboard/admin" },
            { label: "Users", path: "/dashboard/admin/users" },
            { label: "Prompts", path: "/dashboard/admin/prompts" },
            { label: "Payments", path: "/dashboard/admin/payments" },
            { label: "Reports", path: "/dashboard/admin/reports" }
        ],
        creator: [
            { label: "Studio", path: "/dashboard/creator" },
            { label: "Add Prompt", path: "/dashboard/creator/add" },
            { label: "My Prompts", path: "/dashboard/creator/my-prompts" }
        ],
        user: [
            { label: "Profile", path: "/dashboard/user" },
            { label: "Add Prompt", path: "/dashboard/user/add" },
            { label: "My Prompts", path: "/dashboard/user/my-prompts" },
            { label: "Saved", path: "/dashboard/user/bookmarks" },
            { label: "Reviews", path: "/dashboard/user/reviews" }
        ],
    };

    const activeNavigation = links[role] || links.user;

    return (
        <aside className="w-full md:w-72 bg-white border-r border-black/6 p-8 flex flex-col justify-between shrink-0 h-screen sticky top-0">
            <div className="space-y-10">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black">P</div>
                    <span className="font-bold text-lg tracking-tighter">PromptGrid</span>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                    {activeNavigation.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-black/50 hover:bg-[#FBF5DD] hover:text-[#306D29] transition-all"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Profile Section */}
            <div className="pt-6 border-t border-black/6">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10">
                        {user.image ? (
                            <Image src={user.image} alt="Avatar" fill className="object-cover" unoptimized />
                        ) : (
                            <div className="w-full h-full bg-black/5 flex items-center justify-center font-bold text-xs">{user.name?.[0]?.toUpperCase()}</div>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{user.name}</p>
                        <p className="text-[11px] text-black/40 uppercase tracking-wider font-semibold">{role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}