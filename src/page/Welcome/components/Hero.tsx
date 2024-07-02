import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/Auth";

import Button from "../../../ui/Button"

const Hero = () => {

    const navigate = useNavigate();
    const {accessToken} = useAuth()

    return <div className="hero__container">
        <h1 className="heading hero__heading center">
            Curious about someone? Ask them now!
        </h1>
        <p className="paragraph center hero__paragraph">
            Our online service allows people to ask you interesting questions that you can answer, but don't have to! All answered questions will appear on your profile, but unanswered don't. This allows you to easily moderate what others get to know about you and protects from trolling.
        </p>
        <p className="paragraph center hero__paragraph">
            Go ahead, ask some questions to random users, or create your own account to receive them yourself!
        </p>
        <div className="hero__buttons">
            <Button
                className="hero__button"
                onClick={() => navigate("/profiles")}
            >
                Ask a question
            </Button>
            {
                !accessToken
                    && <Button
                        className="hero__button"
                        onClick={() => navigate("/login")}
                    >
                        Join us
                    </Button>
            }
        </div>
    </div>
}

export default Hero
