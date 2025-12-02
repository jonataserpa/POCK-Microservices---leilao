"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { TenantSelectionModal } from "./TenantSelectionModal";

export interface HeaderTheme {
    layout: 'horizontal-left' | 'horizontal-center' | 'vertical-stacked';
    logo?: {
        url: string;
        position: 'left' | 'center' | 'right' | 'top';
        width?: number;
        height?: number;
        alt?: string;
    };
    title?: {
        text: string;
        position: 'left' | 'center' | 'right' | 'below-logo';
        fontSize?: string;
        fontWeight?: string;
        color?: string;
    };
    menu?: {
        items: Array<{ label: string; href: string; target?: string }>;
        position: 'left' | 'center' | 'right';
    };
    info?: {
        showCountry?: boolean;
        showLanguages?: boolean;
        position: 'left' | 'center' | 'right';
        separator?: string;
    };
    styles?: {
        backgroundColor?: string;
        textColor?: string;
        padding?: string;
        boxShadow?: string;
        borderRadius?: string;
    };
}

export interface HeaderProps {
    title?: string;
    tenantId?: string;
    href?: string;
    theme?: HeaderTheme;
    lang?: string;
}

export function Header({ title, tenantId, href, theme, lang = 'pt-BR' }: HeaderProps) {
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

    // Default styles if no theme is provided
    const styles = {
        backgroundColor: theme?.styles?.backgroundColor || 'rgba(255, 255, 255, 0.95)',
        color: theme?.styles?.textColor || '#111827',
        padding: theme?.styles?.padding || '0 1.5rem',
        boxShadow: theme?.styles?.boxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        borderRadius: theme?.styles?.borderRadius || '0',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
    };

    const layout = theme?.layout || 'horizontal-left';

    const Logo = () => (
        <div className="flex items-center gap-2 relative">
            {theme?.logo?.url ? (
                <div style={{ position: 'relative', width: 'auto', height: theme.logo.height || 28 }}>
                    <Image
                        src={theme.logo.url}
                        alt={theme.logo.alt || title || 'Logo'}
                        height={theme.logo.height || 28}
                        width={theme.logo.width || 100} // Default width if not provided
                        style={{
                            objectFit: 'contain',
                            height: '100%',
                            width: 'auto'
                        }}
                        priority
                    />
                </div>
            ) : (
                <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                </div>
            )}
        </div>
    );

    const Title = () => (
        <h1
            style={{
                fontSize: theme?.title?.fontSize || '1.125rem', // text-lg
                fontWeight: theme?.title?.fontWeight || '600', // font-semibold
                color: theme?.title?.color || styles.color,
                letterSpacing: '-0.025em' // tight tracking
            }}
        >
            {theme?.title?.text || title || 'Portal'}
        </h1>
    );

    const Menu = () => (
        <nav className={`hidden md:flex space-x-6 ${theme?.menu?.position === 'center' ? 'mx-auto' : ''}`}>
            {(theme?.menu?.items || [
                { label: 'Leilões Ativos', href: 'leiloes' },
                { label: 'Vender', href: 'vender' },
                { label: 'Sobre', href: 'sobre' }
            ]).map((item) => (
                <a
                    key={item.label}
                    href={tenantId ? (item.href.startsWith('/') ? item.href : `/${tenantId}/${item.href}`) : '#'}
                    onClick={(e) => handleMenuClick(e, item.href)}
                    className="px-2 py-1 text-sm font-medium transition-all hover:opacity-70"
                    style={{ color: styles.color }}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );

    const LanguageSelector = () => {
        if (!theme?.info?.showLanguages) return null;

        const languages = [
            { code: 'pt-BR', label: 'PT' },
            { code: 'en-US', label: 'EN' },
            { code: 'es-ES', label: 'ES' }
        ];

        const currentLang = lang;

        const handleLangChange = (langCode: string) => {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', langCode);
            window.location.href = url.toString();
        };

        return (
            <div className="flex items-center gap-2 mr-4 border-r border-gray-300 pr-4">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className={`text-xs font-bold transition-colors ${currentLang === lang.code ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
        );
    };

    const Actions = () => (
        <div className="flex items-center gap-3">
            <LanguageSelector />
            <button style={{ color: styles.color }} className="hover:opacity-70 transition-opacity p-1">
                <span className="sr-only">Buscar</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold transition-all border border-white/10 hover:shadow-sm" style={{ color: styles.color }}>
                Entrar
            </button>
        </div>
    );

    return (
        <>
            <header
                className="sticky top-0 z-50 transition-all duration-300"
                style={styles}
            >
                <div className={`max-w-7xl mx-auto flex ${layout === 'vertical-stacked' ? 'flex-col justify-center py-3 space-y-3' : 'items-center justify-between h-14'} ${layout === 'horizontal-center' ? 'justify-center relative' : ''}`}>

                    {/* Layout: Horizontal Left (Default) */}
                    {layout === 'horizontal-left' && (
                        <>
                            <a href={link} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                <Logo />
                                <Title />
                            </a>
                            <Menu />
                            <Actions />
                        </>
                    )}

                    {/* Layout: Horizontal Center */}
                    {layout === 'horizontal-center' && (
                        <>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <Menu />
                            </div>
                            <a href={link} className="flex flex-col items-center hover:opacity-80 transition-opacity">
                                <Logo />
                                <Title />
                            </a>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <Actions />
                            </div>
                        </>
                    )}

                    {/* Layout: Vertical Stacked */}
                    {layout === 'vertical-stacked' && (
                        <>
                            <div className="flex flex-col items-center space-y-1">
                                <Logo />
                                <Title />
                            </div>
                            <div className="w-full border-t border-current opacity-10 my-1"></div>
                            <div className="flex items-center justify-between w-full px-2">
                                <Menu />
                                <Actions />
                            </div>
                        </>
                    )}
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
