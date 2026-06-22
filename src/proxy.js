import { NextResponse } from 'next/server'
import { headers } from "next/headers";
import { auth } from './lib/auth';


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    // console.log("Message from proxy");

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

}



export const config = {
    matcher: ['/prompts/:path'],
}