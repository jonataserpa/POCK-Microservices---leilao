import { CarsTable } from "./CarsTable";

interface Car {
    id: number;
    model: string;
    year: number;
    priceFrom: number;
    image: string;
    highlight: boolean;
}

interface Campaign {
    id: number;
    title: string;
    cars: Car[];
}

async function getCampaigns(tenantId: string): Promise<Campaign[]> {
    const res = await fetch(
        `http://localhost:3001/campaigns?tenantId=${tenantId}`,
        { cache: "no-store" }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch campaigns");
    }
    return res.json();
}

export default async function CarsPage({
    params,
}: {
    params: Promise<{ tenantId: string }>;
}) {
    const { tenantId } = await params;
    const campaigns = await getCampaigns(tenantId);

    return <CarsTable initialCampaigns={campaigns} tenantId={tenantId} />;
}
