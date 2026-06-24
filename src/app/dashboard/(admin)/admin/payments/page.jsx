import { getAllPayments } from "@/lib/actions/payment";

export default async function AdminPaymentsPage() {

    const res = await getAllPayments();

    const payments = res?.payments || [];

    const totalRevenue = payments
        .filter((item) => item.status === "paid")
        .reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

    const successfulPayments = payments.filter(
        (item) => item.status === "paid"
    ).length;

    const failedPayments = payments.filter(
        (item) => item.status !== "paid"
    ).length;

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-black text-black">
                    All Payments
                </h1>

                <p className="text-sm text-gray-500">
                    View all payment history
                </p>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white border rounded-2xl p-5">
                    <p className="text-xs text-gray-500">
                        Total Revenue
                    </p>

                    <h2 className="text-3xl font-black">
                        ${totalRevenue}
                    </h2>
                </div>

                <div className="bg-white border rounded-2xl p-5">
                    <p className="text-xs text-gray-500">
                        Successful Payments
                    </p>

                    <h2 className="text-3xl font-black text-green-600">
                        {successfulPayments}
                    </h2>
                </div>

                <div className="bg-white border rounded-2xl p-5">
                    <p className="text-xs text-gray-500">
                        Failed Payments
                    </p>

                    <h2 className="text-3xl font-black text-red-500">
                        {failedPayments}
                    </h2>
                </div>

            </div>

            {/* Table */}

            <div className="bg-white border rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    User ID
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    Session ID
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-black uppercase">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {payments.map((payment) => (

                                <tr
                                    key={payment._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-5 py-4">
                                        {payment.userEmail}
                                    </td>

                                    <td className="px-5 py-4 text-xs">
                                        {payment.userId}
                                    </td>

                                    <td className="px-5 py-4 font-bold">
                                        ${payment.amount}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${payment.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {payment.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4 text-xs max-w-62.5 truncate">
                                        {payment.sessionId}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {new Date(
                                            payment.createdAt
                                        ).toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {payments.length === 0 && (
                        <div className="p-10 text-center text-gray-500">
                            No payment found
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}