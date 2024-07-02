import { UserType } from '../../../types'

import { useNavigate } from 'react-router-dom'

import Button from '../../../ui/Button'

import Avatar from "../../../assets/images/avatar.jpg"

type ProfileTabProps = {
    profile: UserType
}

const ProfileTab = ({
    profile: {id, name}
}: ProfileTabProps) => {

    const navigate = useNavigate()

    return <div className='profile-tab__wrapper shadow'>
        <div className="profile-tab__side">
            <img 
                className='profile-tab__pic'
                src={Avatar} 
                alt={name} 
            />
            <h1 className='profile-tab__name'> 
                {name}
            </h1>
        </div>
        <Button
            onClick={() => navigate(`/profiles/${id}`)}
        >
            Visit
        </Button>
    </div>
}

export default ProfileTab
