// import Image from "next/image";
// import Link from "next/link";
// import { getTopCreators } from "@/lib/api/creators";

// export default async function TopCreatorsSection() {
//     const creators = await getTopCreators();
//     const top6 = creators?.slice(0, 6) || [];

//     return (
//         <section className="py-20 px-4 bg-white text-center">

//             {/* Header Section */}
//             <div className="max-w-3xl mx-auto mb-12">
//                 <h2 className="text-4xl md:text-5xl font-bold text-[#212121] leading-tight">
//                     Join more than{" "}
//                     <span className="text-[#059669]">3 million creator</span>{" "}
//                     worldwide
//                 </h2>
//             </div>

//             {/* Creators Avatars */}
//             <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
//                 {top6.map((creator, index) => {
//                     const fallbackText =
//                         creator?.name?.charAt(0)?.toUpperCase() ||
//                         String(index + 1);

//                     return (
//                         <div
//                             key={creator?._id || index}
//                             className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200"
//                         >
//                             {/* IMAGE */}
//                             {creator?.image ? (
//                                 <Image
//                                     src={creator.image}
//                                     alt={creator.name || "Creator"}
//                                     fill
//                                     sizes="96px"
//                                     className="object-cover"
//                                 />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xl uppercase">
//                                     {fallbackText}
//                                 </div>
//                             )}

//                             <div className="absolute bottom-0 right-0 z-10 bg-[#059669] text-white text-[10px] px-1.5 py-0.5 rounded-full shadow">
//                                 {creator?.totalPrompts ?? 0}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/all-prompts">
//                     <button className="px-8 py-3 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#047857] transition-all">
//                         Become a Creator
//                     </button>
//                 </Link>

//                 <Link href="/about">
//                     <button className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-all">
//                         Browse All Prompts
//                     </button>
//                 </Link>
//             </div>
//         </section>
//     );
// }






import Image from "next/image";
import Link from "next/link";
import { getTopCreators } from "@/lib/api/creators";

export default async function TopCreatorsSection() {
    const creators = await getTopCreators();
    const top6 = creators || [];

    return (
        <section className="py-24 px-4 bg-linear-to-b from-white to-gray-50">

            {/* HEADER */}
            <div className="max-w-3xl mx-auto text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold text-[#212121]">
                    Top <span className="text-[#059669]">Creators</span>
                </h2>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">

                {top6.map((creator, index) => (
                    <div
                        key={creator?._id || index}
                        className="flex flex-col items-center group"
                    >

                        {/* AVATAR */}
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">

                            {creator?.image ? (
                                <Image
                                    src={creator.image}
                                    alt={creator?.name || "creator"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                                    {(creator?.name?.[0] || "U").toUpperCase()}
                                </div>
                            )}

                            {/* RANK */}
                            <div className="absolute top-0 left-0 bg-black text-white text-[10px] px-2 py-0.5 rounded-br-lg">
                                #{index + 1}
                            </div>

                            {/* 🔥 PROMPT COUNT BADGE (FIXED) */}
                            <div className="absolute bottom-0 right-0 bg-[#059669] text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                                {creator?.totalPrompts !== undefined
                                    ? creator.totalPrompts
                                    : 0}
                            </div>
                        </div>

                        {/* NAME */}
                        <p className="mt-3 text-sm font-semibold text-gray-800">
                            {creator?.name || "Unknown"}
                        </p>

                        <p className="text-[11px] text-gray-500">
                            Creator
                        </p>
                    </div>
                ))}

            </div>

            {/* CTA */}
            <div className="text-center mt-14">
                <Link href="/auth/signup">
                    <button className="px-8 py-3 bg-[#059669] text-white rounded-full hover:bg-[#047857] transition">
                        Become a Creator
                    </button>
                </Link>
            </div>

        </section>
    );
}