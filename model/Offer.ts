import { IOfferResponse } from "@/types/interface/response";

export default class Offer {
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

    constructor(data: IOfferResponse) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.coverImage = data.coverImage;
        this.images = data.images;
        this.category = data.category;
        this.status = data.status;
        this.createdAt = data.createdAt;
    }
}
