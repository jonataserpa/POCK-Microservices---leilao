import { useState, useEffect } from "react";
import { Modal, Input, Button, Select } from "@repo/ui-kit";

interface Tenant {
    id: string;
    name: string;
    domain: string;
    defaultLang: string;
    theme?: {
        primary: string;
        secondary: string;
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tenantToEdit) {
            setId(tenantToEdit.id);
            setName(tenantToEdit.name);
            setDomain(tenantToEdit.domain);
            setLang(tenantToEdit.defaultLang);
            setPrimaryColor(tenantToEdit.theme?.primary || "#2563eb");
            setSecondaryColor(tenantToEdit.theme?.secondary || "#1d4ed8");
        } else {
            setId("");
            setName("");
            setDomain("");
            setLang("pt-BR");
            setPrimaryColor("#2563eb");
            setSecondaryColor("#1d4ed8");
        }
    }, [tenantToEdit, isOpen]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSave({
                id,
                name,
                domain,
                defaultLang: lang,
                theme: {
                    primary: primaryColor,
                    secondary: secondaryColor,
                },
            });
            onClose();
        } catch (error) {
            console.error("Error saving tenant:", error);
            alert("Erro ao salvar tenant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={tenantToEdit ? "Editar Tenant" : "Novo Tenant"}>
            <div className="space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cor Primária</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cor Secundária</label>
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
