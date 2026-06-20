import { serverFetch } from "../core/server";



export const getCreatorPrompt = async (creatorId) => {
    return serverFetch(`/api/my/prompts?creatorId=${creatorId}`);
}

export const getCreatorAllPrompt = async (creatorId) => {
    return serverFetch(`/api/my-prompts?creatorId=${creatorId}`);
}