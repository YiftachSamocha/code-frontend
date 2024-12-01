import { useEffect, useState } from "react"
import { loadBlock, updateBlock } from "../store/actions/block.actions"
import { useSelector } from "react-redux"
import { SOCKET_EMIT_EDIT_BLOCK, SOCKET_EMIT_SET_BLOCK_TYPE, SOCKET_EVENT_BLOCK_EDITED, socketService } from "../services/socket.service"

export function CodeBlock({ type }) {
    const [content, setContent] = useState('')
    const block = useSelector(state => state.blockModule.currBlock)
    const currUser = useSelector(state => state.blockModule.currUser)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_EDITED, editContent)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_EDITED, editContent)
        }
    }, [type])

    useEffect(() => {
        loadBlock(type)
            .then(block => {
                setContent(block.content)

            })
    }, [type])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, type)
    }, [type])



    async function editContent(editedContent) {
        setContent(editedContent)
        const blockToUpdate = { ...block, content: editedContent }
        await updateBlock(blockToUpdate)
    }

    function handleChange({ target }) {
        if (currUser.isMentor) return
        const { value } = target
        editContent(value)
        socketService.emit(SOCKET_EMIT_EDIT_BLOCK, value)
    }

    return <section className="code-block">
        <textarea value={content} onChange={handleChange}></textarea>
        <h5>{currUser.isMentor ? 'Hello Mentor' : 'Hello student'}</h5>
    </section>
}