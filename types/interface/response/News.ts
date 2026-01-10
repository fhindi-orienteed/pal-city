export interface INewsResponse {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    author: string;
    publishedAt: string;
    coverImage: string;
    images: string[];
    source?: string;
    tags?: string[];
}
