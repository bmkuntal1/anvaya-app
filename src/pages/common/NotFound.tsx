import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-9xl font-bold text-gray-800">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">Oops... Page not found!</h2>
            <p className="mt-2 text-gray-500">
                Scelerisque et nunc commodo neque purus cursus tellus ultrices semper diam mauris
                quis lorem amet nisl pharetra nibh pulvinar viverra urna commodo.
            </p>
            <Button 
                onClick={() => navigate(-1)} 
                className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
                Go back
            </Button>
        </div>
    );
};