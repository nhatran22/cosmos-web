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
            '/nghiem-thu/ACT Cosmos 60kVA -rebrand/ACT_Series_Product_Brochure__Cosmos 2708.pdf'];
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
                name: product.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "ACT Series 10-200kVA Rack UPS" : product.name,
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
                name: response.data.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "ACT Series 10-200kVA Rack UPS" : response.data.name,
                powerRange: response.data.id === "131055bc-e0f3-471c-b379-9f2d92f1814d" ? "10-200kVA" : response.data.powerRange,
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