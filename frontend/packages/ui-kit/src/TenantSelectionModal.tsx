"use client";

import * as React from "react";

interface Tenant {
    id: string;
    name: string;
    logo?: string; // Optional logo
}

const TENANTS: Tenant[] = [
    { id: "acme_motors", name: "Acme Motors" },
    { id: "globex_auto", name: "Globex Auto" },
    { id: "andina_cars", name: "Andina Cars" },
];

interface TenantSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetPage: string;
}

export function TenantSelectionModal({ isOpen, onClose, targetPage }: TenantSelectionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Selecione uma Loja</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 grid gap-4">
                    <p className="text-gray-500 text-sm mb-2">
                        Para acessar <strong>{targetPage === 'leiloes' ? 'Leilões' : targetPage === 'vender' ? 'Vender' : 'Sobre'}</strong>, escolha uma das nossas unidades:
                    </p>

                    {TENANTS.map((tenant) => (
                        <a
                            key={tenant.id}
                            href={`/${tenant.id}/${targetPage}`}
                            className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
                        >
                            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <span className="font-bold text-lg">{tenant.name.charAt(0)}</span>
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-purple-700">{tenant.name}</span>
                            <svg className="w-5 h-5 ml-auto text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
