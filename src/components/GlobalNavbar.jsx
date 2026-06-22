"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    House,
    Compass,
    LayoutTabs,
    Xmark,
    ChevronDown,
    Gear,
    ArrowRightFromSquare,
    Bars
} from "@gravity-ui/icons";

export default function GlobalNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    
    if (pathname.includes('dashboard')) {
        return null;
    }
    // if (pathname.includes('auth')) {
    //     return null;
    // }

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsDropdownOpen(false);
                    setIsDrawerOpen(false);
                    router.push("/auth/signin");
                    router.refresh();
                }
            }
        });
    };

    const getDashboardPath = () => {
        if (!user) return "/auth/signin";
        if (user.role === "admin") return "/dashboard/admin";
        return user.role === "creator" ? "/dashboard/creator" : "/dashboard/user";
    };

    return (
        <nav className="bg-white py-4 border-b border-[#306D29]/10 sticky top-0 z-50 backdrop-blur-md transition-all shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Left Side: Mobile Hamburger Menu & Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="sm:hidden text-black hover:text-[#059669] focus:outline-none p-1.5 rounded-xl hover:bg-black/5 transition-all"
                            aria-label="Open Menu"
                        >
                            <Bars className="w-5 h-5" />
                        </button>

                        <Link href="/" className="flex items-center gap-2 group select-none">
                            <span className="font-mono text-xl text-[#059669] font-black tracking-tight group-hover:scale-110 transition-transform duration-200">
                                [ ⬚ ]
                            </span>
                            <p className="font-black text-xl text-black tracking-tight group-hover:text-[#059669] transition-colors duration-200">
                                PromptGrid
                            </p>
                        </Link>
                    </div>

                    {/* Center: Sleek High-End SaaS Navigation Links */}
                    <div className="hidden sm:flex gap-1 items-center bg-black/5 p-1 rounded-xl border border-black/3">
                        <Link
                            href="/"
                            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 ${pathname === "/"
                                ? "bg-[#059669] text-white shadow-sm"
                                : "text-black hover:text-[#059669] hover:bg-white/40"
                                }`}
                        >
                            <House className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/prompts"
                            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 ${pathname === "/prompts"
                                ? "bg-[#059669] text-white shadow-sm"
                                : "text-black hover:text-[#059669] hover:bg-white/40"
                                }`}
                        >
                            <Compass className="w-3.5 h-3.5" />
                            <span>All Prompts</span>
                        </Link>
                        {user && (
                            <Link
                                href={getDashboardPath()}
                                className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 ${pathname.startsWith("/dashboard")
                                    ? "bg-[#059669] text-white shadow-sm"
                                    : "text-black hover:text-[#059669] hover:bg-white/40"
                                    }`}
                            >
                                <LayoutTabs className="w-3.5 h-3.5" />
                                <span>Dashboard</span>
                            </Link>
                        )}
                    </div>

                    {/* Right Side Actions: Profile Card UI & Modern Logout */}
                    <div className="flex items-center gap-3">
                        {isPending ? (
                            <div className="w-9 h-9 rounded-full bg-[#306D29]/10 animate-pulse" />
                        ) : user ? (
                            <div className="relative flex items-center gap-3">

                                {/* Modern Profile Container (Avatar Left, Info Right) */}
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2.5 text-left focus:outline-none bg-white/40 hover:bg-white border border-black/5 p-1 pr-3 rounded-full shadow-sm transition-all duration-200 group"
                                >
                                    <div className="border border-[#306D29]/20 rounded-full overflow-hidden w-8 h-8 shrink-0 relative shadow-sm">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name || "User Avatar"}
                                                fill
                                                sizes="32px"
                                                className="object-cover"
                                            />
                                        ) : (
                                                    <div className="w-full h-full bg-[#059669] text-[#FBF5DD] flex items-center justify-center font-bold text-xs uppercase">
                                                {user.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="hidden md:flex flex-col leading-tight select-none">
                                            <span className="text-xs font-bold text-black group-hover:text-[#059669] transition-colors truncate max-w-25">
                                            {user.name}
                                        </span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 mt-0.5 rounded border w-max ${user.plan === "premium"
                                                ? "bg-amber-500/10 text-amber-800 border-amber-500/20"
                                                : "bg-[#306D29]/10 text-[#059669] border-[#306D29]/20"
                                            }`}>
                                            {user.plan || "free"}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-3 h-3 text-black/30 transition-transform duration-200 hidden md:block ${isDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Desktop Direct Logout Button with SignOut Icon */}
                                <button
                                    onClick={handleLogout}
                                        className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-black border border-gray-200 bg-[#f6f6f7] hover:bg-[#e7eaf0] px-5 py-3 rounded-full transition-all active:scale-95 shadow-2sm"
                                >
                                        <ArrowRightFromSquare className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>

                                {/* Dropdown Card Menu Overlay */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-12 w-56 rounded-2xl bg-white border border-black/6 shadow-xl py-2 z-50 text-black animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-4 py-2 border-b border-black/5 md:hidden">
                                            <p className="font-bold text-sm text-black truncate">{user.name}</p>
                                            <p className="text-xs text-black/50 truncate mb-1.5">{user.email}</p>
                                                <span className="inline-block px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-extrabold bg-[#FBF5DD] text-[#059669] rounded border border-[#E7E1B1]">
                                                Plan: {user.plan || "free"}
                                            </span>
                                        </div>
                                        <div className="px-4 py-1.5 hidden md:block border-b border-black/5">
                                            <p className="text-xs font-medium text-black/40 truncate">{user.email}</p>
                                                <p className="text-[10px] font-bold text-[#059669] mt-0.5 uppercase tracking-wide">Role: {user.role}</p>
                                        </div>
                                        <Link
                                            href={getDashboardPath()}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-black hover:bg-[#FBF5DD] transition-colors"
                                        >
                                                <LayoutTabs className="w-4 h-4 text-black/40" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex sm:hidden items-center justify-between w-full text-left px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors border-t border-black/5 mt-1"
                                        >
                                            <span>Log Out</span>
                                                <ArrowRightFromSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/auth/signin" className="text-black hover:text-[#306D29] font-bold text-xs px-5 py-3 rounded-full hover:bg-black/5 transition-all">
                                    Login
                                </Link>
                                        <Link href="/auth/signup" className="bg-[#059669] text-white hover:bg-[#059669] font-bold text-xs px-5 py-3 rounded-full shadow-sm transition-all active:scale-95">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* --- Mobile Left-Side Drawer Menu System --- */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-50 flex sm:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsDrawerOpen(false)} />
                    <div className="relative flex flex-col w-full max-w-xs bg-[#FBF5DD] border-r border-[#E7E1B1] h-full p-5 shadow-2xl animate-in slide-in-from-left duration-200 text-black">

                        <div className="flex items-center justify-between pb-4 border-b border-black/5">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xl text-[#059669] font-bold">[ ⬚ ]</span>
                                <p className="font-extrabold text-lg text-black">PromptGrid</p>
                            </div>
                            <button onClick={() => setIsDrawerOpen(false)} className="text-black hover:text-red-600 p-1.5 rounded-xl hover:bg-black/5 focus:outline-none transition-all">
                                <Xmark className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Drawer Profile Block */}
                        {user && (
                            <div className="mt-4 p-3 bg-white/60 rounded-2xl border border-black/5 flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 border border-[#306D29]/10 rounded-full overflow-hidden shrink-0 relative shadow-sm">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User Avatar"}
                                            fill
                                            sizes="40px"
                                            className="object-cover"
                                        />
                                    ) : (
                                            <div className="w-full h-full bg-[#059669] text-[#FBF5DD] flex items-center justify-center font-bold uppercase">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-black truncate">{user.name}</span>
                                    <span className={`text-[9px] uppercase font-black px-1.5 py-0.2 rounded border mt-0.5 w-max ${user.plan === "premium"
                                            ? "bg-amber-500/10 text-amber-800 border-amber-500/20"
                                        : "bg-[#306D29]/10 text-[#059669] border border-[#306D29]/20"
                                        }`}>
                                        {user.plan || "free"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Mobile Navigation Links with Icons */}
                        <div className="mt-6 flex flex-col gap-1.5 grow">
                            <Link
                                href="/"
                                onClick={() => setIsDrawerOpen(false)}
                                className={`flex items-center gap-3 text-sm font-bold p-3 rounded-xl transition-all ${pathname === "/" ? "bg-[#059669] text-white shadow-sm" : "hover:bg-black/5 text-black"
                                    }`}
                            >
                                <House className="w-4 h-4" />
                                <span>Home</span>
                            </Link>
                            <Link
                                href="/prompts"
                                onClick={() => setIsDrawerOpen(false)}
                                className={`flex items-center gap-3 text-sm font-bold p-3 rounded-xl transition-all ${pathname === "/prompts" ? "bg-[#059669] text-white shadow-sm" : "hover:bg-black/5 text-black"
                                    }`}
                            >
                                <Compass className="w-4 h-4" />
                                <span>All Prompts</span>
                            </Link>
                            {user && (
                                <Link
                                    href={getDashboardPath()}
                                    onClick={() => setIsDrawerOpen(false)}
                                    className={`flex items-center gap-3 text-sm font-bold p-3 rounded-xl transition-all ${pathname.startsWith("/dashboard") ? "bg-[#059669] text-white shadow-sm" : "hover:bg-black/5 text-black"
                                        }`}
                                >
                                    <LayoutTabs className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </Link>
                            )}
                        </div>

                        {user && (
                            <div className="pt-4 border-t border-black/5 mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-3 rounded-xl text-red-600 font-bold bg-red-50 hover:bg-red-100/60 transition-all flex items-center justify-between shadow-2sm"
                                >
                                    <span>Log Out</span>
                                    <ArrowRightFromSquare className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}