import { Header, Footer, CampaignCard, Campaign } from "@repo/ui-kit";

async function getCampaigns(): Promise<Campaign[]> {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/campaigns`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

async function getTenants(): Promise<{ id: string; name: string }[]> {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/tenants`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tenants");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = params.lang || "pt-BR";

  const [campaigns, tenants] = await Promise.all([
    getCampaigns(),
    getTenants(),
  ]);

  const filteredCampaigns = campaigns.filter((c) => c.lang === lang);

  const campaignsWithTenant = filteredCampaigns.map((campaign) => ({
    ...campaign,
    tenantName: tenants.find((t) => t.id === campaign.tenantId)?.name,
  }));

  const headerTheme = {
    layout: "horizontal-left" as const,
    info: {
      showLanguages: true,
      position: "right" as const,
    },
    styles: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      textColor: "#111827",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Portal Público" theme={headerTheme} lang={lang} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Campanhas Disponíveis
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Confira as últimas campanhas e participe.
          </p>
        </div>

        {campaignsWithTenant.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaignsWithTenant.map((campaign, index) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                priority={index < 6}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhuma campanha encontrada para o idioma selecionado ({lang}).
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Tente mudar o idioma no topo da página.
            </p>
          </div>
        )}
      </main>

      <Footer copyright="Pock Microservices" />
    </div>
  );
}
