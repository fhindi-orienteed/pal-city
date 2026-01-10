
export interface IPlacesResponse {
    id: string;
    title: string;
    summary?: string;
    content?: string;
    coverImage?: string;
    images?: string[];
    category?: string;
    location?: string;
    openingHours?: string;
    status?: string;
    createdAt?: any;
}
