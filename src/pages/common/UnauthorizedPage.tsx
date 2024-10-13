// use shadcn ui
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const UnauthorizedPage = () => {
    const navigate = useNavigate();
    // navigate back on or redirect to home page
    return <Button onClick={() => navigate(-1)}>Unauthorize</Button>;
}

