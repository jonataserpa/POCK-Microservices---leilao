export * from "./CarCard";
import * as React from "react";

export * from "./Button";

export * from "./card";

export * from "./Header";
export * from "./Input";
export * from "./Select";
export * from "./Sidebar";
export * from "./TopBar";
export * from "./Modal";

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
