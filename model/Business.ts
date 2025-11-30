import { Business } from '@/types/interface/Business';

export class BusinessModel implements Business {
    id: string;
    name: string;
    description?: string;
    category?: string;
    address?: string;
    phone?: string;
    email?: string;
    images?: string[];
    rating?: number;
    reviewCount?: number;
    createdAt?: any;
    logo?: string;
    location?: {
        latitude?: number;
        longitude?: number;
    };
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
        website?: string;
    };

    constructor(data: Business) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.images = data.images;
        this.rating = data.rating;
        this.reviewCount = data.reviewCount;
        this.createdAt = data.createdAt;
        this.logo = data.logo;
        this.location = data.location;
        this.socialLinks = data.socialLinks;
    }

    /**
     * Create a BusinessModel from a plain object
     */
    static fromJson(json: any): BusinessModel {
        return new BusinessModel({
            id: json.id,
            name: json.name,
            description: json.description,
            category: json.category,
            address: json.address,
            phone: json.phone,
            email: json.email,
            images: json.images,
            rating: json.rating,
            reviewCount: json.reviewCount,
            createdAt: json.createdAt,
            logo: json.logo,
            location: json.location,
            socialLinks: json.socialLinks,
        });
    }

    /**
     * Convert to plain object
     */
    toJson(): Business {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            address: this.address,
            phone: this.phone,
            email: this.email,
            images: this.images,
            rating: this.rating,
            reviewCount: this.reviewCount,
            createdAt: this.createdAt,
            logo: this.logo,
            location: this.location,
            socialLinks: this.socialLinks,
        };
    }
}
