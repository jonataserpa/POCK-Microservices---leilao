import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{
        tenantId: string;
    }>;
}

export default async function TenantHomePage({ params }: PageProps) {
    const { tenantId } = await params;
    redirect(`/${tenantId}/leiloes`);
}
