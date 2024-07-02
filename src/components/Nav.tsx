import { useAuth } from "../contexts/Auth"
import { useLocation } from "react-router-dom"

import { Link } from "react-router-dom"
import Title from "../ui/PageTitle"

const Nav = () => {

    const {pathname} = useLocation()
    const {accessToken, user} = useAuth()

    return <nav className="nav">
        <div className="nav__side">
            <Title />
        </div>
        <div className="nav__side">
            {
                !accessToken
                    && <Link
                        className="nav__link"
                        to="/login"
                        state={{previous: pathname}}
                    >
                        Login
                    </Link>
            }
            {
                user
                    && <>
                        
                        <Link 
                            to={`/profiles/${user.id}`}
                            className="nav__link"
                        >
                            Profile
                        </Link>
                    </> 
            }
            <Link
                className="nav__link"
                to="/profiles"
            >
                Users
            </Link>
        </div>
    </nav>
}

export default Nav
