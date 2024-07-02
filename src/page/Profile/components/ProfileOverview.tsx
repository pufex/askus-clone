import type { UserType } from "../../../types"

import Profile from "../../../assets/images/avatar.jpg"

type ProfileOverviewProps = {
    profile: UserType
}

const ProfileOverview = ({
    profile: {name}
}: ProfileOverviewProps) => {
    
    return <header className="profile-overview__header">
        <div className="profile-overview__pic-container">
            <img 
                className="profile-overview__pic"
                src={Profile} 
                alt={name} 
            />
        </div>
        <h1 className="profile-overview__name">
            {name}
        </h1>
    </header>
}

export default ProfileOverview
