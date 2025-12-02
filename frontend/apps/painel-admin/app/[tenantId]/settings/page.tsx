"use client";
import Image from "next/image";
import { useState, useEffect, use, useCallback } from "react";
import { Button, Input, Select, Card } from "@repo/ui-kit";

interface SettingsPageProps {
  params: Promise<{
    tenantId: string;
  }>;
}

interface Tenant {
  id: string;
  name: string;
  logoUrl?: string;
  headerTheme?: {
    layout?: string;
    styles?: {
      backgroundColor?: string;
      textColor?: string;
    };
    title?: {
      text?: string;
      color?: string;
    };
    logo?: {
      url?: string;
    };
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { tenantId } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  // Form state
  const [layout, setLayout] = useState("horizontal-left");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [titleText, setTitleText] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const fetchTenant = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
      const res = await fetch(`${apiUrl}/tenants?id=${tenantId}`);
      if (!res.ok) throw new Error("Failed to fetch tenant");
      const data = await res.json();
      if (data && data.length > 0) {
        const t = data[0];
        setTenant(t);

        // Initialize form
        if (t.headerTheme) {
          setLayout(t.headerTheme.layout || "horizontal-left");
          setBgColor(t.headerTheme.styles?.backgroundColor || "#ffffff");
          setTextColor(t.headerTheme.styles?.textColor || "#000000");
          setTitleText(t.headerTheme.title?.text || t.name);
          setLogoUrl(t.headerTheme.logo?.url || t.logoUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching tenant:", error);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchTenant();
  }, [fetchTenant]);

  const handleSave = async () => {
    if (!tenant) return;
    setSaving(true);

    const updatedTheme = {
      ...tenant.headerTheme,
      layout,
      logo: {
        ...tenant.headerTheme?.logo,
        url: logoUrl,
      },
      title: {
        ...tenant.headerTheme?.title,
        text: titleText,
        color: textColor,
      },
      styles: {
        ...tenant.headerTheme?.styles,
        backgroundColor: bgColor,
        textColor: textColor,
      },
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/tenants/${tenant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headerTheme: updatedTheme,
        }),
      });
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Erro ao salvar configurações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Configurações do Portal
        </h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-purple-700">
            Aparência do Cabeçalho
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <Select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                options={[
                  { value: "horizontal-left", label: "Horizontal (Esquerda)" },
                  {
                    value: "horizontal-center",
                    label: "Horizontal (Centralizado)",
                  },
                  { value: "vertical-stacked", label: "Vertical (Empilhado)" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cor de Fundo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cor do Texto
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-purple-700">
            Identidade Visual
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Portal
              </label>
              <Input
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder="Ex: ACME Motors"
              />
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

            {logoUrl && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-center">
                <Image
                  src={logoUrl}
                  alt="Preview Logo"
                  width={64}
                  height={64}
                  className="h-16 object-contain"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
