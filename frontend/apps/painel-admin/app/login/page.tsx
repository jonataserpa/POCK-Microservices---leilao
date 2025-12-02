"use client";

import { useState, useEffect } from "react";
import { Button, Card, Input, Select } from "@repo/ui-kit";
import { useRouter } from "next/navigation";

interface Tenant {
    id: string;
    name: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [formData, setFormData] = useState({
        tenantId: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchTenants = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            try {
                const response = await fetch(`${apiUrl}/tenants`);
                const data = await response.json();
                setTenants(data);
            } catch (error) {
                console.error("Failed to fetch tenants:", error);
            }
        };

        fetchTenants();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For now, just redirect to the dashboard of the tenant
        // In a real app, we would validate credentials against an API
        if (formData.tenantId) {
            // Set a mock auth cookie
            document.cookie = "auth_token=true; path=/; max-age=86400; SameSite=Lax";
            router.push(`/${formData.tenantId}/dashboard`);
        }

        setIsLoading(false);
    };

    const tenantOptions = tenants.map((tenant) => ({
        value: tenant.id,
        label: tenant.name,
    }));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">P</span>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Painel Administrativo
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Entre com suas credenciais e selecione a loja
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-white">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Select
                            label="Loja (Tenant)"
                            options={tenantOptions}
                            required
                            value={formData.tenantId}
                            onChange={(e) =>
                                setFormData({ ...formData, tenantId: e.target.value })
                            }
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <Input
                            label="Senha"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                disabled={isLoading}
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
