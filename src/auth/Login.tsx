import type { FieldValues } from "react-hook-form"

import {useForm} from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/Auth"

import { FormProvider } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { Link } from "react-router-dom"

import api from "../api/api"

const PWD_REGEX = /^[A-z0-9!@#$%^&]{4,12}$/
const USERNAME_REGEX = /^[A-z0-9-_]{6,25}$/

const Login = () => {
    
    const {state} = useLocation()
    const navigate = useNavigate();

    const {setAccessToken, setUser} = useAuth()
    const methods = useForm()
    const {handleSubmit, formState: {errors, isLoading}, reset} = methods

    const onSubmit = async (data: FieldValues) => {
        const {name, password} = data;
        try{
            const result = await api.post(
                "/auth/login",
                {name, password}
            )
            const accessToken = result.data.accessToken
            const user = result.data.user
            setAccessToken(accessToken)
            setUser(user)
            reset()
            if(typeof state.previous === "string"){
                navigate(state.previous)
            }else navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return <FormProvider {...methods}>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="login"
        >
            <section className="login__wrapper">
                <h1 className="heading center login__heading">
                    Login
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
                <Button
                    className="login__button"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    Login now!
                </Button>
                <div className="login__links">
                    <p className="link__wrapper">
                        Don't have an account? <Link to="/register" className="link">Create it now!</Link>
                    </p>
                </div>
            </section>
        </form>
    </FormProvider>
}

export default Login
