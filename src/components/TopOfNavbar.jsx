"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopOfNavbar() {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
        const user = session?.user;
        
        if (pathname.includes('dashboard')) {
            return null;
        }
        if (pathname.includes('auth')) {
            return null;
        }
    return (
        <div className="w-full bg-[#059669] py-3 px-4 flex items-center justify-center text-white">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                {/* Announcement Text */}
                <p className="text-sm font-medium text-center">
                    🚀 Ready to level up? Explore our latest collection of top-tier AI prompts.
                </p>

                {/* Call to Action Button */}
                <Link
                    href="/all-prompts"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-black bg-white hover:bg-gray-100 px-5 py-2 rounded-full transition-all active:scale-95 shadow-sm"
                >
                    Explore Prompts →
                </Link>
            </div>
        </div>
    );
}