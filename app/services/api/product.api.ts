import { privateAPIHttpServices, IResponse } from '../http-service';

export interface IProduct {
    id: string;
    catalogue: string;
    categoryId: string;
    description: number;
    diagrams: Diagram[];
    image: string;
    name: string;
    performanceCharacteristics: PerformanceCharacteristic[];
    powerRange: string;
    suitableArea: string;
    workingWay: string;
    downloadPath?: any;
}

export interface Diagram {
    description: string;
    image: string;
    title: string;
}

export interface PerformanceCharacteristic {
    description: string;
    icon: string;
    title: string;
}

export interface ICreateProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

export interface IUpdateProductDto extends Partial<ICreateProductDto> { }

// ACT Series 10-200kVA: COSMOS-branded product photo (overrides the image stored in the backend)
const ACT_SERIES_ID = '131055bc-e0f3-471c-b379-9f2d92f1814d';
const ACT_SERIES_IMAGE = '/products/act-series-cosmos.png';
// ACS Series 1-3kVA: COSMOS-branded product photo + corrected name
const ACS_SERIES_ID = '9c8380b9-1b49-4277-baea-f3006d24b4f7';
const ACS_SERIES_IMAGE = '/products/acs-series-cosmos.png';
const ACS_SERIES_NAME = 'ACS Series 1 ~ 3kVA Online Tower UPS';
// ACS Series 6-20kVA: COSMOS-branded product photo
const ACS620_SERIES_ID = 'a4aee5e4-c8b4-4cbb-8fc7-57ef2d0e39b2';
const ACS620_SERIES_IMAGE = '/products/acs620-series-cosmos.png';

// Backend product photos that still carry the ACwatt badge -> COSMOS RF-branded copies in /public/products/cosmos.
// Keyed by the S3 object path after "/images/" (the backend returns signed URLs, so the query string is ignored).
const COSMOS_IMAGE_MAP: Record<string, string> = {
    'sh-series.png': '/products/cosmos/sh-series.png',
    'th-series.png': '/products/cosmos/th-series.png',
    'ha-series.png': '/products/cosmos/ha-series.png',
    'ma-series.png': '/products/cosmos/ma-series.png',
    'modular-data-center.png': '/products/cosmos/modular-data-center.png',
    'acm-series.png': '/products/cosmos/acm-series.png',
    'act-series.png': '/products/cosmos/act-series.png',
    'acm-series-480.png': '/products/cosmos/acm-series-480.png',
    'acm-series-208.png': '/products/cosmos/acm-series-208.png',
    'acs-tower.png': '/products/cosmos/acs-tower.png',
    'acs-rack.png': '/products/cosmos/acs-rack.png',
    'csh-series.png': '/products/cosmos/csh-series.png',
    'cst-series.png': '/products/cosmos/cst-series.png',
    'acm-series/acm-series-25.png': '/products/cosmos/acm-series-25.png',
    'acm-series/acm-series-15.png': '/products/cosmos/acm-series-15.png',
    'acm-series/acm-series-50.png': '/products/cosmos/acm-series-50.png',
    'acm-series/acm-series-25-rack.png': '/products/cosmos/acm-series-25-rack.png',
    'act-series/act-series-120.png': '/products/cosmos/act-series-120.png',
    'acm-series-208/acm-series-12.png': '/products/cosmos/acm-series-12.png',
    'acm-series-208/acm-series-20.png': '/products/cosmos/acm-series-20.png',
    'acs-tower-series/acs-tower-1.png': '/products/cosmos/acs-tower-1.png',
    'acs-tower-series/acs-tower-10.png': '/products/cosmos/acs-tower-10.png',
    'acs-tower-series/acs-tower-6.png': '/products/cosmos/acs-tower-6.png',
    'acs-rack-series/acs-rack-10.png': '/products/cosmos/acs-rack-10.png',
    'acs-rack-series/acs-rack-1.png': '/products/cosmos/acs-rack-1.png',
    'acs-rack-series/acs-rack-6.png': '/products/cosmos/acs-rack-6.png',
    'precision-cooling-outdoor-1.png': '/products/cosmos/precision-cooling-outdoor-1.png',
    'precision-cooling-outdoor-2.png': '/products/cosmos/precision-cooling-outdoor-2.png',
};

