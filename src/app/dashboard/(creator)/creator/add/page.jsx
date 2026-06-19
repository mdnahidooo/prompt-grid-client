
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AddPromptForm from './AddPromptForm';
import { getCreatorPrompt } from '@/lib/api/prompt';

const page = async() => {
    const user = await getUserSession();
    console.log("from user", user);
    const prompt = await getCreatorPrompt(user?.id);
    console.log('from prompt', prompt);

    return (
        <div>
            <AddPromptForm creator={user} creatorPrompt={prompt}></AddPromptForm>
        </div>
    );
};

export default page;