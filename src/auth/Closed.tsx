import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

const Closed = () => {
    
    const {accessToken} = useAuth()

    return accessToken != null
        ? <Navigate 
            to={"/"} 
            replace 
        />
        : <Outlet />
}

export default Closed