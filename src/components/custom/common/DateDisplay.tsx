import { formatDate } from "@/lib/utils";

export function DateDisplay({ date, className, fallback = 'N/A' }: Readonly<{ date: string, className?: string, fallback?: string }>) {

    if (!date) return <span className={`font-light italic ${className}`}>{fallback}</span>;

    return <span className={className}>{formatDate(date)}</span>;
}
