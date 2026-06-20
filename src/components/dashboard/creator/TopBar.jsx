'use client';

import { Button } from '@heroui/react';

export default function TopBar({ onAdd, isLimitReached }) {

    return (
        <div className="max-w-4xl mx-auto my-6 flex justify-between items-center bg-white border border-gray-300 rounded-xl px-5 py-4 shadow-sm">

            <div>
                <h1 className="text-black font-bold text-lg">
                    Prompt Studio
                </h1>
                <p className="text-gray-600 text-xs">
                    Create & manage AI prompts
                </p>
            </div>

            <div className="flex gap-3 items-center">

                <Button
                    onPress={onAdd}
                    disabled={isLimitReached}
                    className={`font-semibold ${isLimitReached
                            ? "bg-gray-200 text-gray-500"
                            : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    + Add Prompt
                </Button>

                <div className="text-xs text-gray-700 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
                    Free: 3 Posts
                </div>

            </div>
        </div>
    );
}