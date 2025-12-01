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
    cover?: string;
    profile?: BusinessProfile;

    constructor(data: IBusinessResponse) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.rating = data.rating;
        this.reviews = data.reviews;
        this.logo = data.logo;
        this.cover = data.cover;

        if (data.profile) {
            this.profile = new BusinessProfile(data.profile);
        }
    }
}
