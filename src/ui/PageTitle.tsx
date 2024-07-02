import { useNavigate } from "react-router-dom";
import { RiQuestionnaireFill as Logo } from "react-icons/ri";

const PageTitle = () => {
    const navigate = useNavigate();

    return <div 
        className="page-title__wrapper"
        onClick={() => navigate("/")}
    >
        <Logo 
            size={40}
            className="page-title__logo"
        />
        <h1 className="page-title__title">
            AskUs.com
        </h1>
    </div>

}

export default PageTitle