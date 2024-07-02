import type { UserType, QuestionType } from "../types";
import { createContext, useContext, useState } from "react";

export type GlobalsContextType = {
    users?: UserType[],
    setUsers: React.Dispatch<React.SetStateAction<UserType[] | undefined>>,
    user?: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
    questions?: QuestionType[],
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[] | undefined>>,
    question?: QuestionType | null,
    setQuestion: React.Dispatch<React.SetStateAction<QuestionType | null | undefined>>
    allQuestions?: QuestionType[],
    setAllQuestions: React.Dispatch<React.SetStateAction<QuestionType[] | undefined>>
}

const GlobalsContext = createContext<undefined | GlobalsContextType>(undefined)

export const useGlobals = () => {
    const globals = useContext(GlobalsContext)
    if(!globals) throw new Error("useGlobals() cannot be used outside its provider.")
    return globals;
}

type GlobalsProviderProps = {
    children: React.ReactNode
}

const GlobalsProvider = ({
    children
}: GlobalsProviderProps) => {

    const [users, setUsers] = useState<UserType[] | undefined>(undefined)
    const [user, setUser] = useState<UserType | null | undefined>(undefined)
    const [questions, setQuestions] = useState<QuestionType[] | undefined>(undefined)
    const [question, setQuestion] = useState<QuestionType | null | undefined>(undefined)
    const [allQuestions, setAllQuestions] = useState<QuestionType[] | undefined>(undefined)

    const value = {
        users,setUsers,
        user,setUser,
        questions,setQuestions,
        question,setQuestion,
        allQuestions,setAllQuestions,
    }

    return <GlobalsContext.Provider value={value}>
        {children}
    </GlobalsContext.Provider>
}

export default GlobalsProvider