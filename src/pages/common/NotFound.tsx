// use shadcn ui
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
    const navigate = useNavigate();
    return <Button onClick={() => navigate(-1)}>Not Found</Button>;
}

