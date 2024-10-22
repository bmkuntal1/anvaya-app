import { useState } from 'react';
import { Switch } from '@/components/ui/switch'; // Import the Shadcn Switch component

interface Permission {
    key: string;
    name: string;
}
//ajs,ejs,bij
const permissionsList: Permission[] = [
    { key: 'ajs', name: 'Add Job Seeker', description: 'Add a new job seeker to the system.' },
    { key: 'ejs', name: 'Edit Job Seeker', description: 'Edit an existing job seeker in the system.' },
    { key: 'bij', name: 'Bulk Import Job Seeker', description: 'Import multiple job seekers to the system in bulk.' },
];

export const UserPermissions = ({ data }: { data: any }) => {
    const [permissions, setPermissions] = useState<string[]>(data.permissions ? data.permissions?.split(',') : []);

    const handleTogglePermission = (key: string) => {
        const newPermissions = [...permissions];
        if (newPermissions.includes(key)) {
            newPermissions.splice(newPermissions.indexOf(key), 1);
        } else {
            newPermissions.push(key);
        }
        console.log(newPermissions);
        setPermissions(newPermissions);
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Permissions</h1>
            <div className="space-y-2 max-w-lg">
                {permissionsList.map((item: Permission) => (
                    <div key={item.key} className="flex items-center justify-between cursor-pointer border-b border-gray-200 py-2 hover:drop-shadow-md">
                        <label htmlFor={`permission-${item.key}`} className="flex flex-col gap-2">
                            <h3 className="text-md font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </label>
                        <Switch
                            id={`permission-${item.key}`}
                            checked={permissions.includes(item.key)}
                            onCheckedChange={() => handleTogglePermission(item.key)}
                            className="h-4 w-10 drop-shadow-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};