import { useEffect, useState } from "react"
import { loadBlock, updateBlock } from "../store/actions/block.actions"
import { useSelector } from "react-redux"
import { SOCKET_EMIT_EDIT_BLOCK, SOCKET_EMIT_SET_BLOCK_TYPE, SOCKET_EVENT_BLOCK_EDITED, SOCKET_EVENT_BLOCK_TYPE_CHOSEN, socketService } from "../services/socket.service"
import { useNavigate } from "react-router"

export function CodeBlock({ type }) {
    const [content, setContent] = useState('')
    const block = useSelector(state => state.blockModule.currBlock)
    const currUser = useSelector(state => state.blockModule.currUser)
    const navigate = useNavigate()

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

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, mentorLeft)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, mentorLeft)
        }

    }, [])

    async function mentorLeft(type) {
        if (type !== null) return
        await editContent('')
        navigate('/lobby')

    }

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
    </section>
}