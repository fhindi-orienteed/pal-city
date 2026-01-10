import { INewsResponse } from "@/types/interface/response";

export default class News {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    author: string;
    coverImage: string;
    images: string[];
    source?: string;
    tags?: string[];
    publishedAt?: string;

    constructor(data: INewsResponse) {
        this.id = data.id;
        this.title = data.title;
        this.summary = data.summary;
        this.content = data.content;
        this.category = data.category;
        this.author = data.author;
        this.coverImage = data.coverImage;
        this.images = data.images;
        this.source = data.source;
        this.tags = data.tags;
        this.publishedAt = data.publishedAt;
    }
}
