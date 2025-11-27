
export interface Event {
    id: string;
    name: string;
    date: string;
    time?: string;
    location: string;
    price?: string;
    description?: string;
    organizer?: string;
    image: string;
    images?: string[];
    isFavorite?: boolean;
    category?: string;
    createdAt?: any;
}
