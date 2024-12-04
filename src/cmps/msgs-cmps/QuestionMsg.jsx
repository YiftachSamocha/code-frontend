import { useEffect, useState } from "react"
import { SOCKET_EVENT_GET_QUESTION, socketService } from "../../services/socket.service"

export function QuestionMsg({ onAnswer }) {
    const [questions, setQuestions] = useState([])

    // useEffect hook to listen for incoming questions
    useEffect(() => {
        socketService.on(SOCKET_EVENT_GET_QUESTION, getQuestion)

        return () => {
            socketService.off(SOCKET_EVENT_GET_QUESTION, getQuestion)
        }
    }, [])

    // Add the new question received from the socket to the questions array 
    function getQuestion(newQuestion) {
        setQuestions(prev => [...prev, newQuestion])
    }

    // Function to remove a question from the list by its ID
    function close(id) {
        const newQuestions = questions.filter(q => q.id !== id) 
        setQuestions(newQuestions)
    }

    // Function to handle answering a question
    function answer(question) {
        close(question.id) 
        onAnswer(question) // Sets the question as the current question, opening the answering modal
    }

    // If there are no questions, return nothing (rendering nothing)
    if (!questions || questions.length === 0) return

    return <section className="question-msg">
        {questions.map(question => {
            return <div className="msg-item" key={question.id}>
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
