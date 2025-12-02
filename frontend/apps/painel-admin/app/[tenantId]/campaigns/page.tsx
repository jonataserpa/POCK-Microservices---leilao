import { CampaignsTable } from "./CampaignsTable";

interface Campaign {
  id: number;
  tenantId: string;
  slug: string;
  lang: string;
  title: string;
  description: string;
  validUntil: string;
  cars: unknown[];
}

async function getCampaigns(tenantId: string): Promise<Campaign[]> {
  const apiUrl = process.env.API_URL || "http://localhost:3001";
  const res = await fetch(`${apiUrl}/campaigns?tenantId=${tenantId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return res.json();
}

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;
  const campaigns = await getCampaigns(tenantId);

  return <CampaignsTable initialCampaigns={campaigns} tenantId={tenantId} />;
}
