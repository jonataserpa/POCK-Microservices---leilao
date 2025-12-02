import * as React from "react";

export interface Car {
    id?: number;
    model: string;
    year: number;
    priceFrom: number;
    currency?: string;
    image: string;
    highlight?: boolean;
    tenantId?: string;
    campaignSlug?: string;
}

export function CarCard({ car }: { car: Car }) {
    const currency = car.currency || 'BRL';
    const formattedPrice = new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency: currency,
    }).format(car.priceFrom);

    const detailUrl = car.tenantId && car.campaignSlug && car.id
        ? `/${car.tenantId}/${car.campaignSlug}/car/${car.id}`
        : '#';

    return (
        <div className={`group bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${car.highlight ? 'border-purple-500 ring-1 ring-purple-500 shadow-lg' : 'border-gray-200 shadow-sm'}`}>
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {car.highlight && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            OFERTA
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {car.model}
                    </h3>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {car.year}
                    </span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">A partir de</p>
                        <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
                    </div>
                    <a href={detailUrl} className="bg-gray-900 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
