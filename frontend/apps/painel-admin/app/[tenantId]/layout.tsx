"use client";

import { Sidebar, TopBar } from "@repo/ui-kit";
import { use } from "react";

export default function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ tenantId: string }>;
}) {
    // Unwrap params using React.use()
    const { tenantId } = use(params);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar tenantId={tenantId} />
            <TopBar tenantId={tenantId} />
            <main className="ml-64 pt-28 px-12 pb-12">{children}</main>
        </div>
    );
}
