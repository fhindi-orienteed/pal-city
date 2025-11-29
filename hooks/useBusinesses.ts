import appConfig from '@/config/appConfig';
import { Business } from '@/types/interface';
import { useCallback, useEffect, useState } from 'react';
import { BusinessService } from '../services';

interface Filter {
  filter: string;
  values: string[];
}

/**
 * Custom hook to fetch all businesses with refetch, filters and search support
 */
export const useBusinesses = () => {
  const pageSize = appConfig.businessList.pageSize;

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter[]>([]);

  const hasMore = pageSize < businesses.length;

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);
    const data = await BusinessService.getBusinessesList(page, pageSize, filters);
    setBusinesses(data);
    setTotalRecords(data.length);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const refetch = useCallback(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const addFilters = useCallback((filters: Filter[], reset = false) => {
    if (reset) {
      setFilters(filters);
    } else {
      setFilters((prevFilters) => [...prevFilters, ...filters]);
    }
    fetchBusinesses();
  }, []);

  const resetFilters = useCallback(() => {
    setFilters([]);
    fetchBusinesses();
  }, []);

  const fetchNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
    fetchBusinesses();
  }, []);

  return { businesses, loading, error, refetch, addFilters, resetFilters, totalRecords, fetchNextPage, hasMore };
};