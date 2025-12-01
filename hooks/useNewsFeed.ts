import News from '@/model/News';
import { NewsService } from '@/services';
import { useEffect, useState } from 'react';

export function useNewsFeed() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNewsFeed = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await NewsService.getNewsFeed();
            setNews(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsFeed();
    }, []);

    return {
        news,
        loading,
        error,
        refetch: fetchNewsFeed,
    };
}
