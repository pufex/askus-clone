import type { QuestionType } from '../../../types'
import type { FieldValues } from 'react-hook-form'

import {useForm} from 'react-hook-form'
import { useGlobals } from '../../../contexts/Globals'

import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import { FormProvider } from 'react-hook-form'

import api from '../../../api/api'

type EditAnswerFormProps = {
    question: QuestionType,
    closeForm: () => void
}

const EditAnswerForm = ({
    question,
    closeForm
}: EditAnswerFormProps) => {

    const {setAllQuestions} = useGlobals()

    const methods = useForm()
    const {handleSubmit, formState: {errors, isLoading}} = methods

    const onSubmit = (data: FieldValues) => {
        const {answer}  = data
        const editAnswerQuestion = async () => {
            const {id} = question
            try{
                const result = await api.patch(
                    `/questions/edit/${id}`,
                    {answer}
                )
                console.log(result)
                setAllQuestions(prev => prev?.map((question) => {
                    if(question.id === id){
                        return {...question,
                            isAnswered: true,
                            answer
                        }
                    }else return question
                }))
                closeForm();
            }catch(err){
                console.log(err)
            }
        }
        editAnswerQuestion()
    }

    return <FormProvider {...methods}>
        <form 
            className="answer-questions__form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <section className="answer-questions__form__section">
                <h2 className="heading-2">
                    Answer this question:
                </h2>
                {
                    errors.answer
                        && <h2 className="answer-questions__form__error">
                            {`${errors.answer.message}`}
                        </h2>
                }
            </section>
            <Input 
                name="answer"
                registerOptions={{
                    required: "Required",
                    maxLength: {
                        value: 300,
                        message: "Answer should have no more than 300 characters."
                    }
                }}
                defaultValue={
                    !question.answer 
                        ? undefined 
                        : question.answer
                }
                placeholder={"Answer this question here..."}
                className="answer-questions__form__input"
            />
            <section className="answer-questions__form__buttons">
                <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    className="edit-form__button"
                >
                    Confirm
                </Button>
                <Button
                    type="secondary"
                    role="button"
                    onClick={closeForm}
                >
                    Cancel
                </Button>
            </section>
        </form>
    </FormProvider>
}

export default EditAnswerForm
