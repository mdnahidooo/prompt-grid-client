"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH USERS
    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // UPDATE ROLE OR PLAN
    const updateUser = async (id, payload) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            toast.success("User updated successfully");
            fetchUsers();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    // DELETE USER
    const deleteUser = async (id) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`, {
                method: "DELETE",
            });

            toast.success("User deleted");
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return <div className="p-6 text-black">Loading users...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Users</h1>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Profile</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Subscription</th>
                            <th className="p-3">Registered</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-t">

                                {/* Profile */}
                                <td className="p-3 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                        {user.image && (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <span>{user.name}</span>
                                </td>

                                {/* Email */}
                                <td className="p-3">{user.email}</td>

                                {/* Role */}
                                <td className="p-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            updateUser(user._id, { role: e.target.value })
                                        }
                                        className="border p-1 rounded"
                                    >
                                        <option value="user">user</option>
                                        <option value="creator">creator</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>

                                {/* Subscription */}
                                <td className="p-3">
                                    <select
                                        value={user.plan}
                                        onChange={(e) =>
                                            updateUser(user._id, { plan: e.target.value })
                                        }
                                        className="border p-1 rounded"
                                    >
                                        <option value="free">free</option>
                                        <option value="premium">premium</option>
                                    </select>
                                </td>

                                {/* Date */}
                                <td className="p-3">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                {/* Actions */}
                                <td className="p-3">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
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