import { Header, Footer } from "@repo/ui-kit";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string;
  }>;
}

async function getTenant(tenantId: string) {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/tenants?id=${tenantId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const tenants = await res.json();
    return tenants[0] || null;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const { tenantId } = await params;
  const tenant = await getTenant(tenantId);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title={tenant.name}
        tenantId={tenantId}
        theme={tenant.headerTheme}
      />
      <main className="flex-grow w-full">{children}</main>
      <Footer copyright={tenant.name} />
    </div>
  );
}
