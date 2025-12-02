export * from "./CarCard";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps) {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...other}>
            {children}
        </button>
    );
}

export function Card({ title, children, href }: { title: string; children: React.ReactNode; href: string }) {
    return (
        <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {children}
            </p>
        </a>
    );
}

export function Header({ title, tenantId, href }: { title: string; tenantId?: string; href?: string }) {
    const basePath = tenantId ? `/${tenantId}` : '';
    const link = href || basePath || '/';

    return (
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
                    <a href={`${basePath}/leiloes`} className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Leilões Ativos</a>
                    <a href={`${basePath}/vender`} className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Vender</a>
                    <a href={`${basePath}/sobre`} className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Sobre</a>
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
    );
}

export function Footer({ copyright }: { copyright: string }) {
    return (
        <footer className="bg-gray-900 text-white mt-auto py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Pock Microservices</h3>
                        <p className="text-gray-400 text-sm">Plataforma premium de leilões automotivos.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-400">Plataforma</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Como funciona</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-400">Suporte</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-purple-400">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} {copyright}. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export interface Campaign {
    id: string;
    tenantId: string;
    slug: string;
    name: string;
    title?: string;
    description: string;
    status?: string;
    validUntil?: string;
    heroImage?: string;
    ctaLabel?: string;
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
    const status = campaign.status || 'active';
    const image = campaign.heroImage || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop';
    const title = campaign.title || campaign.name;
    const endDate = campaign.validUntil ? new Date(campaign.validUntil).toLocaleDateString() : 'N/A';
    const detailUrl = `/${campaign.tenantId}/${campaign.slug}`;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                        Destaque
                    </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                    <span>{endDate}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
                    {campaign.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-medium">Lance Atual</span>
                        <span className="text-lg font-bold text-green-600">R$ 45.000</span>
                    </div>
                    <a href={detailUrl} className="bg-gray-900 hover:bg-purple-600 text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                        {campaign.ctaLabel || 'Ver Detalhes'}
                    </a>
                </div>
            </div>
        </div>
    );
}
