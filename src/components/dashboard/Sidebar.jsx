"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
    ShieldCheck,
    Users,
    FileText,
    CreditCard,
    Flag,
    Home,
    PlusCircle,
    FolderKanban,
    UserCircle,
    Bookmark,
    Star,
    Circle,
} from "lucide-react";
import { Chip } from "@heroui/react";

/* ICON MAP */
const iconMap = {
    ShieldCheck,
    Users,
    FileText,
    CreditCard,
    Flag,
    Home,
    PlusCircle,
    FolderKanban,
    UserCircle,
    Bookmark,
    Star,
};

export default function Sidebar({ user, role, linksByRole }) {
    const pathname = usePathname();
    const router = useRouter();

    const activeNavigation = linksByRole[role] || linksByRole.user;

    /* LOGOUT HANDLER */
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <aside
            className="w-full md:w-64 text-white border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between shrink-0"
            style={{ backgroundColor: "#059669" }}
        >
            
            {/* TOP */}
            <div className="space-y-6">

                {/* BRAND */}
                <Link href="/">
                    <div className="flex items-center gap-3 group">

                        <div className="flex items-center gap-2">
                            <span className="font-mono text-2xl text-white font-black">[ ⬚ ]</span>
                            <span className="font-black text-lg tracking-tight">PromptGrid</span>
                        </div>

                    </div>
                </Link>

                {/* DIVIDER */}
                <div className="pt-2">
                    <div className="border-t border-white/15" />
                </div>

                {/* NAV */}
                <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2">

                    {activeNavigation.map((link, idx) => {
                        const Icon = iconMap[link.icon] || Circle;
                        const isActive = pathname === link.path;

                        return (
                            <Link
                                key={idx}
                                href={link.path}
                                className={`group whitespace-nowrap text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 border ${isActive
                                    ? "bg-white text-[#059669] shadow-sm"
                                        : "text-white/90 hover:text-white hover:bg-white/10 border-transparent"
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className="shrink-0 text-current stroke-2"
                                />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

            </div>

            {/* BOTTOM */}
            <div className="pt-4 border-t border-white/10 space-y-3">

                <div className="flex items-center justify-between gap-3">

                    {/* USER */}
                    <div className="flex items-center gap-3 min-w-0">

                        <div className="relative w-9 h-9 rounded-full bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center text-white font-bold shrink-0">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                user.name?.[0]?.toUpperCase()
                            )}
                        </div>

                        <div className="flex flex-col leading-tight min-w-0">
                            <span className="text-xs font-semibold text-white truncate">
                                {user.name}
                            </span>
                            <span className="text-[10px] text-white/60 truncate">
                                {user.email}
                            </span>
                        </div>

                    </div>

                    {/* LOGOUT (WORKING) */}
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200"
                    >
                        <span className="text-[10px] font-semibold text-white/80 group-hover:text-white">
                            Logout
                        </span>
                    </button>

                </div>

            </div>
        </aside>
    );
}