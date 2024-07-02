import type { UserType } from "../../types";
import type { QuestionType } from "../../types";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAuth } from "../../contexts/Auth";
import { useGlobals } from "../../contexts/Globals";

import LoadingBlock from "../../components/LoadingBlock";
import QuestionsSkeleton from "./components/QuestionsSkeleton";
import ProfileOverview from "./components/ProfileOverview";
import QuestionForm from "./components/QuestionForm";
import ProfileQuestion from "./components/ProfileQuestion";
import Button from "../../ui/Button";

import api from "../../api/api";

const Profile = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const {user: authedUser} = useAuth()
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const {
        user, setUser,
        questions, setQuestions
    } = useGlobals()

    const [loadingQuestions, setLoadingQuestions] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const result = await api.get("/users")
                const users = result.data as UserType[];
                const fetchedUser = users.find((user) => user.id === id)
                if(!fetchedUser){
                    setError("User of this id doesn't exist.")
                }else{
                    setUser(fetchedUser)
                    console.log(user)
                }
                setLoading(false)
                return fetchedUser
            }catch(err){
                console.log(err);
                setLoading(false)
            }
            setLoading(false)
        }

        const fetchUsersQuestions = async (user: UserType) => {
            const {id} = user;
            try{
                const result = await api.get(`/questions/answered/${id}`)
                const fetchedQuestions = result.data as QuestionType[]
                console.log(fetchedQuestions)
                setQuestions(fetchedQuestions);
            }catch(err){
                console.log(err)
                setQuestions([])
                setLoadingQuestions(false)
            }
            setLoadingQuestions(false)
        }

        const handleResult = async () => {
            const result = await fetchUser()
            if(result) await fetchUsersQuestions(result)
        }

        handleResult()
    }, [id])

    useEffect(() => {
        error
            && navigate("/users")
    }, [error])

    if(!loading && user && questions)
    return <>
        <ProfileOverview profile={user} />
        {
            authedUser?.id === id
                && <section className="profile__options">
                    <Button
                        onClick={() => navigate(`/profiles/answer/${user.id}`)}
                    >
                        Answer Questions
                    </Button>
                </section>
        }
        <section className="profile__question-form">
            <h2 className="heading-2">
                Ask a question
            </h2>
            <QuestionForm profile={user} />
        </section>
        <section className="profile__answered-questions">
            {
                loadingQuestions
                    ? <QuestionsSkeleton />
                    : questions?.length 
                        ? questions
                            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map(question => (
                                <ProfileQuestion question={question} />
                            ))
                        : <span className="profile__answered-questions--empty">
                            This user wasn't asked or didn't respond to any questions. 
                            <span className="link">{"Ask them now!" }</span>
                        </span>
            }
        </section>
    </>

    else 
    return <LoadingBlock height="300px"/>
}

export default Profile
