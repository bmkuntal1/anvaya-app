import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-9xl font-bold text-gray-800 drop-shadow-md">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">Oops... Page not found!</h2>
            <p className="mt-2 text-gray-500">
                The page you are looking for does not exist.
            </p>
            <div className="flex gap-4 mt-6 ">
                <Button variant="outline" className="drop-shadow-md" onClick={() => navigate(-1)}>Go back</Button>
                <Button className="drop-shadow-md" onClick={() => navigate('/')}>Go to home</Button>
            </div>
        </div>
    );
};