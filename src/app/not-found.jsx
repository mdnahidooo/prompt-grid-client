import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] px-4">
                <div className="text-center max-w-md">

                    {/* Title */}
                    <h1 className="text-6xl font-bold text-[#3D2B1F]">
                        404
                    </h1>

                    {/* Subtitle */}
                    <h2 className="mt-4 text-2xl font-semibold text-[#3D2B1F]">
                        Prompt Not Found
                    </h2>

                    <p className="mt-2 text-sm text-[#6b5b52]">
                        The page you’re looking for doesn’t exist or has been moved.
                    </p>

                    {/* Decorative line */}
                    <div className="w-20 h-0.5 bg-[#059669] mx-auto my-6"></div>

                    {/* Button */}
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-[#059669] text-white rounded-md hover:opacity-90 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;