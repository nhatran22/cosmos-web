export interface IProduct {
    id: string;
    name: string;
    description?: string;
    image?: string;
    catalogue?: string;
    categoryId?: string;
    powerRange?: string;
    suitableArea?: string;
    workingWay?: string;
    performanceCharacteristics?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
    diagrams?: Array<{
        title: string;
        description: string;
        image: string;
    }>;
}

export interface IDiagram {
    description: string;
    image: string;
    title: string;
}

export interface IPerformanceCharacteristic {
    description: string;
    icon: string;
    title: string;
}

export interface IProductListItem {
    id: string;
    name: string;
    catalogue?: string;
    image?: string;
    description?: string;
}

export interface ProductDetail {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    subcategory: string;
    specifications: ProductSpecification[];
    features: string[];
}

export interface ProductSpecification {
    name: string;
    value: string;
}

export interface ProductImage {
    url: string;
    alt: string;
}

export interface ProductFilter {
    category?: string;
    subcategory?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    features?: string[];
} 