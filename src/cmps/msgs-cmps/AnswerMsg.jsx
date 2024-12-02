import { useEffect, useState } from "react";
import { SOCKET_EVENT_GET_ANSWER, socketService } from "../../services/socket.service";

export function AnswerMsg() {
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_GET_ANSWER, getAnswer)

        return () => {
            socketService.off(SOCKET_EVENT_GET_ANSWER, getAnswer)
        }
    }, [])

    function getAnswer(answer) {
        setAnswers(prev => [...prev, answer])
    }

    function close(id) {
        const newAnswers = answers.filter(a => a.id !== id)
        setAnswers(newAnswers)
    }

    if (!answers || answers.length === 0) return

    return <section className="answer-msg">
        {answers.map(answer => {
            return <div className="msg-item">
                <h3>The mentor answered your question!</h3>
                <p><span>Question:</span> {answer.question}</p>
                <p><span>Answer:</span> {answer.content}</p>
                <button onClick={() => close(answer.id)}>x</button>
            </div>
        })}

    </section>
}