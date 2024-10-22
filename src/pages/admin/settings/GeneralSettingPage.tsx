import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const emailOptions = [
    { id: "communication", label: "Communication emails", description: "Receive emails about your account activity." },
    { id: "marketing", label: "Marketing emails", description: "Receive emails about new products, features, and more." },
    { id: "social", label: "Social emails", description: "Receive emails for friend requests, follows, and more." },
    { id: "security", label: "Security emails", description: "Receive emails about your account activity and security." },
];

export const GeneralSettingPage = () => {
    const [settings, setSettings] = useState({
        communication: false,
        marketing: false,
        social: true,
        security: false,
    });

    const handleToggle = (id: string) => {
        setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Configure general settings for the application.
                </p>
            </div>
            <Separator className="my-6" />

            <div className="p-4">
                <h3 className="text-lg font-medium">Application</h3>
                <div className="mt-4 space-y-4">
                    {emailOptions.map(({ id, label, description }) => (
                        <Card key={id} className="flex items-center justify-between p-4">
                            <div>
                                <h4 className="font-semibold">{label}</h4>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                            <Switch
                                checked={settings[id]}
                                onCheckedChange={() => handleToggle(id)}
                            />
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}