import { Button } from "@repo/ui-kit";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    tenantId: string;
    slug: string;
    carId: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

interface CarDetail {
  id: number;
  model: string;
  year: number;
  priceFrom: number;
  currency?: string;
  image: string;
  highlight?: boolean;
}

interface CampaignData {
  tenantId: string;
  slug: string;
  lang: string;
  title: string;
  cars: CarDetail[];
}

async function getCarDetails(
  tenantId: string,
  slug: string,
  carId: string,
  lang: string,
): Promise<{ car: CarDetail; campaignTitle: string } | null> {
  try {
    // Fetch campaign to find the car
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(
      `${apiUrl}/campaigns?tenantId=${tenantId}&slug=${slug}&lang=${lang}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;

    const campaigns: CampaignData[] = await res.json();
    const campaign = campaigns[0];

    if (!campaign) return null;

    const car = campaign.cars.find((c) => c.id === parseInt(carId));

    if (!car) return null;

    return { car, campaignTitle: campaign.title };
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
}

export default async function CarDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { tenantId, slug, carId } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam || "pt-BR";

  const data = await getCarDetails(tenantId, slug, carId, lang);

  if (!data) {
    notFound();
  }

  const { car, campaignTitle } = data;
  const currency = car.currency || "BRL";
  const formattedPrice = new Intl.NumberFormat(
    currency === "BRL" ? "pt-BR" : "en-US",
    {
      style: "currency",
      currency: currency,
    },
  ).format(car.priceFrom);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-purple-600">{campaignTitle}</h2>
        <div className="h-1 w-20 bg-purple-600 mt-2 rounded-full"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-96 lg:h-auto relative bg-gray-200">
            <Image
              src={car.image}
              alt={car.model}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-purple-600 font-bold mb-2">
              {car.year}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {car.model}
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Veículo certificado com garantia de procedência. Inspecionado em
              mais de 200 itens.
            </p>

            <div className="flex items-baseline mb-8">
              <span className="text-3xl font-bold text-gray-900 mr-2">
                {formattedPrice}
              </span>
              <span className="text-gray-500">Lance inicial</span>
            </div>

            <div className="flex flex-col gap-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-1">
                Dar Lance Agora
              </Button>
              <button className="w-full bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold py-4 rounded-xl text-lg transition-colors">
                Agendar Visita
              </button>
              <a
                href={`/${tenantId}/${slug}`}
                className="w-full text-center text-gray-500 hover:text-purple-600 font-medium py-2 transition-colors"
              >
                ← Voltar para a campanha
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
