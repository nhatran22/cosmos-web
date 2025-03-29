import { AdditionalHeader } from '@/app/interface/navigation';
import { privateAPIHttpServices, IResponse } from '../http-service';

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
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

export default CategoryAPI; 