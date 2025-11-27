export interface Business {
    id: string;
    name: string;
    description?: string;
    category?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    images?: string[];
    rating?: number;
    reviewCount?: number;
    createdAt?: any;
    logo?: string;
}