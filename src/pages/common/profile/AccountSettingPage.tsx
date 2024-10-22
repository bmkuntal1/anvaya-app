import { ChangePasswordForm } from "./ChangePasswordForm";

export const AccountSettingPage: React.FC = () => {
    return (
        <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <ChangePasswordForm />
        </div>
    );
}

export default AccountSettingPage;