import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={cn("container mx-auto p-6 pt-0", className)}>{children}</div>;
}

const PageHeader = ({ title, children }: { title?: string | React.ReactNode, children?: React.ReactNode }) => {
    return <div className="flex justify-between items-center py-3">
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>;
}

const PageTitle = ({ children }: { children: React.ReactNode }) => {
    return <h1 className="text-xl font-bold">{children}</h1>;
}

const PageContent = ({ children, variant, className }: { children: React.ReactNode, variant?: 'default' | 'card', className?: string }) => {
    if (variant === 'card') {
        return <Card>
            <CardContent className={className}>
                {children}
            </CardContent>
        </Card>
    }
    return <div className={className}>{children}</div>;
}

export { PageContainer, PageHeader, PageTitle, PageContent };
