export type HTMLButtonRole = "button" | "submit" | "reset"
export type HTMLButtonTypes = "primary" | "secondary"

export type UserType = {
    id: string,
    name: string,
    email: string,
}

export type QuestionType = {
    id: string,
    content: string,
    recipient: UserType,
    isAnswered: boolean,
    answer: string | null,
    createdAt: Date,
}