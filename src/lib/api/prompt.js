const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { serverFetch } from "../core/server";



export const getCreatorPrompt = async (creatorId) => {
    return serverFetch(`/api/my/prompts?creatorId=${creatorId}`);
}

export const getCreatorAllPrompt = async (creatorId) => {
    return serverFetch(`/api/my-prompts?creatorId=${creatorId}`);
}



export const getFeaturedPrompts = async () => {
    return serverFetch("/api/prompts/featured");
};


export const getPromptById = async (id) => {
    return serverFetch(`/api/prompts/${id}`);
};




export const getPrompts = async (queryString = "") => {
    const res = await fetch(`${baseUrl}/api/prompts?${queryString}`, {
        cache: "no-store"
    });

    return res.json();
};



// export const getPrompts = async (queryString = "") => {
//     try {
//         const res = await fetch(
//             `${baseUrl}/api/prompts?${queryString}`,
//             {
//                 cache: "no-store"
//             }
//         );

//         if (!res.ok) {
//             throw new Error("Failed to fetch prompts");
//         }

//         return await res.json();

//     } catch (error) {
//         console.error("getPrompts error:", error);
//         return {
//             success: false,
//             total: 0,
//             data: []
//         };
//     }
// };