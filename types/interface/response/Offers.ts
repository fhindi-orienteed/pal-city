
export interface IOfferResponse {
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    images?: string[];
    startDate?: string;
    endDate?: string;
    category?: string;
    status?: string;
    createdAt?: any;
}
