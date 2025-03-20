import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Back to Products
            </Link>
        </div>
    );
} 