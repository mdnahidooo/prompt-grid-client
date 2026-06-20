"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "@/lib/actions/admin/users";

export default function AdminUsersTable({ users = [] }) {
    const handleUpdate = async (id, payload) => {
        try {
            await updateUser(id, payload);
            toast.success("Updated successfully");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            toast.success("User deleted");
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left">Profile</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Subscription</th>
                            <th className="p-4 text-left">Registered</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {/* PROFILE */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                                    N/A
                                                </div>
                                            )}
                                        </div>

                                        <span className="font-medium text-gray-800">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>

                                {/* EMAIL */}
                                <td className="p-4 text-gray-600">
                                    {user.email}
                                </td>

                                {/* ROLE */}
                                <td className="p-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleUpdate(user._id, {
                                                role: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-2 py-1 text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="creator">Creator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                {/* SUBSCRIPTION */}
                                <td className="p-4">
                                    <select
                                        value={user.plan}
                                        onChange={(e) =>
                                            handleUpdate(user._id, {
                                                plan: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-2 py-1 text-sm"
                                    >
                                        <option value="free">Free</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </td>

                                {/* DATE */}
                                <td className="p-4 text-gray-500">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                {/* ACTIONS */}
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}