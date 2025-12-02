"use client";

import { useState } from "react";
import { Button, Card } from "@repo/ui-kit";
import { CampaignModal } from "./CampaignModal";
import { useRouter } from "next/navigation";

interface Campaign {
    id: number;
    tenantId: string;
    slug: string;
    lang: string;
    title: string;
    description: string;
    validUntil: string;
    cars: any[];
}

interface CampaignsTableProps {
    initialCampaigns: Campaign[];
    tenantId: string;
}

export function CampaignsTable({
    initialCampaigns,
    tenantId,
}: CampaignsTableProps) {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>(
        undefined
    );

    const handleCreate = () => {
        setEditingCampaign(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta campanha?")) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            try {
                await fetch(`${apiUrl}/campaigns/${id}`, {
                    method: "DELETE",
                });
                setCampaigns(campaigns.filter((c) => c.id !== id));
                router.refresh();
            } catch (error) {
                console.error("Failed to delete campaign:", error);
            }
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            if (editingCampaign) {
                // Update
                const res = await fetch(
                    `${apiUrl}/campaigns/${editingCampaign.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...editingCampaign, ...data }),
                    }
                );
                const updatedCampaign = await res.json();
                setCampaigns(
                    campaigns.map((c) =>
                        c.id === updatedCampaign.id ? updatedCampaign : c
                    )
                );
            } else {
                // Create
                const res = await fetch(`${apiUrl}/campaigns`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, cars: [] }),
                });
                const newCampaign = await res.json();
                setCampaigns([...campaigns, newCampaign]);
            }
            setIsModalOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Failed to save campaign:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Campanhas</h1>
                    <p className="text-gray-500">Gerencie as campanhas ativas da loja.</p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    + Nova Campanha
                </Button>
            </div>

            <Card className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Título
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Slug
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Idioma
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Validade
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Veículos
                            </th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {campaign.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {campaign.slug}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {campaign.lang}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(campaign.validUntil).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {campaign.cars?.length || 0}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(campaign)}
                                        className="text-purple-600 hover:text-purple-900 mr-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(campaign.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <CampaignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingCampaign}
                tenantId={tenantId}
            />
        </div>
    );
}
