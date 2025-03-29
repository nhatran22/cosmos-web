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

class ProductAPI {
    private static readonly BASE_URL = '/products';

    static async getProductsList(categoryId: string): Promise<any[]> {
        try {
            const response = await privateAPIHttpServices.httpGetRequest<any[]>(this.BASE_URL, {
                categoryId: categoryId
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products list:', error);
            throw error;
        }
    }

    static async getProductDetail(productId: string): Promise<IProduct> {
        try {
            const response = await privateAPIHttpServices.httpGetRequest<IProduct>(`${this.BASE_URL}/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            throw error;
        }
    }
}

export default ProductAPI; 