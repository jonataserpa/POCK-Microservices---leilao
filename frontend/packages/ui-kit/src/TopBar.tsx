interface TopBarProps {
    tenantId: string;
}

export function TopBar({ tenantId }: TopBarProps) {
    return (
        <header className="h-20 bg-white flex items-center justify-between px-12 fixed top-0 right-0 left-64 z-10 border-b border-gray-100">
            <div>
                <h2 className="text-2xl font-bold text-purple-700">Visão Geral</h2>
                <p className="text-sm text-gray-400 mt-1">
                    Bem-vindo de volta! Aqui está o resumo de hoje
                </p>
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                </div>
                <button className="relative p-2.5 text-white bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors shadow-md shadow-purple-200">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-purple-500"></span>
                </button>
            </div>
        </header>
    );
}
