export default function ProductListLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                    <div className="w-full">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="mb-3">
                                <div className="w-full h-14 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content skeleton */}
                <div className="lg:w-3/4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="bg-gray-100 rounded-lg p-4 h-80">
                                    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 