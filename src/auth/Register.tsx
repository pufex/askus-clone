import type { FieldValues } from "react-hook-form"

import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FormProvider } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Checkbox from "../ui/Checkbox"
import { Link } from "react-router-dom"

import api from "../api/api"

const PWD_REGEX = /^[A-z0-9!@#$%^&]{4,12}$/
const USERNAME_REGEX = /^[A-z0-9-_]{6,25}$/

const Register = () => {
    
    const navigate = useNavigate();

    const methods = useForm()
    const {handleSubmit, formState: {errors, isLoading}, reset, getValues} = methods

    const onSubmit = (data: FieldValues) => {
        const {name, password} = data;

        const registerUser = async () => {
            try{
                const result = await api.post(
                    "/auth/register", 
                    {name, password}, 
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                console.log(result)
                reset()
                navigate("/login")
            }catch(err){
                console.log(err)
            }
        }
        registerUser()

        
    }

    return <FormProvider {...methods}>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="register"
        >
            <section className="register__wrapper">
                <h1 className="heading center register__heading">
                    Register
                </h1>
                <Input
                    name="name"
                    registerOptions={{
                        required: "Required",
                        minLength: {
                            value: 6,
                            message: "Min. 6 char."
                        },
                        maxLength: {
                            value: 25,
                            message: "Max. 25 char."
                        },
                        validate: (val: string) => 
                            USERNAME_REGEX.test(val) || "Invalid username"
                    }}
                    placeholder="Type your username"
                    errorMessage={`${errors?.name?.message ?? ""}`}
                >
                    Username
                </Input>
                <Input
                    name="password"
                    registerOptions={{
                        required: "Required",
                        minLength: {
                            value: 4,
                            message: "Min. 4 char."
                        },
                        maxLength: {
                            value: 12,
                            message: "Max. 12 char."
                        },
                        validate: (val: string) => 
                            PWD_REGEX.test(val) || "Invalid password"
                    }}
                    placeholder="Your password"
                    errorMessage={`${errors?.password?.message ?? ""}`}
                    isPassword
                >
                    Password
                </Input>
                <Input
                    name="confirm"
                    registerOptions={{
                        required: "Required",
                        validate: (val: string) => 
                            getValues("password") === val || "Doesn't match."
                    }}
                    placeholder="Confirm your password"
                    errorMessage={`${errors?.confirm?.message ?? ""}`}
                    isPassword
                >
                    Confirm Password
                </Input>
                <ul className="checkbox__list">
                    <Checkbox
                        name="canModify"
                        registerOptions={{
                            validate: (val: boolean) => 
                                val === true || "Required"
                        }}
                        errorMessage={`${errors?.canModify?.message ?? ""}`}
                        defaultChecked={false}
                    >
                        You must allow us to use or modify your user data to enhance your user experience.
                    </Checkbox>
                    <Checkbox
                        name="willAbide"
                        registerOptions={{
                            validate: (val: boolean) => 
                                val === true || "Required"
                        }}
                        errorMessage={`${errors?.canModify?.message ?? ""}`}
                        defaultChecked={false}
                    >
                        You comply to abide by our <Link to="/terms-of-service" className="link">(terms of service)</Link>.
                    </Checkbox>
                </ul>
                <Button
                    className="register__button"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                >
                    Register now!
                </Button>
                <div className="register__links">
                    <p className="link__wrapper">
                        Already registered? <Link className="link" to="/login">Sign in now!</Link>
                    </p>
                </div>
            </section>
        </form>
    </FormProvider>
}

export default Register
