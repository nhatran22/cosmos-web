import { AdditionalHeader } from '@/app/interface/navigation';
import { privateAPIHttpServices, IResponse } from '../http-service';
import { toCosmosImage } from './product.api';

export interface ICategory {
    id: string;
    name: string;
    description: string;
    parentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateCategoryDto {
    name: string;
    description: string;
    parentId?: string;
}

export interface IUpdateCategoryDto extends Partial<ICreateCategoryDto> { }

class CategoryAPI {
    private static readonly BASE_URL = '/categories';

    // Lấy danh sách danh mục
    static async getCategories(): Promise<AdditionalHeader[]> {
        try {
            const response = await privateAPIHttpServices.httpGetRequest<AdditionalHeader[]>(this.BASE_URL);
            // Swap ACwatt-branded subcategory photos for the COSMOS RF versions
            return response.data.map((cat) => ({
                ...cat,
                subCategory: (cat.subCategory || []).map((sub: any) => ({ ...sub, image: toCosmosImage(sub.image) })),
            }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

export default CategoryAPI; 