export const toCosmosImage = (url?: string): string | undefined => {
    if (!url) return url;
    const key = url.split('?')[0].split('/images/')[1];
    return (key && COSMOS_IMAGE_MAP[key]) || url;
};

const getDownloadPath = (productId: string) => {
    console.log(productId);
    if (productId === '9c8380b9-1b49-4277-baea-f3006d24b4f7') {
        return ['/nghiem-thu/ACS Cosmos 1-3 kVA -rebrand/Cosmos ACS 1-3KVA Tower UPS Product brochure.pdf',
            '/nghiem-thu/ACS Cosmos 1-3 kVA -rebrand/Cosmos ACS 1-3KVA Tower UPS Product user manual.pdf'];
    }
    if (productId === 'a4aee5e4-c8b4-4cbb-8fc7-57ef2d0e39b2') {
        return ['/nghiem-thu/ACS Cosmos 6-20kVA -rebrand/Cosmos ACS 6-20KVA Tower UPS product brochure.pdf',
            '/nghiem-thu/ACS Cosmos 6-20kVA -rebrand/Cosmos ACS 6-20KVA Tower UPS user manual.pdf'];
    }
    if (productId === '131055bc-e0f3-471c-b379-9f2d92f1814d') {
        return ['/nghiem-thu/ACT Cosmos 60kVA -rebrand/10-200kVA Tower UPS User Manual.pdf',
            '/nghiem-thu/ACT Cosmos 60kVA -rebrand/ACT_Series_Product_Brochure__Cosmos.pdf'];
    }
};

class ProductAPI {
    private static readonly BASE_URL = '/products';

    static async getProductsList(categoryId: string): Promise<any[]> {
        try {
            const response = await privateAPIHttpServices.httpGetRequest<any[]>(this.BASE_URL, {
                categoryId: categoryId
            });

            const updatedResponse = response.data.map((product) => ({
                ...product,
                name: product.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "ACT Series 10-200kVA Tower UPS" : product.id === ACS_SERIES_ID ? ACS_SERIES_NAME : product.name,
                image: product.id === ACT_SERIES_ID ? ACT_SERIES_IMAGE : product.id === ACS_SERIES_ID ? ACS_SERIES_IMAGE : product.id === ACS620_SERIES_ID ? ACS620_SERIES_IMAGE : toCosmosImage(product.image),
                downloadPath: getDownloadPath(product.id)
            }));


            return updatedResponse;
        } catch (error) {
            console.error('Error fetching products list:', error);
            throw error;
        }
    }

    static async getProductDetail(productId: string): Promise<IProduct> {
        try {
            const response = await privateAPIHttpServices.httpGetRequest<IProduct>(`${this.BASE_URL}/${productId}`);
            const updatedResponse = {
                ...response.data,
                name: response.data.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "ACT Series 10-200kVA Tower UPS" : response.data.id === ACS_SERIES_ID ? ACS_SERIES_NAME : response.data.name,
                powerRange: response.data.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "10-200kVA" : response.data.powerRange,
                image: response.data.id === ACT_SERIES_ID ? ACT_SERIES_IMAGE : response.data.id === ACS_SERIES_ID ? ACS_SERIES_IMAGE : response.data.id === ACS620_SERIES_ID ? ACS620_SERIES_IMAGE : toCosmosImage(response.data.image) as string,
                // ACT Series: hide the "Power Module Diagram" section (backend diagram belongs to another product)
                diagrams: response.data.id === ACT_SERIES_ID ? [] : (response.data.diagrams || []).map((d) => ({ ...d, image: toCosmosImage(d.image) as string })),
                downloadPath: getDownloadPath(response.data.id)
            };

            return updatedResponse;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            throw error;
        }
    }
}

export default ProductAPI; 