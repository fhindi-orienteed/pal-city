import { NewsService } from '@/services';
import { News } from '@/types/interface';
import { useEffect, useState } from 'react';

export function useNews() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await NewsService.getLatestNews();
            setNews(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return {
        news,
        loading,
        error,
        refetch: fetchNews,
    };
}
