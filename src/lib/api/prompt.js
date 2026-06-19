import { serverFetch } from "../core/server";


export const getCreatorPrompt = async (creatorId) => {
    return serverFetch(`/api/my/prompts?creatorId=${creatorId}`);
}