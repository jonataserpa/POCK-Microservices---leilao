"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "@repo/ui-kit";

interface Car {
    id?: number;
    model: string;
    year: number;
    priceFrom: number;
    image: string;
    highlight: boolean;
}

interface Campaign {
    id: number;
    title: string;
}

interface CarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (car: Car, campaignId: number) => void;
    initialData?: Car;
    campaigns: Campaign[];
    initialCampaignId?: number;
}

export function CarModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    campaigns,
    initialCampaignId,
}: CarModalProps) {
    const [formData, setFormData] = useState<Car>({
        model: "",
        year: new Date().getFullYear(),
        priceFrom: 0,
        image: "",
        highlight: false,
    });
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | "">(
        initialCampaignId || ""
    );

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            if (initialCampaignId) setSelectedCampaignId(initialCampaignId);
        } else {
            setFormData({
                model: "",
                year: new Date().getFullYear(),
                priceFrom: 0,
                image: "",
                highlight: false,
            });
            setSelectedCampaignId(initialCampaignId || "");
        }
    }, [initialData, initialCampaignId, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCampaignId) {
            alert("Selecione uma campanha");
            return;
        }
        onSubmit(formData, Number(selectedCampaignId));
    };

    const campaignOptions = campaigns.map((c) => ({
        value: c.id.toString(),
        label: c.title,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar Veículo" : "Novo Veículo"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                    label="Campanha"
                    value={selectedCampaignId.toString()}
                    onChange={(e) => setSelectedCampaignId(Number(e.target.value))}
                    options={[{ value: "", label: "Selecione..." }, ...campaignOptions]}
                    required
                    disabled={!!initialData} // Disable changing campaign on edit for simplicity
                />
                <Input
                    label="Modelo"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Ano"
                        type="number"
                        value={formData.year}
                        onChange={(e) =>
                            setFormData({ ...formData, year: Number(e.target.value) })
                        }
                        required
                    />
                    <Input
                        label="Preço (A partir de)"
                        type="number"
                        value={formData.priceFrom}
                        onChange={(e) =>
                            setFormData({ ...formData, priceFrom: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <Input
                    label="URL da Imagem"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <div className="flex items-center">
                    <input
                        id="highlight"
                        type="checkbox"
                        checked={formData.highlight}
                        onChange={(e) =>
                            setFormData({ ...formData, highlight: e.target.checked })
                        }
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="highlight"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Destaque na Landing Page
                    </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-purple-600 text-white">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
