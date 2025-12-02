interface PageProps {
  params: Promise<{
    tenantId: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="prose prose-lg mx-auto text-gray-500">
        <h1 className="text-gray-900 font-bold text-4xl mb-8 text-center">
          Revolucionando o mercado automotivo
        </h1>
        <p>
          Somos uma plataforma dedicada a conectar compradores e vendedores de
          forma transparente, segura e eficiente. Utilizamos tecnologia de ponta
          para garantir a melhor experiência em leilões automotivos.
        </p>
        <p>
          Nossa missão é simplificar a compra e venda de veículos, oferecendo
          ferramentas poderosas para concessionárias e consumidores finais.
        </p>
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">+10k</h3>
            <p>Carros Vendidos</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
            <p>Clientes Satisfeitos</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p>Suporte Dedicado</p>
          </div>
        </div>
      </div>
    </div>
  );
}
