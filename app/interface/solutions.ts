export interface SolutionSection {
    id: string;
    heading: string;
    text: string;
}

export interface RelatedProduct {
    id: string;
    title: string;
    slug: string;
    description?: string;
    features: string[];
    image: string;
    name?: string;
    href?: string;
}

export interface Solution {
    id: string;
    title?: string;
    name?: string;
    description: string;
    textContent?: string;
    image: string;
    representiveImage?: string;
    category?: string;
    href?: string;
    relatedProducts?: RelatedProduct[];
}

export interface Tab {
    id: string;
    label: string;
    category: string;
}

export interface Advantage {
    id: string;
    icon: React.ReactNode;
    title?: string;
    description: string;
}
