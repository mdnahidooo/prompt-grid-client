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

    const res = await getMyReviews(user.id);
    const reviews = res?.data || [];

    return (
        <div className="max-w-5xl mx-auto py-8 space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-black text-black">
                    My Reviews
                </h1>
                <p className="text-sm text-gray-500">
                    All your submitted reviews
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-2xl overflow-hidden">

                {/* HEADER */}
                <div className="grid grid-cols-12 p-3 bg-gray-50 text-xs font-bold text-gray-500 border-b">
                    <div className="col-span-3">Prompt</div>
                    <div className="col-span-6">Review</div>
                    <div className="col-span-3">Date</div>
                </div>

                {/* BODY */}
                {reviews.length === 0 ? (
                    <div className="p-10 text-center text-gray-400 text-sm">
                        No reviews found
                    </div>
                ) : (
                    reviews.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 p-3 border-b hover:bg-gray-50"
                        >
                            <div className="col-span-3 font-medium text-black">
                                {item.promptTitle || "Untitled"}
                            </div>

                            <div className="col-span-6 text-sm text-gray-600 line-clamp-2">
                                {item.review}
                            </div>

                            <div className="col-span-3 text-xs text-gray-400">
                                {item.createdAt
                                    ? new Date(item.createdAt).toLocaleString()
                                    : "N/A"}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}