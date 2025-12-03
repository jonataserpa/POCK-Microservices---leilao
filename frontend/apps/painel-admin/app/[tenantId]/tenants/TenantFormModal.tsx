import { useState, useEffect } from "react";
import { Modal, Input, Button, Select } from "@repo/ui-kit";
import { z } from "zod";

const tenantSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  domain: z.string().min(1, "Domínio é obrigatório"),
  defaultLang: z.string().min(1, "Idioma padrão é obrigatório"),
  supportedLangs: z.string().min(1, "Idiomas suportados são obrigatórios"),
  country: z.string().min(1, "País é obrigatório"),
  logoUrl: z
    .string()
    .url("URL do logo inválida")
    .min(1, "URL do logo é obrigatória"),
  theme: z.object({
    primary: z.string().min(1, "Cor primária é obrigatória"),
    secondary: z.string().min(1, "Cor secundária é obrigatória"),
  }),
  headerTheme: z.object({
    layout: z.string().min(1, "Layout é obrigatório"),
    logo: z.object({
      url: z
        .string()
        .url("URL do logo do header inválida")
        .min(1, "URL do logo do header é obrigatória"),
      width: z.number().min(1, "Largura do logo deve ser maior que 0"),
      height: z.number().min(1, "Altura do logo deve ser maior que 0"),
    }),
    title: z.object({
      text: z.string().min(1, "Título do header é obrigatório"),
      color: z.string().min(1, "Cor do título é obrigatória"),
    }),
    styles: z.object({
      backgroundColor: z
        .string()
        .min(1, "Cor de fundo do header é obrigatória"),
      textColor: z.string().min(1, "Cor do texto do header é obrigatória"),
    }),
  }),
});

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tenantToEdit) {
      setId(tenantToEdit.id);
      setName(tenantToEdit.name);
      setDomain(tenantToEdit.domain);
      setLang(tenantToEdit.defaultLang);
      setSupportedLangs(
        tenantToEdit.supportedLangs?.join(", ") || "pt-BR, en-US, es-ES",
      );
      setCountry(tenantToEdit.country || "BR");
      setLogoUrl(tenantToEdit.logoUrl || "");

      setPrimaryColor(tenantToEdit.theme?.primary || "#2563eb");
      setSecondaryColor(tenantToEdit.theme?.secondary || "#1d4ed8");

      if (tenantToEdit.headerTheme) {
        setHeaderLayout(tenantToEdit.headerTheme.layout || "horizontal-left");
        setHeaderBgColor(
          tenantToEdit.headerTheme.styles?.backgroundColor || "#ffffff",
        );
        setHeaderTextColor(
          tenantToEdit.headerTheme.styles?.textColor || "#0a0a0a",
        );
        setHeaderTitleText(
          tenantToEdit.headerTheme.title?.text || "Portal Público",
        );
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
    setErrors({});
  }, [tenantToEdit, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    const formData = {
      id,
      name,
      domain,
      defaultLang: lang,
      supportedLangs,
      country,
      logoUrl,
      theme: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
      headerTheme: {
        layout: headerLayout,
        logo: {
          url: headerLogoUrl || logoUrl,
          width: Number(headerLogoWidth),
          height: Number(headerLogoHeight),
        },
        title: {
          text: headerTitleText,
          color: headerTitleColor,
        },
        styles: {
          backgroundColor: headerBgColor,
          textColor: headerTextColor,
        },
      },
    };

    try {
      tenantSchema.parse(formData);

      const tenantData: Tenant = {
        id,
        name,
        domain,
        defaultLang: lang,
        supportedLangs: supportedLangs
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        country,
        logoUrl,
        theme: {
          primary: primaryColor,
          secondary: secondaryColor,
        },
        headerTheme: {
          layout: headerLayout,
          logo: {
            url: headerLogoUrl || logoUrl,
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
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path.join(".")] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error saving tenant:", error);
        alert("Erro ao salvar tenant.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tenantToEdit ? "Editar Tenant" : "Novo Tenant"}
      className="sm:max-w-4xl"
    >
      <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
        {/* General Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Geral
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!tenantToEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID (Slug) *
                </label>
                <Input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ex: acme_motors"
                />
                {errors.id && (
                  <p className="text-red-500 text-xs mt-1">{errors.id}</p>
                )}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: ACME Motors"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domínio *
              </label>
              <Input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="ex: acme.localhost"
              />
              {errors.domain && (
                <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                País *
              </label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="ex: BR"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idioma Padrão *
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
              {errors.defaultLang && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.defaultLang}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idiomas Suportados *
              </label>
              <Input
                value={supportedLangs}
                onChange={(e) => setSupportedLangs(e.target.value)}
                placeholder="pt-BR, en-US, es-ES"
              />
              {errors.supportedLangs && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.supportedLangs}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL do Logo Principal *
              </label>
              <Input
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://..."
              />
              {errors.logoUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.logoUrl}</p>
              )}
            </div>
          </div>
        </section>

        {/* Theme Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Cores do Tema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primária *
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
              {errors["theme.primary"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["theme.primary"]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secundária *
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
              {errors["theme.secondary"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["theme.secondary"]}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Header Configuration Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Configuração do Cabeçalho
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout *
              </label>
              <Select
                value={headerLayout}
                onChange={(e) => setHeaderLayout(e.target.value)}
                options={[
                  { value: "horizontal-left", label: "Horizontal (Esquerda)" },
                  {
                    value: "horizontal-center",
                    label: "Horizontal (Centralizado)",
                  },
                ]}
              />
              {errors["headerTheme.layout"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.layout"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Header *
              </label>
              <Input
                value={headerTitleText}
                onChange={(e) => setHeaderTitleText(e.target.value)}
              />
              {errors["headerTheme.title.text"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.title.text"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor de Fundo *
              </label>
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
              {errors["headerTheme.styles.backgroundColor"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.styles.backgroundColor"]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor do Texto *
              </label>
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
              {errors["headerTheme.styles.textColor"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.styles.textColor"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor do Título *
              </label>
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
              {errors["headerTheme.title.color"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.title.color"]}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL do Logo (Header) *
            </label>
            <Input
              value={headerLogoUrl}
              onChange={(e) => setHeaderLogoUrl(e.target.value)}
              placeholder="Deixe vazio para usar o logo principal"
            />
            {errors["headerTheme.logo.url"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors["headerTheme.logo.url"]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Largura do Logo (px) *
              </label>
              <Input
                type="number"
                value={headerLogoWidth}
                onChange={(e) => setHeaderLogoWidth(Number(e.target.value))}
              />
              {errors["headerTheme.logo.width"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.logo.width"]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura do Logo (px) *
              </label>
              <Input
                type="number"
                value={headerLogoHeight}
                onChange={(e) => setHeaderLogoHeight(Number(e.target.value))}
              />
              {errors["headerTheme.logo.height"] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors["headerTheme.logo.height"]}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t sticky bottom-0 bg-white">
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
