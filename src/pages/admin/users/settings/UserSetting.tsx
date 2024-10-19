import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UpdatePassword } from "./UpdatePassword";
import { UserPermissions } from "./UserPermissions";

export const UserSetting = ({ data, onClose }: { data: any, onClose: () => void }) => {

    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="flex justify-between items-start">
                <h1 className="text-xl font-bold">User Setting</h1>
                <Button variant="ghost" size="sm" className="text-sm hover:drop-shadow-md" onClick={onClose}> <X className="w-4 h-4 mr-2" /> Close</Button>
            </div>
            <UpdatePassword userId={data.id} />
            {data.role === 'recruiter' && <UserPermissions data={data} />}
        </div>
    );
}