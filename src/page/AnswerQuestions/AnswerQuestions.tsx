import { QuestionType } from "../../types"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGlobals } from "../../contexts/Globals"

import DashQuestion from "./components/DashQuestion"
import DashQuestionsSkeleton from "./components/DashQuestionsSkeleton"
import Button from "../../ui/Button"

import api from "../../api/api"

const AnswerQuestions = () => {

    const navigate = useNavigate()
    const {id} = useParams();

    const [loading, setLoading] = useState(true)
    const {setAllQuestions, allQuestions} = useGlobals();

    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const result = await api.get(`/questions/all/${id}`)
                const questions = result.data as QuestionType[]
                setAllQuestions(questions)
            }catch(err){
                console.log(err)
                setAllQuestions([])
            }
            setLoading(false)
        }
        fetchQuestions()
    }, [id])

    return <>
        <section className="answer-questions__buttons">
            <Button
                role="button"
                onClick={() => navigate(`/profiles/${id}`)}
            >
                Go back to profile
            </Button>
        </section>
        <h1 className="heading center answer-questions__heading">
            Moderate your questions.
        </h1>
        <section className="answer-questions__questions">
            {
                loading && !allQuestions
                    ? <DashQuestionsSkeleton />
                    : !allQuestions?.length
                        ? <h1 className="answer-questions__questions--empty">
                            No questions to answer yet...
                        </h1>
                        : allQuestions
                            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map(question => (
                                <DashQuestion question={question}/>
                            ))
            }
        </section>
    </>
}

export default AnswerQuestions
