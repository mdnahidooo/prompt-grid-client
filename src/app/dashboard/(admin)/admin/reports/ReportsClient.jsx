"use client";

import { useState } from "react";
import {
    dismissReport,
    warnCreator,
    removeReportedPrompt
} from "@/lib/actions/admin/reports";

export default function AdminReportsClient({ initialData }) {

    const [reports, setReports] = useState(initialData);
    const [filter, setFilter] = useState("all");
    const [loadingId, setLoadingId] = useState(null);

    const [modal, setModal] = useState({
        open: false,
        type: null,
        id: null
    });

    // ---------------- FILTER ----------------
    const filtered = reports.filter(r => {
        if (filter === "all") return true;
        return r.reportStatus === filter;
    });

    // ---------------- ACTION HANDLER ----------------
    const handleAction = async () => {
        const { type, id } = modal;

        setLoadingId(id);

        try {
            let res;

            if (type === "dismiss") {
                res = await dismissReport(id);
            }

            if (type === "warn") {
                res = await warnCreator(id);
            }

            if (type === "remove") {
                res = await removeReportedPrompt(id);
            }

            // update UI instantly
            setReports(prev =>
                prev.map(r =>
                    r._id === id
                        ? { ...r, reportStatus: res?.data?.reportStatus || type }
                        : r
                )
            );

        } catch (err) {
            console.error(err);
        }

        setLoadingId(null);
        setModal({ open: false, type: null, id: null });
    };

    return (
        <div className="max-w-7xl mx-auto">

            {/* ================= FILTER BAR ================= */}
            <div className="flex flex-wrap gap-2 mb-6">
                {["all", "pending", "dismissed", "warning_sent", "prompt_removed"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${filter === f
                                ? "bg-black text-white"
                                : "bg-white hover:bg-slate-50"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* ================= REPORT CARDS ================= */}
            <div className="grid gap-5">

                {filtered.map(report => (
                    <div
                        key={report._id}
                        className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >

                        {/* TOP */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    {report.prompt?.title}
                                </h2>

                                <p className="text-xs text-slate-500 mt-1">
                                    Reported by: {report.reporter?.name}
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 border">
                                {report.reportStatus || "pending"}
                            </span>
                        </div>

                        {/* REASON */}
                        <p className="mt-3 text-sm text-slate-600">
                            {report.reason}
                        </p>

                        {/* ACTIONS */}
                        <div className="flex gap-2 mt-4">

                            <button
                                onClick={() => setModal({ open: true, type: "remove", id: report._id })}
                                className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white"
                            >
                                Remove Prompt
                            </button>

                            <button
                                onClick={() => setModal({ open: true, type: "warn", id: report._id })}
                                className="px-3 py-1 text-sm rounded-lg bg-yellow-500 text-white"
                            >
                                Warn Creator
                            </button>

                            <button
                                onClick={() => setModal({ open: true, type: "dismiss", id: report._id })}
                                className="px-3 py-1 text-sm rounded-lg bg-slate-200"
                            >
                                Dismiss
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {modal.open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">

                        <h2 className="text-lg font-bold text-slate-900">
                            Confirm Action
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            Are you sure you want to perform this action?
                        </p>

                        <div className="flex justify-end gap-2 mt-5">

                            <button
                                onClick={() => setModal({ open: false })}
                                className="px-4 py-2 text-sm rounded-lg border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAction}
                                disabled={loadingId === modal.id}
                                className="px-4 py-2 text-sm rounded-lg bg-black text-white"
                            >
                                {loadingId === modal.id ? "Processing..." : "Confirm"}
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}