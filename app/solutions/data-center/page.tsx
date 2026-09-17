import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/data/solution-data';

export default function DataCenterPage() {
    const solution = getSolutionBySlug('data-center');

    if (!solution) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 w-full flex flex-col justify-center">
                <h1 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-green-600">
                    {solution.title}
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {solution.description}
                </p>
            </div>
            {solution.image && (
                <div className="w-full relative h-[screen] md:h-[800px] bg-white">
                    <Image
                        src={solution.image}
                        alt={solution.title || ''}
                        className="object-contain"
                        fill
                    />
                </div>
            )}
        </div>
    );
}
