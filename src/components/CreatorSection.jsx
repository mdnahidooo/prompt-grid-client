'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CreatorSection() {
    return (
        <section className="relative w-full py-20 px-4 bg-[#FDEE88] overflow-hidden">
            
            <motion.div
                initial={{ rotate: -10, x: -50 }}
                whileInView={{ rotate: -5, x: 0 }}
                className="absolute top-0 left-0 w-40 h-60 bg-[#F98A44] -rotate-12 -ml-10"
            />
            <motion.div
                initial={{ rotate: 5, x: 50 }}
                whileInView={{ rotate: 10, x: 0 }}
                className="absolute bottom-0 right-0 w-60 h-40 bg-[#A6AB74] rotate-6 -mr-10"
            />

            {/* Main Content */}
            <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-extrabold text-[#212121] mb-6 tracking-tight"
                >
                    Built for creators. Free forever.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-[#4A4A4A] mb-10 max-w-xl mx-auto font-medium"
                >
                    YouMind is the AI creative copilot trusted by millions of creators worldwide.
                    Every prompt here is curated to help you create better, faster.
                </motion.p>

                <Link href={'/auth/signup'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-[#212121] text-white font-bold rounded-lg flex items-center gap-2 mx-auto shadow-lg hover:bg-black transition-colors"
                    >
                        START CREATING WITH YOUR MIND →
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}