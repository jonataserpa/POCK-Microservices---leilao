"use client";

import { useState } from "react";
import { Button, Card } from "@repo/ui-kit";
import { CarModal } from "./CarModal";
import { useRouter } from "next/navigation";

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

interface CarsTableProps {
    initialCampaigns: Campaign[];
    tenantId: string;
}

export function CarsTable({ initialCampaigns, tenantId }: CarsTableProps) {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | undefined>(undefined);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | undefined>(
        undefined
    );

    // Flatten cars for display, keeping track of their campaign
    const allCars = campaigns.flatMap((campaign) =>
        (campaign.cars || []).map((car) => ({
            ...car,
            campaignId: campaign.id,
            campaignTitle: campaign.title,
        }))
    );

    const handleCreate = () => {
        setEditingCar(undefined);
        setSelectedCampaignId(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (car: Car, campaignId: number) => {
        setEditingCar(car);
        setSelectedCampaignId(campaignId);
        setIsModalOpen(true);
    };

    const handleDelete = async (carId: number, campaignId: number) => {
        if (confirm("Tem certeza que deseja excluir este veículo?")) {
            try {
                const campaign = campaigns.find((c) => c.id === campaignId);
                if (!campaign) return;

                const updatedCars = campaign.cars.filter((c) => c.id !== carId);
                const updatedCampaign = { ...campaign, cars: updatedCars };
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

                await fetch(`${apiUrl}/campaigns/${campaignId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedCampaign),
                });

                setCampaigns(
                    campaigns.map((c) => (c.id === campaignId ? updatedCampaign : c))
                );
                router.refresh();
            } catch (error) {
                console.error("Failed to delete car:", error);
            }
        }
    };

    const handleSubmit = async (carData: any, campaignId: number) => {
        try {
            const campaign = campaigns.find((c) => c.id === campaignId);
            if (!campaign) return;

            let updatedCars;
            if (editingCar) {
                // Update existing car
                updatedCars = campaign.cars.map((c) =>
                    c.id === editingCar.id ? { ...carData, id: editingCar.id } : c
                );
            } else {
                // Create new car
                // Generate a pseudo-random ID (in real app backend handles this)
                const newId = Math.floor(Math.random() * 100000);
                updatedCars = [...(campaign.cars || []), { ...carData, id: newId }];
            }

            const updatedCampaign = { ...campaign, cars: updatedCars };
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            await fetch(`${apiUrl}/campaigns/${campaignId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCampaign),
            });

            setCampaigns(
                campaigns.map((c) => (c.id === campaignId ? updatedCampaign : c))
            );
            setIsModalOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Failed to save car:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Veículos</h1>
                    <p className="text-gray-500">
                        Gerencie os veículos de todas as campanhas.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    + Novo Veículo
                </Button>
            </div>

            <Card className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Modelo
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Ano
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Preço
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Campanha
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Destaque
                            </th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {allCars.map((car) => (
                            <tr key={`${car.campaignId}-${car.id}`}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {car.model}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {car.year}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    R$ {car.priceFrom.toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {car.campaignTitle}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {car.highlight ? (
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            Sim
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            Não
                                        </span>
                                    )}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(car, car.campaignId)}
                                        className="text-purple-600 hover:text-purple-900 mr-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(car.id, car.campaignId)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {allCars.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-4 text-center text-sm text-gray-500"
                                >
                                    Nenhum veículo encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <CarModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingCar}
                campaigns={campaigns}
                initialCampaignId={selectedCampaignId}
            />
        </div>
    );
}
