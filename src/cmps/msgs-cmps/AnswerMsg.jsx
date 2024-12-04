import { useEffect, useState } from "react";
import { SOCKET_EVENT_GET_ANSWER, socketService } from "../../services/socket.service";

export function AnswerMsg() {
    const [answers, setAnswers] = useState([])

    // useEffect hook to listen for incoming answers via socket
    useEffect(() => {
        socketService.on(SOCKET_EVENT_GET_ANSWER, getAnswer)

        return () => {
            socketService.off(SOCKET_EVENT_GET_ANSWER, getAnswer)
        }
    }, [])

    // Function to handle receiving a new answer and update the state
    function getAnswer(answer) {
        setAnswers(prev => [...prev, answer])
    }

    // Function to close a specific answer by filtering it out of the answers array
    function close(id) {
        const newAnswers = answers.filter(a => a.id !== id)
        setAnswers(newAnswers)
    }

    // If there are no answers, return nothing (rendering nothing)
    if (!answers || answers.length === 0) return

    return <section className="answer-msg">
        {answers.map(answer => {
            return <div className="msg-item" key={answer.id}>
                <h3>The mentor answered your question!</h3>
                <p><span>Question:</span> {answer.question}</p>
                <p><span>Answer:</span> {answer.content}</p>
                <button onClick={() => close(answer.id)}>x</button>
            </div>
        })}

    </section>
}