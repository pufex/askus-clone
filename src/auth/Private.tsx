import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";
import { useLocation } from "react-router-dom";

const Private = () => {
    
    const {pathname} = useLocation()
    const {accessToken} = useAuth()

    return accessToken == null
        ? <Navigate 
            to={"/login"} 
            replace 
            state={{previous: pathname}}
        />
        : <Outlet />
}

export default Private