import { useEffect, useState } from "react"
import { SOCKET_EVENT_GET_QUESTION, socketService } from "../../services/socket.service"

export function QuestionMsg({ onAnswer }) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        socketService.on(SOCKET_EVENT_GET_QUESTION, getQuestion)

        return () => {
            socketService.off(SOCKET_EVENT_GET_QUESTION, getQuestion)
        }

    }, [])

    function getQuestion(newQuestion) {
        setQuestions(prev => [...prev, newQuestion])
    }

    function close(id) {
        const newQuestions = questions.filter(q => q.id !== id)
        setQuestions(newQuestions)
    }

    function answer(question) {
        close(question.id)
        onAnswer(question)
    }

    if (!questions || questions.length === 0) return
    return <section className="question-msg">
        {questions.map(question => {
            return <div className="msg-item">
                <h3>New question from student!</h3>
                <p>{question.content}</p>
                <div className="btn-cont">
                    <button onClick={() => answer(question)}> Answer</button>
                    <button onClick={() => close(question.id)}>x</button>
                </div>
            </div>
        })}
    </section>
}