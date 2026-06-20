import { getCreatorAllPrompt } from '@/lib/api/prompt';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import MyPrompts from './MyPrompts';

export default async function MyPromptsPage() {
    // 1. Get the session directly on the server
    const user = await getUserSession();
    // console.log(user);

    // 2. Redirect to login if no user session is found
    if (!user) {
        redirect('/login');
    }

    const prompts = await getCreatorAllPrompt(user?.id);
    // console.log(prompts);


    // 4. Pass the fetched data to the Client Component
    return (
        <div>
            <MyPrompts prompts={prompts}></MyPrompts>
        </div>
    );
}