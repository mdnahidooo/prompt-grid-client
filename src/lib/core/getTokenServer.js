const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { headers } from "next/headers";
import { auth } from "../auth";



// export const getTokenServer = async () => {
//     const { token } = await auth.api.getToken({
//         headers: await headers(),
//     });

//     return token || null;
// };


// export const protectedServerFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${token}`,
//         },
//     });
//     // handle 401, 404, 403
//     return res.json();
// }

// export const serverMutationWithToken = async (path, data, method = 'POST') => {
//     const token = await getTokenServer()

//     const res = await fetch(`${baseUrl}${path}`, {
//         method: method,
//         headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//     });

//     // handle 401, 404, 403

//     const result = await res.json();
//     return result;
// }



export const getTokenServer = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    return token || null;
};

export const protectedServerFetch = async (path) => {
    const token = await getTokenServer();

    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    return res.json();
};


export const serverMutationWithToken = async (
    path,
    data,
    method = "POST"
) => {
    const token = await getTokenServer();

    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};