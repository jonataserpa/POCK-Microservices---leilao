import { CampaignCard, Campaign } from "@repo/ui-kit";

interface PageProps {
  params: Promise<{
    tenantId: string;
  }>;
}

async function getCampaigns(tenantId: string): Promise<Campaign[]> {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/campaigns?tenantId=${tenantId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export default async function AuctionsPage({ params }: PageProps) {
  const { tenantId } = await params;
  const campaigns = await getCampaigns(tenantId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Leilões em Andamento
        </h1>
        <p className="text-xl text-gray-500 mb-12">
          Confira todos os veículos disponíveis para lance agora.
        </p>

        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Nenhum leilão ativo no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
