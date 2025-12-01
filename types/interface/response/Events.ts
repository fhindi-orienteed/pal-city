
export interface IEventResponse {
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    images?: string[];
    startDate?: string;
    endDate?: string;
    location?: string;
    price?: string;
    organizer?: string;
    category?: string;
    createdAt?: any;
}
