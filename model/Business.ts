import { IBusinessResponse } from '@/types/interface/response/Business';
import BusinessProfile from './BusinessProfile';

export default class Business {
    id: string;
    name: string;
    description?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
    rating?: number;
    reviews?: number;
    logo?: string;
    coverImage?: string;
    profile?: BusinessProfile;

    constructor(data: IBusinessResponse) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.rating = data.rating || 4.5;
        this.reviews = data.reviews || 36;
        this.logo = data.logo;
        this.coverImage = data.coverImage;

        if (data.profile) {
            this.profile = new BusinessProfile(data.profile);
        }
    }
}
