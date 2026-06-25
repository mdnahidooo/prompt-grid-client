import { authClient } from "../auth-client";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const protectedClientFetch = async (path) => {
    const { data } = await authClient.getSession();

    const token = data?.session?.token;

    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};



export const clientMutationWithToken = async (
    path,
    data,
    method = "POST"
) => {
    const { data: sessionData } = await authClient.getSession();

    const token = sessionData?.session?.token;

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


// export const getTokenClient = async () => {
//     const { data } = await authClient.getSession();

    
//     return data?.session?.token || null;
// };

// export const serverMutationWithClientToken = async (path, data, method = 'POST') => {
//     const token = await getTokenClient()

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