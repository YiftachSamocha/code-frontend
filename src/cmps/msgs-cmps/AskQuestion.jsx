import { useState } from "react"
import { SOCKET_EMIT_SEND_QUESTION, socketService } from "../../services/socket.service"
import { makeId } from "../../services/util.service"

export function AskQuestion() {
    const [content, setContent] = useState('')
    const [sentMsg, setSentMsg] = useState('')

    // Function to handle changes in the textarea (user typing the question)
    function handleChange({ target }) {
        const { value } = target
        setContent(value)
    }

    // Function to submit the question and emit it via socket
    function submit() {
        socketService.emit(SOCKET_EMIT_SEND_QUESTION, { content, id: makeId() })
        setContent('')
        setSentMsg('Sent!')
        setTimeout(() => {
            setSentMsg('')
        }, 3000)
    }

    return <section className="ask-question">
        <h5>Don't understand the challenge? Ask the mentor!</h5>
        <textarea value={content} onChange={handleChange} ></textarea>
        <div>
            <button onClick={submit}>Submit</button>
            <p>{sentMsg}</p>
        </div>
    </section>

}