import { Separator } from "@/components/ui/separator";

export const CustomListPage = () => {
    return (
        <>
            <div>
                <h3 className="text-lg font-medium">Custom Lists</h3>
                <p className="text-sm text-muted-foreground">
                    Manage custom lists for the application.
                </p>
            </div>
            <Separator className="my-6" />
        </>
    )
}