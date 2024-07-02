import type { QuestionType } from "../../../types"

type ProfileQuestionProps = {
    question: QuestionType
}

const ProfileQuestion = ({
    question: {content, answer}
}: ProfileQuestionProps) => {
    return <div className="profile-question">
        <p className="profile-question__content">
            {content}
        </p>
        <div className="profile-question__answer__wrapper">
            <h1 className="profile-question__answer__heading">
                Answer:
            </h1>
            <p className="profile-question__answer__answer">
                {answer}
            </p>
        </div>
    </div>
}

export default ProfileQuestion
