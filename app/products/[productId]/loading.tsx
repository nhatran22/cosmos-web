export default function ProductDetailLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Product Image Placeholder */}
                        <div className="p-8">
                            <div className="h-[500px] bg-gray-200 rounded-md"></div>
                        </div>

                        {/* Product Info Placeholder */}
                        <div className="p-8">
                            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded mb-6"></div>

                            {/* Product Specs Placeholder */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="h-20 bg-gray-200 rounded-md"></div>
                                <div className="h-20 bg-gray-200 rounded-md"></div>
                                <div className="h-20 bg-gray-200 rounded-md col-span-full"></div>
                            </div>

                            {/* Performance Characteristics Placeholder */}
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3].map(index => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Diagrams Placeholder */}
                    <div className="p-8 border-t border-gray-200">
                        <div className="h-8 bg-gray-200 rounded w-40 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(index => (
                                <div key={index} className="rounded-lg overflow-hidden">
                                    <div className="h-48 bg-gray-200 rounded-md"></div>
                                    <div className="p-4">
                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 