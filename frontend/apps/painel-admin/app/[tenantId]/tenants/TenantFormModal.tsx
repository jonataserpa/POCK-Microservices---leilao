import { useState, useEffect } from "react";
import { Modal, Input, Button, Select } from "@repo/ui-kit";

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

interface TenantFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tenant: Tenant) => Promise<void>;
    tenantToEdit?: Tenant | null;
}

export default function TenantFormModal({
    isOpen,
    onClose,
    onSave,
    tenantToEdit,
}: TenantFormModalProps) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [lang, setLang] = useState("pt-BR");
    const [primaryColor, setPrimaryColor] = useState("#2563eb");
    const [secondaryColor, setSecondaryColor] = useState("#1d4ed8");
    const [logoUrl, setLogoUrl] = useState("");
    const [country, setCountry] = useState("BR");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tenantToEdit) {
            setId(tenantToEdit.id);
            setName(tenantToEdit.name);
            setDomain(tenantToEdit.domain);
            setLang(tenantToEdit.defaultLang);
            setPrimaryColor(tenantToEdit.theme?.primary || "#2563eb");
            setSecondaryColor(tenantToEdit.theme?.secondary || "#1d4ed8");
            setLogoUrl(tenantToEdit.logoUrl || "");
            setCountry(tenantToEdit.country || "BR");
        } else {
            setId("");
            setName("");
            setDomain("");
            setLang("pt-BR");
            setPrimaryColor("#2563eb");
            setSecondaryColor("#1d4ed8");
            setLogoUrl("");
            setCountry("BR");
        }
    }, [tenantToEdit, isOpen]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Default structure for new tenants
            const defaultHeaderTheme = {
                layout: "horizontal-left",
                logo: {
                    url: logoUrl || "https://via.placeholder.com/200x80",
                    position: "left",
                    width: 32,
                    height: 32,
                    alt: "Logo Portal",
                },
                title: {
                    text: "Portal Público",
                    position: "left",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#0a0a0a",
                },
                menu: {
                    items: [
                        { label: "Leilões Ativos", href: "leiloes", target: "_self" },
                        { label: "Vender", href: "vender", target: "_self" },
                        { label: "Sobre", href: "sobre", target: "_self" },
                    ],
                    position: "center",
                },
                info: {
                    showCountry: true,
                    showLanguages: true,
                    position: "right",
                    separator: " • ",
                },
                styles: {
                    backgroundColor: "#ffffff",
                    textColor: "#0a0a0a",
                    padding: "1rem 2rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                },
            };

            const tenantData: Tenant = {
                id,
                name,
                domain,
                defaultLang: lang,
                supportedLangs: ["pt-BR", "en-US", "es-ES"],
                theme: {
                    primary: primaryColor,
                    secondary: secondaryColor,
                },
                logoUrl,
                country,
                // If editing, preserve existing headerTheme, otherwise use default
                headerTheme: tenantToEdit?.headerTheme || defaultHeaderTheme,
            };

            await onSave(tenantData);
            onClose();
        } catch (error) {
            console.error("Error saving tenant:", error);
            alert("Erro ao salvar tenant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={tenantToEdit ? "Editar Tenant" : "Novo Tenant"}
        >
            <div className="space-y-4">
                {!tenantToEdit && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID (Slug)
                        </label>
                        <Input
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="ex: acme_motors"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                    </label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ex: ACME Motors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Domínio
                    </label>
                    <Input
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="ex: acme.localhost"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Idioma Padrão
                        </label>
                        <Select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            options={[
                                { value: "pt-BR", label: "Português (Brasil)" },
                                { value: "en-US", label: "English (US)" },
                                { value: "es-ES", label: "Español" },
                            ]}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            País
                        </label>
                        <Input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="ex: BR"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL do Logo
                    </label>
                    <Input
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://..."
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cor Primária
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                            />
                            <Input
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cor Secundária
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                                className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                            />
                            <Input
                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
