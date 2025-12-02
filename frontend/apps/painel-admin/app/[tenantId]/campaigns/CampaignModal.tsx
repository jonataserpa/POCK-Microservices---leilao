"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "@repo/ui-kit";

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
  }, [initialData, tenantId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
        <Input
          label="Slug (URL)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
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
        <Input
          label="Descrição"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Input
          label="Validade"
          type="date"
          value={formData.validUntil}
          onChange={(e) =>
            setFormData({ ...formData, validUntil: e.target.value })
          }
          required
        />
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
