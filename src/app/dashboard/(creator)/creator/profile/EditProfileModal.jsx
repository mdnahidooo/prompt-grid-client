"use client";

import { useState } from "react";

export default function EditProfileModal({ user }) {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: user?.name || "",
        image: user?.image || ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log(form);
        setOpen(false);
        // later: API call
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#14B8A6] text-white text-sm font-medium"
            >
                Edit Profile
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 p-6">

                        <h2 className="text-lg font-semibold text-slate-900 mb-4">
                            Edit Profile
                        </h2>

                        {/* NAME */}
                        <div className="mb-4">
                            <label className="text-sm text-slate-600">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        {/* IMAGE */}
                        <div className="mb-4">
                            <label className="text-sm text-slate-600">Image URL</label>
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm rounded-lg border border-slate-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-sm rounded-lg bg-[#14B8A6] text-white"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}