"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTokenServer = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    return token || null;
};

export const subscription = async (data) => {
    const res = await fetch(`${baseUrl}/subscription`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};



export const getAllPayments = async () => {
    const token = await getTokenServer();
    
    try {
        const res = await fetch(`${baseUrl}/payments`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        return await res.json();
    } catch (error) {
        console.error(error);

        return {
            success: false,
            payments: [],
        };
    }
};