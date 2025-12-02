"use client";

import { Sidebar, TopBar } from "@repo/ui-kit";
import { use } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ tenantId: string }>;
}) {
    // Unwrap params using React.use()
    const { tenantId } = use(params);
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth cookie
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar tenantId={tenantId} onLogout={handleLogout} />
            <TopBar tenantId={tenantId} />
            <main className="ml-64 pt-28 px-12 pb-12">{children}</main>
        </div>
    );
}
