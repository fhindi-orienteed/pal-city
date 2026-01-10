import { ILocation, IOpeningHours } from "../Common";

export interface IBusinessResponse {
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
    profile?: IBusinessProfileResponse;
}

export interface IBusinessProfileResponse {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
    images?: string[];
    location?: ILocation;
    openingHours?: IOpeningHours;
}
