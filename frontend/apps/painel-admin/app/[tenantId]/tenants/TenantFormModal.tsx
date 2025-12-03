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
    // General
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [lang, setLang] = useState("pt-BR");
    const [supportedLangs, setSupportedLangs] = useState("pt-BR, en-US, es-ES");
    const [country, setCountry] = useState("BR");
    const [logoUrl, setLogoUrl] = useState("");

    // Theme
    const [primaryColor, setPrimaryColor] = useState("#2563eb");
    const [secondaryColor, setSecondaryColor] = useState("#1d4ed8");

    // Header Theme
    const [headerLayout, setHeaderLayout] = useState("horizontal-left");
    const [headerBgColor, setHeaderBgColor] = useState("#ffffff");
    const [headerTextColor, setHeaderTextColor] = useState("#0a0a0a");
    const [headerTitleText, setHeaderTitleText] = useState("Portal Público");
    const [headerTitleColor, setHeaderTitleColor] = useState("#0a0a0a");
    const [headerLogoUrl, setHeaderLogoUrl] = useState("");
    const [headerLogoWidth, setHeaderLogoWidth] = useState(32);
    const [headerLogoHeight, setHeaderLogoHeight] = useState(32);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tenantToEdit) {
            setId(tenantToEdit.id);
            setName(tenantToEdit.name);
            setDomain(tenantToEdit.domain);
            setLang(tenantToEdit.defaultLang);
            setSupportedLangs(tenantToEdit.supportedLangs?.join(", ") || "pt-BR, en-US, es-ES");
            setCountry(tenantToEdit.country || "BR");
            setLogoUrl(tenantToEdit.logoUrl || "");

            setPrimaryColor(tenantToEdit.theme?.primary || "#2563eb");
            setSecondaryColor(tenantToEdit.theme?.secondary || "#1d4ed8");

            if (tenantToEdit.headerTheme) {
                setHeaderLayout(tenantToEdit.headerTheme.layout || "horizontal-left");
                setHeaderBgColor(tenantToEdit.headerTheme.styles?.backgroundColor || "#ffffff");
                setHeaderTextColor(tenantToEdit.headerTheme.styles?.textColor || "#0a0a0a");
                setHeaderTitleText(tenantToEdit.headerTheme.title?.text || "Portal Público");
                setHeaderTitleColor(tenantToEdit.headerTheme.title?.color || "#0a0a0a");
                setHeaderLogoUrl(tenantToEdit.headerTheme.logo?.url || "");
                setHeaderLogoWidth(tenantToEdit.headerTheme.logo?.width || 32);
                setHeaderLogoHeight(tenantToEdit.headerTheme.logo?.height || 32);
            }
        } else {
            // Defaults for new tenant
            setId("");
            setName("");
            setDomain("");
            setLang("pt-BR");
            setSupportedLangs("pt-BR, en-US, es-ES");
            setCountry("BR");
            setLogoUrl("");

            setPrimaryColor("#2563eb");
            setSecondaryColor("#1d4ed8");

            setHeaderLayout("horizontal-left");
            setHeaderBgColor("#ffffff");
            setHeaderTextColor("#0a0a0a");
            setHeaderTitleText("Portal Público");
            setHeaderTitleColor("#0a0a0a");
            setHeaderLogoUrl("");
            setHeaderLogoWidth(32);
            setHeaderLogoHeight(32);
        }
    }, [tenantToEdit, isOpen]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const tenantData: Tenant = {
                id,
                name,
                domain,
                defaultLang: lang,
                supportedLangs: supportedLangs.split(",").map(s => s.trim()).filter(Boolean),
                country,
                logoUrl,
                theme: {
                    primary: primaryColor,
                    secondary: secondaryColor,
                },
                headerTheme: {
                    layout: headerLayout,
                    logo: {
                        url: headerLogoUrl || logoUrl || "https://via.placeholder.com/200x80",
                        position: "left",
                        width: Number(headerLogoWidth),
                        height: Number(headerLogoHeight),
                        alt: "Logo Portal",
                    },
                    title: {
                        text: headerTitleText,
                        position: "left",
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: headerTitleColor,
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
                        backgroundColor: headerBgColor,
                        textColor: headerTextColor,
                        padding: "1rem 2rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                },
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
            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                {/* General Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Geral</h3>
                    {!tenantToEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID (Slug)</label>
                            <Input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="ex: acme_motors"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ex: ACME Motors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Domínio</label>
                        <Input
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="ex: acme.localhost"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Idioma Padrão</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                            <Input
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="ex: BR"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Idiomas Suportados</label>
                        <Input
                            value={supportedLangs}
                            onChange={(e) => setSupportedLangs(e.target.value)}
                            placeholder="pt-BR, en-US, es-ES"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL do Logo Principal</label>
                        <Input
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                </section>

                {/* Theme Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Cores do Tema</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primária</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secundária</label>
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
                </section>

                {/* Header Configuration Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Configuração do Cabeçalho</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
                        <Select
                            value={headerLayout}
                            onChange={(e) => setHeaderLayout(e.target.value)}
                            options={[
                                { value: "horizontal-left", label: "Horizontal (Esquerda)" },
                                { value: "horizontal-center", label: "Horizontal (Centralizado)" },
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor de Fundo</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={headerBgColor}
                                    onChange={(e) => setHeaderBgColor(e.target.value)}
                                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                                />
                                <Input
                                    value={headerBgColor}
                                    onChange={(e) => setHeaderBgColor(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Texto</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={headerTextColor}
                                    onChange={(e) => setHeaderTextColor(e.target.value)}
                                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                                />
                                <Input
                                    value={headerTextColor}
                                    onChange={(e) => setHeaderTextColor(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Header</label>
                            <Input
                                value={headerTitleText}
                                onChange={(e) => setHeaderTitleText(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Título</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={headerTitleColor}
                                    onChange={(e) => setHeaderTitleColor(e.target.value)}
                                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                                />
                                <Input
                                    value={headerTitleColor}
                                    onChange={(e) => setHeaderTitleColor(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL do Logo (Header)</label>
                        <Input
                            value={headerLogoUrl}
                            onChange={(e) => setHeaderLogoUrl(e.target.value)}
                            placeholder="Deixe vazio para usar o logo principal"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Largura do Logo (px)</label>
                            <Input
                                type="number"
                                value={headerLogoWidth}
                                onChange={(e) => setHeaderLogoWidth(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Altura do Logo (px)</label>
                            <Input
                                type="number"
                                value={headerLogoHeight}
                                onChange={(e) => setHeaderLogoHeight(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
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
