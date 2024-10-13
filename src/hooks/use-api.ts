import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const useApi = () => {
  const fetcher = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  const useGetQuery = <T>(
    url: string,
    options?: UseQueryOptions<T, AxiosError>
  ) => {
    return useQuery<T, AxiosError>({
      queryKey: [url],
      queryFn: () => fetcher<T>(url),
      ...options,
    });
  };

  const usePostMutation = <T, D>(
    url: string,
    options?: UseMutationOptions<AxiosResponse<T>, AxiosError, D>
  ) => {
    return useMutation<AxiosResponse<T>, AxiosError, D>({
      mutationFn: (data: D) => axiosInstance.post<T>(url, data),
      ...options,
    });
  };

  return { useGetQuery, usePostMutation };
};
