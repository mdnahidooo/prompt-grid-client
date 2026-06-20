import AdminUsersTable from "./AdminUsersTable";
import { getAdminUsers } from "@/lib/api/admin/users";

export default async function AdminUsersPage() {
    const users = await getAdminUsers();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#3F4255]">
                    All Users
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage user roles and subscriptions
                </p>
            </div>

            <AdminUsersTable users={users} />
        </div>
    );
}