import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { AxiosError, AxiosResponse } from 'axios';


interface AxiosApiError extends AxiosError {
  response: AxiosResponse<{
    message: string;
    statusCode: number;
  }>;
}

interface UseApiMutationOptions<T, D> extends UseMutationOptions<AxiosResponse<T>, AxiosApiError, D> {
  method?: 'post' | 'put' | 'delete';
}

export const useApi = () => {
  const fetcher = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  const useApiQuery = <T>(
    url: string,
    options?: UseQueryOptions<T, AxiosApiError>
  ) => {
    return useQuery<T, AxiosApiError>({
      queryKey: [url],
      queryFn: () => fetcher<T>(url),
      ...options,
    });
  };

  const useApiMutation = <T, D>(
    url: string,
    options?: UseApiMutationOptions<T, D>,
  ) => {
    return useMutation<AxiosResponse<T>, AxiosApiError, D>({
      mutationFn: (data: D) => {
        const method = options?.method || 'post';
        switch (method) {
          case 'post':
            return axiosInstance.post<T>(url, data);
          case 'put':
            return axiosInstance.put<T>(url, data);
          case 'delete':
            return axiosInstance.delete<T>(`${url}/${data}`);
        }
      },
      ...options,
    });
  };
  return { useApiQuery, useApiMutation};
};
