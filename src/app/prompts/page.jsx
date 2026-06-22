export const dynamic = "force-dynamic";
import { getPrompts } from "@/lib/api/prompt";
import PromptsContainer from "./PromptsContainer";


export default async function Page({ searchParams }) {

    // ---------------- URL PARAMS ----------------
    const params = await searchParams;

    // Convert URL params → query string
    const queryString = new URLSearchParams(params).toString();

    // ---------------- FETCH DATA (SERVER SIDE) ----------------
    const data = await getPrompts(queryString);

    return (
        <div className="min-h-screen bg-[#FAF7F0] px-4 md:px-10 py-8">

            {/* ---------------- HEADER ---------------- */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#212121]">
                    All Prompts
                </h1>
                <p className="text-gray-500 mt-2">
                    Discover, copy, and use AI prompts from creators
                </p>
            </div>

            {/* ---------------- CLIENT CONTAINER ---------------- */}
            <PromptsContainer
                initialData={data}
                initialFilters={params}
            />

        </div>
    );
}