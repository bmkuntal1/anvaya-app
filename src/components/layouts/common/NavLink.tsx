import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

export const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const isActive = location.pathname === href;
    return (
        <Link
            to={href}
            className={cn(
                "flex items-center py-2 px-4 text-sm font-medium rounded-md",
                isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
            )}
        >
            {children}
        </Link>
    );
};