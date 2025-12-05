"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "@repo/ui-kit";
import { z } from "zod";

const campaignSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  lang: z.string().min(1, "Idioma é obrigatório"),
  description: z.string().optional(),
  validUntil: z.string().min(1, "Data de validade é obrigatória"),
});

interface Campaign {
  id?: number;
  tenantId: string;
  slug: string;
  lang: string;
  title: string;
  description: string;
  validUntil: string;
}

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Campaign) => void;
  initialData?: Campaign;
  tenantId: string;
}

export function CampaignModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  tenantId,
}: CampaignModalProps) {
  const [formData, setFormData] = useState<Campaign>({
    tenantId,
    slug: "",
    lang: "pt-BR",
    title: "",
    description: "",
    validUntil: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        tenantId,
        slug: "",
        lang: "pt-BR",
        title: "",
        description: "",
        validUntil: "",
      });
    }
    setErrors({});
  }, [initialData, tenantId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      campaignSchema.parse(formData);
      onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          newErrors[err.path.join(".")] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Campanha" : "Nova Campanha"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
        <Input
          label="Slug (URL)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        {errors.slug && (
          <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
        )}
        <Select
          label="Idioma"
          value={formData.lang}
          onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
          options={[
            { value: "pt-BR", label: "Português (Brasil)" },
            { value: "en-US", label: "Inglês (EUA)" },
            { value: "es-ES", label: "Espanhol" },
          ]}
        />
        {errors.lang && (
          <p className="text-red-500 text-xs mt-1">{errors.lang}</p>
        )}
        <Input
          label="Descrição"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
        <Input
          label="Validade"
          type="date"
          value={formData.validUntil}
          onChange={(e) =>
            setFormData({ ...formData, validUntil: e.target.value })
          }
          required
        />
        {errors.validUntil && (
          <p className="text-red-500 text-xs mt-1">{errors.validUntil}</p>
        )}
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
