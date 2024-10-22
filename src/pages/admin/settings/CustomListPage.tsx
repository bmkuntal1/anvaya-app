import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash, Edit, GripHorizontal } from "lucide-react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CSS } from '@dnd-kit/utilities';
import { Input } from "@/components/ui/input";
import { AddCustomListModal } from "./customList/AddCustomListModal";
import { useDebounce } from "use-debounce";
import { UpdateCustomListModal } from "./customList/UpdateCustomListModal";

const getCustomValues = async ({ queryKey }: any) => {
    const [_, params] = queryKey;
    if (!params.search) {
        delete params.search;
    }
    const response = await axios.get(`/custom-values`, { params });
    return response.data;
}

const updateStatus = async (data: any) => {
    const response = await axios.put(`/custom-values/status`, data);
    return response.data;
}

const sortCustomValuesByName = async (data: any) => {
    const response = await axios.put(`/custom-values/sort-by-name`, data);
    return response.data;
}

const sortCustomValuesByOrder = async (data: any) => {
    const response = await axios.put(`/custom-values/sort-by-order`, data);
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

export const CustomListPage = () => {
    const [listType, setListType] = useState<string>("job_role");
    const [sortList, setSortList] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [search] = useDebounce(searchValue, 500);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [updateId, setUpdateId] = useState<string | null>(null);
    const [lock, setLock] = useState<boolean>(false);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const queryClient = useQueryClient();

    const { data: customList, isLoading } = useQuery({
        queryKey: ["custom-values", { types: listType, search }],
        queryFn: getCustomValues,
        enabled: !lock,
    });

    useEffect(() => {
        if (customList) {
            setSortList(customList);
        }
    }, [customList]);

    const { isPending: isUpdatingStatus, mutate: mutateStatusChange } = useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
            toast.success("Custom list updated successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });

    const { isPending: isSortingByName, mutate: mutateSortCustomValuesByName } = useMutation({
        mutationFn: sortCustomValuesByName,
        onSuccess: () => {
            toast.success("Custom list sorted by name successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });

    const { isPending: isSorting, mutate: mutateSortCustomValuesByOrder } = useMutation({
        mutationFn: sortCustomValuesByOrder,
        onSuccess: () => {
            setActiveId(null);
            toast.success("Custom list sorted successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });


    const { isPending: isDeleting, mutate: mutateDeleteCustomValue } = useMutation({
        mutationFn: deleteCustomValue,
        onSuccess: () => {
            toast.success("Custom list deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["custom-values"] });
        }
    });

    const handleTypeChange = (type: string) => {

        setLock(true);
        setSearchValue("");
        setTimeout(() => {
            setLock(false);
            setListType(type);
        }, 501);
    }

    function handleSortStart(event: any) {
        const { active } = event;
        setActiveId(active.id);
    }

    const handleSort = (event: any) => {
        const { active, over } = event;
        const oldOrder = customList?.map((item: any) => item.id);
        if (active.id !== over.id) {
            const oldIndex = oldOrder?.indexOf(active.id);
            const newIndex = oldOrder?.indexOf(over.id);
            const newOrder = arrayMove(oldOrder, oldIndex, newIndex);
            setSortList(arrayMove(sortList, oldIndex, newIndex));
            mutateSortCustomValuesByOrder({ type: listType, newOrder: newOrder.map((item: any, index: number) => ({ id: item, order: index })) });
        } else {
            setActiveId(null);
        }
    }

    const handleSortByName = () => {
        mutateSortCustomValuesByName({ type: listType });
    }


    const handleEdit = (id: string) => {
        setUpdateId(id);
    }


    const handleStatusChange = (id: string) => {
        const item = sortList?.find((item: any) => item.id === id);
        mutateStatusChange({ id, isActive: !item?.isActive });
    }


    const handleDelete = (id: string) => {
        mutateDeleteCustomValue(id);
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
                    <div className="w-60">
                        <Select value={listType} onValueChange={(value) => handleTypeChange(value)}>
                            <SelectTrigger className="w-full">
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
                    </div>
                    <AddCustomListModal type={listType} />
                </div>
            </div>
            <Separator className="my-6" />


            <div className="flex flex justify-content-between gap-2 pb-2">
                {/* search */}
                <div className="flex-1">
                    <Input placeholder="Search" className="w-full h-8" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 h-8">
                    <Button variant="outline" size="sm" onClick={handleSortByName}>{isSortingByName ? "Sorting..." : "Sort By Name"}</Button>
                </div>
            </div>
            {isLoading ? <LoadingSkeleton /> :
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSort} onDragStart={handleSortStart}>
                    <SortableContext items={sortList?.map((item: any) => item.id)} strategy={verticalListSortingStrategy}>
                        {sortList?.map((item: any) => (
                            <CustomListItem key={item.id} item={item} onEdit={handleEdit}
                                onStatusChange={handleStatusChange} isStatusChanging={isUpdatingStatus}
                                onDelete={handleDelete} isDeleting={isDeleting}
                                className={activeId === item.id ? "border-2 border-primary shadow-md z-9999" : ""} />
                        ))}
                    </SortableContext>
                </DndContext>
            }
            {updateId && <UpdateCustomListModal id={updateId} onClose={() => setUpdateId(null)} />}
        </>
    )
}

const CustomListItem = ({ item, onEdit, onStatusChange, onDelete, isDeleting, isStatusChanging, className, }: { item: any, onEdit?: (id: string) => void, onStatusChange?: (id: string) => void, onDelete?: (id: string) => void, isDeleting?: boolean, isStatusChanging?: boolean, className?: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition
    };

    return (
        <Card ref={setNodeRef} className={cn("mt-2", className)} style={style}>
            <CardContent className="flex items-center justify-between px-4 py-2">
                <div className="text-sm font-medium">
                    <div className="flex flex-col items-start gap-1">
                        <code className="text-xs text-muted-foreground">{item.key}</code>
                        {item.value}
                    </div>
                </div>
                <div>
                    {onEdit && <Button variant="ghost" size="sm" onClick={() => onEdit(item.id)}>
                        <Edit className="w-4 h-4" />
                    </Button>}
                    {onDelete && <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)} disabled={isDeleting}>
                        <Trash className="w-4 h-4" />
                    </Button>}
                    {onStatusChange && <div className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                        <Checkbox checked={item.isActive} onCheckedChange={() => onStatusChange(item.id)} disabled={isStatusChanging} />
                    </div>}
                    <Button variant="ghost" size="sm" {...listeners} {...attributes}>
                        <GripHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-2 w-10" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}
