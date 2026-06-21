export function getPromptAccess(prompt, user) {
    const isOwner =
        user && prompt.creatorId === user._id;

    const isAdmin = user?.role === "admin";

    const isPremium = user?.plan === "premium";

    // 1. status rules
    if (prompt.status === "rejected") {
        return { allowed: isOwner || isAdmin };
    }

    if (prompt.status === "pending") {
        return { allowed: isOwner || isAdmin };
    }

    // 2. visibility rules
    if (prompt.visibility === "public") {
        return { allowed: true };
    }

    if (prompt.visibility === "private") {
        return { allowed: isPremium || isOwner || isAdmin };
    }

    return { allowed: false };
}