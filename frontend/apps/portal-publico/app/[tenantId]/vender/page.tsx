import { Header, Footer, Button } from "@repo/ui-kit";

interface PageProps {
    params: Promise<{
        tenantId: string;
    }>;
}

export default async function SellPage({ params }: PageProps) {
    const { tenantId } = await params;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="max-w-3xl mx-auto text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Venda seu carro com a melhor avaliação</h1>
                <p className="text-xl text-gray-500 mb-10">Processo rápido, seguro e 100% digital. Receba uma oferta em minutos.</p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-left">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Placa do Veículo</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="ABC-1234" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="seu@email.com" />
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg text-lg">
                            Avaliar Agora
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
