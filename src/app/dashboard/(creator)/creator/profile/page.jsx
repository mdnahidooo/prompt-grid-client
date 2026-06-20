import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import EditProfileModal from "./EditProfileModal";

export default async function CreatorProfilePage() {
    const user = await getUserSession();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-500">
                Please login to view profile
            </div>
        );
    }

    return (
        <div>

            <div className="max-w-5xl mx-auto">

                {/* CARD */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8">

                    {/* HEADER SECTION */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                        {/* AVATAR */}
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-600">

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

                        {/* INFO */}
                        <div className="flex-1 text-center md:text-left">

                            <h1 className="text-xl font-semibold text-slate-900">
                                {user?.name}
                            </h1>

                            <p className="text-slate-500 text-sm mt-1">
                                {user?.email}
                            </p>

                            <div className="mt-3">
                                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                    {user?.role || "creator"}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="my-6 border-t border-slate-200" />

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="border border-slate-200 rounded-xl p-5 text-center">
                            <p className="text-lg font-semibold text-slate-900">0</p>
                            <p className="text-sm text-slate-500">Total Prompts</p>
                        </div>

                        <div className="border border-slate-200 rounded-xl p-5 text-center">
                            <p className="text-lg font-semibold text-slate-900">0</p>
                            <p className="text-sm text-slate-500">Total Copies</p>
                        </div>

                        <div className="border border-slate-200 rounded-xl p-5 text-center">
                            <p className="text-lg font-semibold text-slate-900">Free</p>
                            <p className="text-sm text-slate-500">Plan</p>
                        </div>

                    </div>

                    {/* ACTION */}
                    <div className="mt-6 flex justify-end">
                        <EditProfileModal user={user} />
                    </div>

                </div>
            </div>
        </div>
    );
}