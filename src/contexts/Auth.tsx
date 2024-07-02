import type { UserType } from "../types"

import {createContext, useContext, useEffect, useLayoutEffect, useState} from "react"

import LoadingScreen from "../components/LoadingScreen"

import api from "../api/api"

export type AuthContextType = {
    user?: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
    accessToken?: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if(!auth) throw new Error("useAuth() must be used within its provider.")
    return auth;
}

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthProvider = ({
    children
}: AuthProviderProps) => {

    const [user, setUser] = useState<UserType | undefined | null>()
    const [accessToken, setAccessToken] = useState<string | null | undefined>();

    useEffect(() => {
        console.log(accessToken)
    }, [accessToken])

    useEffect(() => {
        const fetchAccessToken = async () => {
            try{
                const response = await api.get("/auth/refresh")
                setUser(response.data.user)
                setAccessToken(response.data.accessToken)
            }catch{
                setAccessToken(null)
                setUser(null)
            }
        }

        fetchAccessToken()
    }, [])

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.authorization = 
                // @ts-expect-error
                !config._retry && accessToken
                    ? `Bearer ${accessToken}`
                    : config.headers.authorization
            return config
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [accessToken])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                if(
                    error.response.status === 403
                    && originalRequest._retry 
                ) {
                    try{
                        const response = await api.get("/auth/refresh")
                        setUser(response.data.user)
                        setAccessToken(response.data.accessToken)
                        
                        originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`
                        originalRequest._retry = true;
    
                        return api(originalRequest)
                    }catch{
                        setAccessToken(null)
                        setUser(null)
                    }
                }

                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    return <AuthContext.Provider
        value={{
            accessToken, 
            setAccessToken, 
            user,
            setUser
        }}
    >
        
        {
            accessToken === undefined
                ? <LoadingScreen /> 
                : children
        }
    </AuthContext.Provider>
}

export default AuthProvider