"use client";

import * as React from "react";
import { useState } from "react";
import { TenantSelectionModal } from "./TenantSelectionModal";

export function Header({ title, tenantId, href }: { title: string; tenantId?: string; href?: string }) {
    const basePath = tenantId ? `/${tenantId}` : '';
    const link = href || basePath || '/';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetPage, setTargetPage] = useState('');

    const handleMenuClick = (e: React.MouseEvent, page: string) => {
        if (!tenantId) {
            e.preventDefault();
            setTargetPage(page);
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href={link} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a
                            href={tenantId ? `/${tenantId}/leiloes` : '#'}
                            onClick={(e) => handleMenuClick(e, 'leiloes')}
                            className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Leilões Ativos
                        </a>
                        <a
                            href={tenantId ? `/${tenantId}/vender` : '#'}
                            onClick={(e) => handleMenuClick(e, 'vender')}
                            className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Vender
                        </a>
                        <a
                            href={tenantId ? `/${tenantId}/sobre` : '#'}
                            onClick={(e) => handleMenuClick(e, 'sobre')}
                            className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Sobre
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-purple-600">
                            <span className="sr-only">Buscar</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-purple-200">
                            Entrar
                        </button>
                    </div>
                </div>
            </header>
            <TenantSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                targetPage={targetPage}
            />
        </>
    );
}
