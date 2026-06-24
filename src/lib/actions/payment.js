"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    const res = await fetch(
        `${baseUrl}/payments`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};