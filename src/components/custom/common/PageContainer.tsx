import { Card, CardContent } from "@/components/ui/card";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="container mx-auto p-6 pt-0">{children}</div>;
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

const PageContent = ({ children, variant }: { children: React.ReactNode, variant?: 'default' | 'card' }) => {
    if (variant === 'card') {
        return <Card>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    }
    return <div className="mt-4">{children}</div>;
}

export { PageContainer, PageHeader, PageTitle, PageContent };
