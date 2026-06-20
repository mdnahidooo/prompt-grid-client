"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Users, Rocket, Brain, Star } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI-Powered Prompt System",
        desc: "Discover, create and optimize prompts using structured AI workflows.",
    },
    {
        icon: Users,
        title: "Built for Everyone",
        desc: "Users, creators, and admins all have dedicated powerful dashboards.",
    },
    {
        icon: Rocket,
        title: "Fast & Scalable",
        desc: "Optimized architecture for high performance and smooth experience.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Role System",
        desc: "JWT-based role protection for admin, creator and user access.",
    },
    {
        icon: Sparkles,
        title: "Featured Content System",
        desc: "Admins can highlight top prompts for better visibility.",
    },
    {
        icon: Star,
        title: "Quality First Platform",
        desc: "Every prompt is reviewed, rated, and curated for value.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 px-6 bg-linear-to-b from-white to-[#F8FAFC]">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-[#0F172A]">
                    Why Choose PromptGrid?
                </h2>
                <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                    A modern AI prompt marketplace designed for creators, users, and administrators
                    with powerful control and seamless experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {features.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-4">
                                <Icon className="text-[#0F172A]" size={22} />
                            </div>

                            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}