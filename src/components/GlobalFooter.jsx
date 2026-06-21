"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalFooter() {
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
        <footer className="bg-[#E7E1B1]/40 border-t border-[#306D29]/10 text-black mt-auto select-none py-10 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="md:col-span-1 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xl text-[#059669] font-black">[ ⬚ ]</span>
                            <span className="font-black text-lg tracking-tight">PromptGrid</span>
                        </div>
                        <p className="text-xs text-black/60 leading-relaxed">
                            Discover, share, and optimize your AI workflows with a community-driven prompt library.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#059669] mb-3">Platform</h4>
                        <ul className="space-y-2 text-xs font-bold text-black/70">
                            <li><Link href="/" className="hover:text-[#306D29] transition-colors">Home</Link></li>
                            <li><Link href="/prompts" className="hover:text-[#059669] transition-colors">Explore Prompts</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#059669] transition-colors">Premium Plans</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#059669] mb-3">Resources</h4>
                        <ul className="space-y-2 text-xs font-bold text-black/70">
                            <li><Link href="/docs" className="hover:text-[#059669] transition-colors">Documentation</Link></li>
                            <li><Link href="/blog" className="hover:text-[#059669] transition-colors">AI Blog</Link></li>
                            <li><Link href="/support" className="hover:text-[#059669] transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Social Media & Newsletter Section */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#059669] mb-3">Stay Connected</h4>
                        <p className="text-xs text-black/60 mb-4">Follow our journey on social channels.</p>

                        {/* Social Links Row */}
                        <div className="flex items-center gap-3">
                            {/* X / Twitter */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-black/5 hover:bg-[#306D29]/10 text-black hover:text-[#059669] rounded-xl transition-colors border border-black/5"
                                aria-label="Twitter"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-black/5 hover:bg-[#306D29]/10 text-black hover:text-[#059669] rounded-xl transition-colors border border-black/5"
                                aria-label="GitHub"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-black/5 hover:bg-[#306D29]/10 text-black hover:text-[#059669] rounded-xl transition-colors border border-black/5"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .58 1 1.42v4.7zM6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5V18.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-black/40">
                    <p>© {new Date().getFullYear()} PromptGrid. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}