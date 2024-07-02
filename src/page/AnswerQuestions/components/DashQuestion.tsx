import type { QuestionType } from "../../../types"

import { useState } from "react"
import { useGlobals } from "../../../contexts/Globals"

import Button from "../../../ui/Button"
import AnswerForm from "./AnswerForm"
import EditAnswerForm from "./EditAnswerForm"

import api from "../../../api/api"

type DashQuestionProps = {
    question: QuestionType
}

const DashQuestion = ({
    question
}: DashQuestionProps) => {

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const {setAllQuestions} = useGlobals()

    const [loadingDeleting, setLoadingDeleting] = useState(false);
    const handleDeleteQuestion = async () => {
        setLoadingDeleting(true)
        const {id} = question
        try{
            const result = await api.delete(`/questions/${question.id}`)
            const response = result.data 
            console.log(response)
            setAllQuestions(prev => prev?.filter(question => question.id !== id))
        }catch(err){
            console.log(err)
        }
        setLoadingDeleting(false)
    }

    return <div className="dash-question__container">
        <div className="dash-question__fields">
            <span className="dash-question__key"> 
                Question:
            </span>
            <span className="dash-question__value">
                {question.content}
            </span>
            <span className="dash-question__key"> 
                Answer:
            </span>
            <span className="dash-question__value">
                {
                    question.isAnswered
                        ? question.answer
                        : "Not answered..."
                }
            </span>
        </div>
        {
            !showCreateForm && !showEditForm
                && <div className="dash-question__options">
                    {
                        !question.isAnswered
                            ? <Button
                                onClick={() => setShowCreateForm(prev => !prev)}
                            >
                                Answer now!
                            </Button>
                            : <Button
                                onClick={() => setShowEditForm(prev => !prev)}
                            >
                                Edit answer
                            </Button>
                    }
                    <Button
                        type="secondary"
                        onClick={handleDeleteQuestion}
                        isLoading={loadingDeleting}
                        isDisabled={loadingDeleting}
                    >
                        Delete question
                    </Button>
                </div>
        }
        {
            showCreateForm
                && <AnswerForm 
                    question_id={question.id}
                    closeForm={() => setShowCreateForm(false)}
                />
        }
        {
            showEditForm
                && <EditAnswerForm 
                    question={question}
                    closeForm={() => setShowEditForm(false)}
                />
        }
    </div>
}

export default DashQuestion
