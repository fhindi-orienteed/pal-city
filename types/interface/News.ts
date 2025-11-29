export interface News {
    id: string;
    title: string;
    content: string;
    summary: string;
    category: string;
    author: string;
    date: string;
    images: string[];
    source?: string;
    tags?: string[];
}
