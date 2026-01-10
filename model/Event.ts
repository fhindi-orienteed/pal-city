import { IEventResponse } from "@/types/interface/response";

export default class Event {
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

    constructor(data: IEventResponse) {
        this.id = data.id;
        this.title = data.title;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.location = data.location;
        this.price = data.price;
        this.description = data.description;
        this.organizer = data.organizer;
        this.coverImage = data.coverImage;
        this.images = data.images;
        this.category = data.category;
        this.createdAt = data.createdAt;
    }
}
