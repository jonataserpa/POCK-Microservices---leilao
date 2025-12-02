"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    tenantId: string;
    onLogout?: () => void;
}

export function Sidebar({ tenantId, onLogout }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { label: "Dashboard", href: `/${tenantId}/dashboard`, icon: "📈" },
        { label: "Campanhas", href: `/${tenantId}/campaigns`, icon: "📢" },
        { label: "Analytics", href: `/${tenantId}/analytics`, icon: "📊" },
        { label: "Audiência", href: `/${tenantId}/audience`, icon: "👥" },
        { label: "Orçamento", href: `/${tenantId}/budget`, icon: "💳" },
        { label: "Veículos", href: `/${tenantId}/cars`, icon: "🚗" },
        { label: "Configurações", href: `/${tenantId}/settings`, icon: "⚙️" },
    ];

    return (
        <div className="h-screen w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col fixed left-0 top-0 shadow-xl z-20">
            <div className="p-8 flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-wide capitalize">
                    {tenantId.replace(/_/g, " ")}
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/10"
                                : "text-purple-100 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className="mr-3 text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                {item.icon}
                            </span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mx-4 mb-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-md border-2 border-white/20">
                        LS
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-bold truncate">Lucas Silva</p>
                        <p className="text-xs text-purple-200 truncate">Gerente de Mkt</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors border border-white/5"
                >
                    <span className="mr-2">↪</span> Sair
                </button>
            </div>
        </div>
    );
}
