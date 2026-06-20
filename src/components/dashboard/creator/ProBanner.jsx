'use client';

import { Button } from '@heroui/react';

export default function ProBanner({ show }) {

    if (!show) return null;

    return (
        <div className="max-w-4xl mx-auto mb-5 bg-purple-100 border border-purple-300 rounded-xl p-4 flex justify-between items-center">

            <div>
                <h2 className="text-black font-semibold">
                    Upgrade to Pro
                </h2>
                <p className="text-gray-600 text-sm">
                    You reached free limit (3 prompts)
                </p>
            </div>

            <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Go Pro
            </Button>

        </div>
    );
}