export interface Business {
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
    }
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
        website?: string;
    }
}