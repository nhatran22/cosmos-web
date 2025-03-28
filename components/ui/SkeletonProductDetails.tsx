export function SkeletonProductDetails() {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Tiêu đề */}
            <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>

            {/* Giá */}
            <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>

            {/* Mô tả */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>

            {/* Danh mục */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/5"></div>
            </div>

            {/* Số lượng */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-1/6"></div>
                <div className="h-10 bg-gray-200 rounded-md w-1/4"></div>
            </div>

            {/* Nút */}
            <div className="flex space-x-4 pt-4">
                <div className="h-12 bg-gray-200 rounded-md flex-1"></div>
                <div className="h-12 bg-gray-200 rounded-md flex-1"></div>
            </div>
        </div>
    );
} 