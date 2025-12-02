import { Card } from "@repo/ui-kit";

interface PageProps {
    params: Promise<{
        tenantId: string;
    }>;
}

export default async function DashboardPage({ params }: PageProps) {
    const { tenantId } = await params;

    return (
        <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: Impressões (Blue) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg shadow-blue-200 transition-transform hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                            +12.5%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">847K</h3>
                        <p className="text-blue-100 text-sm font-medium mt-1">
                            Impressões Totais
                        </p>
                    </div>
                </div>

                {/* Card 2: Cliques (Purple) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg shadow-purple-200 transition-transform hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                            +8.3%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">42.3K</h3>
                        <p className="text-purple-100 text-sm font-medium mt-1">
                            Cliques Únicos
                        </p>
                    </div>
                </div>

                {/* Card 3: Conversão (Pink) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white shadow-lg shadow-pink-200 transition-transform hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                            +15.7%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">5.8%</h3>
                        <p className="text-pink-100 text-sm font-medium mt-1">
                            Taxa de Conversão
                        </p>
                    </div>
                </div>

                {/* Card 4: Receita (Orange) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-200 transition-transform hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                            +22.1%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">R$128K</h3>
                        <p className="text-orange-100 text-sm font-medium mt-1">
                            Receita Gerada
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                Desempenho de Campanhas
                            </h3>
                            <p className="text-sm text-gray-400">Últimos 30 dias</p>
                        </div>
                        <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
                            <button className="px-3 py-1 text-xs font-medium bg-purple-500 text-white rounded-md shadow-sm">
                                Diário
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">
                                Semanal
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">
                                Mensal
                            </button>
                        </div>
                    </div>
                    {/* Placeholder for Line Chart */}
                    <div className="h-64 w-full flex items-end justify-between space-x-2 px-4">
                        {/* Mocking a line chart with CSS/SVG */}
                        <svg
                            className="w-full h-full overflow-visible"
                            viewBox="0 0 100 50"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 40 Q 10 35, 20 38 T 40 20 T 60 25 T 80 15 T 100 10"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                d="M0 40 Q 10 35, 20 38 T 40 20 T 60 25 T 80 15 T 100 10 V 50 H 0 Z"
                                fill="url(#gradient)"
                                opacity="0.1"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line
                                x1="0"
                                y1="10"
                                x2="100"
                                y2="10"
                                stroke="#f3f4f6"
                                strokeWidth="0.5"
                            />
                            <line
                                x1="0"
                                y1="20"
                                x2="100"
                                y2="20"
                                stroke="#f3f4f6"
                                strokeWidth="0.5"
                            />
                            <line
                                x1="0"
                                y1="30"
                                x2="100"
                                y2="30"
                                stroke="#f3f4f6"
                                strokeWidth="0.5"
                            />
                            <line
                                x1="0"
                                y1="40"
                                x2="100"
                                y2="40"
                                stroke="#f3f4f6"
                                strokeWidth="0.5"
                            />
                        </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-4 px-4">
                        <span>01 Nov</span>
                        <span>05 Nov</span>
                        <span>10 Nov</span>
                        <span>15 Nov</span>
                        <span>20 Nov</span>
                        <span>25 Nov</span>
                        <span>30 Nov</span>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">
                        Distribuição de Tráfego
                    </h3>
                    <div className="relative h-64 flex items-center justify-center">
                        {/* Mock Donut Chart */}
                        <svg viewBox="0 0 36 36" className="w-48 h-48 transform -rotate-90">
                            {/* Ring 1: Google Ads (35%) - Blue */}
                            <path
                                className="text-blue-500"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="35, 100"
                            />
                            {/* Ring 2: Facebook (28%) - Purple */}
                            <path
                                className="text-purple-500"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="28, 100"
                                strokeDashoffset="-35"
                            />
                            {/* Ring 3: Instagram (20%) - Pink */}
                            <path
                                className="text-pink-500"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="20, 100"
                                strokeDashoffset="-63"
                            />
                            {/* Ring 4: TikTok (12%) - Orange */}
                            <path
                                className="text-orange-500"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="12, 100"
                                strokeDashoffset="-83"
                            />
                            {/* Ring 5: Others (5%) - Gray */}
                            <path
                                className="text-gray-300"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray="5, 100"
                                strokeDashoffset="-95"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold text-gray-800">100%</span>
                            <span className="text-xs text-gray-400">Total</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                <span className="text-gray-600">Google Ads</span>
                            </div>
                            <span className="font-bold text-gray-800">35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                                <span className="text-gray-600">Facebook</span>
                            </div>
                            <span className="font-bold text-gray-800">28%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
                                <span className="text-gray-600">Instagram</span>
                            </div>
                            <span className="font-bold text-gray-800">20%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                                <span className="text-gray-600">TikTok</span>
                            </div>
                            <span className="font-bold text-gray-800">12%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
