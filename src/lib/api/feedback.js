
import { clientMutationWithToken } from "../core/getTokenClient";


// Creator fetch rejection feedback for their prompt
export const getRejectionFeedback = async (promptId) => {
    if (!promptId) return null;

    return clientMutationWithToken(`/api/feedback/${promptId}`);
};