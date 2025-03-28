import { ProductSpecification } from '@/app/interface/product';

interface CardProductSpecificationProps {
    specifications: ProductSpecification[];
}

export function CardProductSpecification({ specifications }: CardProductSpecificationProps) {
    if (!specifications || specifications.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500">Không có thông số kỹ thuật</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                    {specifications.map((spec, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                                {spec.name}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                {spec.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 