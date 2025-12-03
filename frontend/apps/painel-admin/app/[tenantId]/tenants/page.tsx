"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Card } from "@repo/ui-kit";
import TenantFormModal from "./TenantFormModal";

interface Tenant {
    id: string;
    name: string;
    domain: string;
    defaultLang: string;
    supportedLangs: string[];
    theme: {
        primary: string;
        secondary: string;
    };
    logoUrl?: string;
    country?: string;
    headerTheme?: {
        layout: string;
        logo: {
            url: string;
            position: string;
            width: number;
            height: number;
            alt: string;
        };
        title: {
            text: string;
            position: string;
            fontSize: string;
            fontWeight: string;
            color: string;
        };
        menu: {
            items: Array<{ label: string; href: string; target: string }>;
            position: string;
        };
        info: {
            showCountry: boolean;
            showLanguages: boolean;
            position: string;
            separator: string;
        };
        styles: {
            backgroundColor: string;
            textColor: string;
            padding: string;
            boxShadow: string;
        };
    };
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

    const fetchTenants = useCallback(async () => {
        setLoading(true);
        try {
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "https://api.jonataserpa.com.br";
            const res = await fetch(`${apiUrl}/tenants`);
            if (!res.ok) throw new Error("Failed to fetch tenants");
            const data = await res.json();
            setTenants(data);
        } catch (error) {
            console.error("Error fetching tenants:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTenants();
    }, [fetchTenants]);

    const handleSave = async (tenant: Tenant) => {
        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://api.jonataserpa.com.br";

        const method = editingTenant ? "PUT" : "POST";
        const url = editingTenant
            ? `${apiUrl}/tenants/${tenant.id}`
            : `${apiUrl}/tenants`;

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tenant),
        });

        if (!res.ok) throw new Error("Failed to save tenant");

        await fetchTenants();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este tenant?")) return;

        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://api.jonataserpa.com.br";

        try {
            await fetch(`${apiUrl}/tenants/${id}`, {
                method: "DELETE",
            });
            await fetchTenants();
        } catch (error) {
            console.error("Error deleting tenant:", error);
            alert("Erro ao excluir tenant.");
        }
    };

    const openNewModal = () => {
        setEditingTenant(null);
        setIsModalOpen(true);
    };

    const openEditModal = (tenant: Tenant) => {
        setEditingTenant(tenant);
        setIsModalOpen(true);
    };

    if (loading) return <div className="p-8">Carregando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Tenants</h1>
                <Button onClick={openNewModal}>Novo Tenant</Button>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Nome</th>
                                <th className="px-6 py-3">Domínio</th>
                                <th className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {tenant.id}
                                    </td>
                                    <td className="px-6 py-4">{tenant.name}</td>
                                    <td className="px-6 py-4">{tenant.domain}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openEditModal(tenant)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tenant.id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tenants.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Nenhum tenant encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <TenantFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                tenantToEdit={editingTenant}
            />
        </div>
    );
}
