import type { UserType } from "../../../types"
import type { FieldValues } from "react-hook-form"

import {useForm} from "react-hook-form"

import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import { FormProvider } from "react-hook-form"

import api from "../../../api/api"

type QuestionFormProps = {
    profile: UserType
}

const QuestionForm = ({
    profile: {id, name}
}: QuestionFormProps) => {

    const methods = useForm()
    const {handleSubmit, reset, formState: {errors, isLoading}} = methods

    const onSubmit = (data: FieldValues) => {
        const {question} = data 
        
        const askQuestion = async () => {
            try{
                const result = await api.post(
                    "/questions/new",
                    {content: question, recipient: id}
                )
                console.log(result);
                reset();
            }catch(err){
                console.log(err);
            }
        }


        askQuestion()
    }

    return <FormProvider {...methods}>
        <form
            className="question-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                errors.question
                    && <h1 className="question-form__error">
                        {`${errors.question.message}`}
                    </h1>
            }
            <div className="question-form__content">
                <Input 
                    className="question-form__input"
                    name="question"
                    registerOptions={{
                        required: "Required",
                        minLength: {
                            value: 2,
                            message: "A question must contain at least 2 characters."
                        },
                        maxLength: {
                            value: 100,
                            message: "A question must have no more than 100 characters."
                        }
                    }}
                    placeholder={`Ask ${name} a question...`}
                />
                <Button
                    className="question-form__button"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    Ask it now!
                </Button>
            </div>
        </form>
    </FormProvider>
}

export default QuestionForm
