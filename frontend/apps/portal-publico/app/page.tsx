import { Header, Footer, CampaignCard, Campaign } from "@repo/ui-kit";

async function getCampaigns(): Promise<Campaign[]> {
  try {
    const res = await fetch('http://localhost:3001/campaigns', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Portal Público" />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Campanhas Disponíveis
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Confira as últimas campanhas e participe.
          </p>
        </div>

        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma campanha encontrada no momento.</p>
            <p className="text-sm text-gray-400 mt-2">Verifique se o mock-server está rodando na porta 3002.</p>
          </div>
        )}
      </main>

      <Footer copyright="Pock Microservices" />
    </div>
  );
}
