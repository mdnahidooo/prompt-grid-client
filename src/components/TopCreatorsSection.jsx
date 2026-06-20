import Image from "next/image";
import Link from "next/link";
import { getTopCreators } from "@/lib/api/creators";

export default async function TopCreatorsSection() {
    const creators = await getTopCreators();

    const top6 = creators?.slice(0, 6) || [];

    return (
        <section className="py-20 px-4 bg-white text-center">

            {/* Header Section */}
            <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#212121] leading-tight">
                    Join more than <span className="text-[#059669]">3 million creator</span> worldwide
                </h2>
            </div>

            {/* Creators Avatars */}
            <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
                {top6.map((creator, index) => {
                    const fallbackText =
                        creator?.name?.charAt(0)?.toUpperCase() ||
                        String(index + 1);

                    return (
                        <div
                            key={creator?._id || index}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-gray-200"
                        >
                            {/* IMAGE */}
                            {creator?.image ? (
                                <Image
                                    src={creator.image}
                                    alt={creator.name || "Creator"}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xl uppercase">
                                    {fallbackText}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/all-prompts">
                    <button className="px-8 py-3 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all">
                        Become a Creator
                    </button>
                </Link>

                <Link href="/about">
                    <button className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-all">
                        Browse All Prompts
                    </button>
                </Link>
            </div>
        </section>
    );
}