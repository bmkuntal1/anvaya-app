import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Import, Trash, MoveUp, MoveDown, MoveLeft, MoveRight, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getCustomValues = async ({ queryKey }: any) => {
    const [_, params] = queryKey;
    const response = await axios.get(`/custom-values`, { params });
    return response.data;
}

const updateCustomValues = async (data: any) => {
    const response = await axios.put(`/custom-values`, data);
    return response.data;
}

const deleteCustomValue = async (id: string) => {
    const response = await axios.delete(`/custom-values/${id}`);
    return response.data;
}

const listTypes = [
    { value: "job_role", label: "Job Role" },
    { value: "social_category", label: "Social Category" },
    { value: "language", label: "Language" },
    { value: "employment_type", label: "Employment Type" },
    { value: "marital_status", label: "Marital Status" },
    { value: "employment_status", label: "Employment Status" },
    { value: "gender", label: "Gender" },
    { value: "department", label: "Department" },
]

const getListTypeLabel = (type: string) => {
    const listType = listTypes.find((item) => item.value === type);
    return listType?.label;
}

export const CustomListPage = () => {
    const [listType, setListType] = useState<string>("job_role");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [hiddenIds, setHiddenIds] = useState<string[]>([]);

    const queryClient = useQueryClient();

    const { data: customList, isLoading, error } = useQuery({
        queryKey: ["custom-values", { types: listType }],
        queryFn: getCustomValues
    });

    const { isPending, mutate } = useMutation({
        mutationFn: updateCustomValues,
        onSuccess: () => {
            toast.success("Custom list updated successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });

    const { isPending: isDeletingCustomValues, mutate: deleteCustomValues } = useMutation({
        mutationFn: deleteCustomValue,
        onSuccess: () => {
            toast.success("Custom list deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });

    const handleSelectChild = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ids = e.target.value;
        setSelectedIds(ids.split(","));
    }

    const handleSelectHiddenChild = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ids = e.target.value;
        setHiddenIds(ids.split(","));
    }

    const handleMoveRight = () => {
        const { id } = customList?.find((item: any) => item.key === selectedIds[0]);
        mutate({
            id,
            isActive: false,
        });
    }

    const handleMoveLeft = () => {
        const { id } = customList?.find((item: any) => item.key === hiddenIds[0]);
        mutate({
            id,
            isActive: true,
        });
    }

    const handleMoveUp = () => {

    }

    const handleMoveDown = () => {

    }

    const handleDeleteList = () => {
        const { id } = customList?.find((item: any) => item.key === hiddenIds[0]);
        deleteCustomValues(id);
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-medium">Custom Lists</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage custom lists for the application.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={listType} onValueChange={(value) => setListType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a list" />
                        </SelectTrigger>
                        <SelectContent>
                            {listTypes?.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button size="sm">
                        <Plus className="w-4 h-4" />
                        Add
                    </Button>
                    <Button size="sm">
                        <Import className="w-4 h-4" />
                        Import
                    </Button>
                </div>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">{getListTypeLabel(listType)}</label>
                        <Button size="sm" variant="outline" className="h-6">
                            <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-6" title="Order by name">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <select multiple className="w-full border rounded-md md:min-h-[300px] p-2 mt-2" value={selectedIds} onChange={handleSelectChild}>
                        {customList?.map((item: any) => (
                            item.isActive === true && (
                                <option key={item.key} value={item.key}>
                                    {item.value}
                                </option>
                            )
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Button size="sm" variant="outline" onClick={handleMoveRight} disabled={listType === null}>
                        <MoveRight className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleMoveLeft} disabled={listType === null}>
                        <MoveLeft className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleMoveUp} disabled={listType === null}>
                        <MoveUp className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleMoveDown} disabled={listType === null}>
                        <MoveDown className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleDeleteList} disabled={listType === null}>
                        {isDeletingCustomValues ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
                    </Button>
                </div>
                <div className="w-full">
                    <label className="text-sm font-medium">Hide {getListTypeLabel(listType)}</label>
                    <select multiple className="w-full border rounded-md md:min-h-[300px] p-2 mt-2" value={hiddenIds} onChange={handleSelectHiddenChild}>
                        {customList?.map((item: any) => (
                            item.isActive === false && (
                                <option key={item.key} value={item.key}>
                                    {item.value}
                                </option>
                            )
                        ))}
                    </select>
                </div>
            </div>

        </>
    )
}