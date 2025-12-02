import Image from "next/image";
import { Header, Footer, CarCard, Car } from "@repo/ui-kit";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        tenantId: string;
        slug: string;
    }>;
    searchParams: Promise<{
        lang?: string;
    }>;
}

interface Translation {
    key: string;
    value: string;
}

interface CampaignDetail {
    id: string;
    tenantId: string;
    slug: string;
    lang: string;
    title: string;
    description: string;
    ctaLabel: string;
    heroImage: string;
    validUntil: string;
    cars: Car[];
}

async function getCampaign(tenantId: string, slug: string, lang: string): Promise<CampaignDetail | null> {
    try {
        // Fetch by tenantId and slug only to handle language fallbacks
        const res = await fetch(`http://localhost:3001/campaigns?tenantId=${tenantId}&slug=${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const campaigns: CampaignDetail[] = await res.json();

        if (campaigns.length === 0) return null;

        // Try to find exact language match
        const exactMatch = campaigns.find(c => c.lang === lang);
        if (exactMatch) return exactMatch;

        // Fallback to the first available campaign if exact language match is not found
        return campaigns[0] || null;
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return null;
    }
}

async function getTranslations(tenantId: string, lang: string): Promise<Record<string, string>> {
    try {
        const res = await fetch(`http://localhost:3001/translations?tenantId=${tenantId}&lang=${lang}`, { next: { revalidate: 60 } });
        if (!res.ok) return {};
        const data: Translation[] = await res.json();
        return data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    } catch (error) {
        console.error("Error fetching translations:", error);
        return {};
    }
}

export default async function CampaignPage({ params, searchParams }: PageProps) {
    const { tenantId, slug } = await params;
    const { lang: langParam } = await searchParams;
    const lang = langParam || 'pt-BR'; // Default to pt-BR if not specified

    const [campaign, translations] = await Promise.all([
        getCampaign(tenantId, slug, lang),
        getTranslations(tenantId, lang)
    ]);

    if (!campaign) {
        notFound();
    }

    const t = (key: string) => translations[key] || key;

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gray-900 h-96">
                <Image
                    src={campaign.heroImage}
                    alt={campaign.title}
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                            {campaign.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                            {campaign.description}
                        </p>
                        <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white">
                            <span className="mr-2">📅</span>
                            <span>{t('page.detail.validUntil')}: {new Date(campaign.validUntil).toLocaleDateString(lang)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {t('page.detail.cars.title')}
                    </h2>
                    <div className="flex gap-2">
                        {/* Language Switcher Mock */}
                        <a href={`?lang=pt-BR`} className={`px-3 py-1 rounded text-sm ${lang === 'pt-BR' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>PT</a>
                        <a href={`?lang=en-US`} className={`px-3 py-1 rounded text-sm ${lang === 'en-US' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</a>
                        <a href={`?lang=es-ES`} className={`px-3 py-1 rounded text-sm ${lang === 'es-ES' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>ES</a>
                    </div>
                </div>

                {campaign.cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaign.cars.map((car, index) => (
                            <CarCard
                                key={index}
                                car={{
                                    ...car,
                                    tenantId: campaign.tenantId,
                                    campaignSlug: campaign.slug
                                }}
                                priority={index < 6}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">{t('page.detail.cars.empty')}</p>
                    </div>
                )}
            </div>
        </>
    );
}
