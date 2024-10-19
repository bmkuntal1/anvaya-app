import axios from "@/lib/axios";

export const getLogList = async ({ queryKey }: { queryKey: [string, { page: number, pageSize: number }] }) => {
    const response = await axios.get(`/logs`, { params: { ...queryKey[1], health: true } });
    return response.data;
}

export const getLogContent = async ({ queryKey }: { queryKey: [string, string] }) => {
    const response = await axios.get(`/logs/${queryKey[1]}`);
    return response.data;
}
