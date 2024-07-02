import { useEffect, useState } from "react"
import { useGlobals } from "../../../contexts/Globals"

import Skeleton from "./ProfilesListSkeleton"
import Profile from "./ProfileTab"

import api from "../../../api/api"
import { isAxiosError } from "axios"

const ProfilesList = () => {
    
    const {setUsers, users} = useGlobals()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try{
                const result = await api.get("users")
                setUsers(result.data);
            }catch(err){
                setUsers([]);
                if(isAxiosError(err))
                    console.dir(err);
                else console.log(err)
            }
        }

        fetchProfiles()
    }, [])

    useEffect(() => {
        if(users !== undefined)
            setLoading(false)
        console.log(users)
    }, [users])

    if(!loading)
    return <div className="profiles-list__container">
        {
            users?.map((user) => (
                <Profile profile={user} />
            ))
        }
    </div>

    else return <Skeleton />
}

export default ProfilesList
