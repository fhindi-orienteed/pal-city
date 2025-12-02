import { IPlacesResponse } from "@/types/interface/response";

export default class Place {
    id: string;
    title: string;
    summary?: string;
    content?: string;
    coverImage?: string;
    images?: string[];
    category?: string;
    location?: string;
    status?: string;
    openingHours?: string;
    createdAt?: any;

    constructor(data: IPlacesResponse) {
        this.id = data.id;
        this.title = data.title;
        this.summary = data.summary;
        this.content = data.content;
        this.coverImage = data.coverImage;
        this.images = data.images;
        this.category = data.category;
        this.location = data.location;
        this.openingHours = data.openingHours;
        this.status = data.status;
        this.createdAt = data.createdAt;
    }
}
