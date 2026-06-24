import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getMyReviews } from "@/lib/api/reviews";

export default async function MyReviewsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/auth/signin");

    const user = session.user;

    const res = await getMyReviews(user.id || user._id);
    const reviews = res?.data || [];

    return (
        <div >

            <div className="max-w-5xl mx-auto space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#212121]">
                        My Reviews
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Your feedback on prompts you’ve used and rated
                    </p>
                </div>

                {/* STATS BAR */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-4">
                        <p className="text-xs text-gray-500">Total Reviews</p>
                        <h2 className="text-2xl font-bold text-[#059669]">
                            {reviews.length}
                        </h2>
                    </div>

                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-4">
                        <p className="text-xs text-gray-500">Average Rating</p>
                        <h2 className="text-2xl font-bold text-[#059669]">
                            {reviews.length
                                ? (
                                    reviews.reduce((acc, r) => acc + r.rating, 0) /
                                    reviews.length
                                ).toFixed(1)
                                : "0.0"}
                        </h2>
                    </div>

                    <div className="bg-white border border-[#E7E1B1] rounded-2xl p-4">
                        <p className="text-xs text-gray-500">Best Rating</p>
                        <h2 className="text-2xl font-bold text-[#059669]">
                            {reviews.length
                                ? Math.max(...reviews.map(r => r.rating))
                                : 0}
                        </h2>
                    </div>

                </div>

                {/* CONTENT */}
                {reviews.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E7E1B1] rounded-3xl">
                        <p className="text-gray-500">No reviews yet</p>
                    </div>
                ) : (
                    <div className="grid gap-5">

                        {reviews.map((item) => (
                            <div
                                key={item._id}
                                className="group bg-white border border-[#E7E1B1] rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                            >

                                {/* TOP ROW */}
                                <div className="flex items-start justify-between">

                                    {/* LEFT */}
                                    <div>
                                        <div className="flex items-center gap-2 text-[#059669] font-semibold">
                                            ⭐ {item.rating}/5
                                        </div>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {item.createdAt
                                                ? new Date(item.createdAt).toLocaleString()
                                                : "N/A"}
                                        </p>
                                    </div>

                                    {/* BADGE */}
                                    <div className="text-[10px] px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E7E1B1] text-[#059669]">
                                        Prompt Review
                                    </div>

                                </div>

                                {/* REVIEW TEXT */}
                                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                                    {item.review || "No review text provided."}
                                </p>

                                {/* FOOTER */}
                                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">

                                    {/* <span>
                                        Prompt ID: {item.title?.slice?.(-6) || "N/A"}
                                    </span> */}

                                    {/* <span className="opacity-0 group-hover:opacity-100 transition text-[#059669] font-medium">
                                        View Prompt →
                                    </span> */}

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}