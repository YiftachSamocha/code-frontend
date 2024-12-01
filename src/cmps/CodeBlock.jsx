import { useEffect, useState } from "react"
import { loadBlock, updateBlock } from "../store/actions/block.actions"
import { useSelector } from "react-redux"
import { SOCKET_EMIT_EDIT_BLOCK, SOCKET_EMIT_SET_BLOCK_TYPE, SOCKET_EVENT_BLOCK_EDITED, SOCKET_EVENT_BLOCK_TYPE_CHOSEN, socketService } from "../services/socket.service"
import { useNavigate } from "react-router"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


export function CodeBlock({ type }) {
    const [content, setContent] = useState('')
    const currBlock = useSelector(state => state.blockModule.currBlock)
    const currUser = useSelector(state => state.blockModule.currUser)
    const navigate = useNavigate()
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        // if (currBlock && currBlock.isMentor === false && currBlock.type !== type) {
        //     navigate('/lobby')
        //     return
        // }
        socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, type)
    }, [type])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, onSetBlock)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, onSetBlock)
        }
    }, [])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_EDITED, editContent)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_EDITED, editContent)
        }
    }, [type])

    async function onSetBlock(type) {
        if (type === null) {
            mentorLeft()
            return
        }
        const block = await loadBlock(type)
        setContent(block.content)
    }

    async function mentorLeft() {
        await editContent('')
        navigate('/lobby')

    }

    async function editContent(editedContent) {
        setContent(editedContent)
        const blockToUpdate = { ...currBlock, content: editedContent }
        await updateBlock(blockToUpdate)
    }

    function handleChange(value) {
        if (currUser.isMentor) return
        editContent(value)
        socketService.emit(SOCKET_EMIT_EDIT_BLOCK, value)
    }

    return <section className="code-block">
        <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme={isDarkMode ? 'monokai' : 'tomorrow'}
            name="blah2"
            onChange={handleChange}
            fontSize={14}
            lineHeight={19}
            width="600px"
            height="400px"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={content}
            readOnly={currUser.isMentor ? true : false}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                enableMobileMenu: true,
                showLineNumbers: true,
                tabSize: 2,
            }} />
        <button className={isDarkMode ? 'dark' : 'light'}
            onClick={() => setIsDarkMode(prev => !prev)}>{isDarkMode ? 'Light mode' : 'Dark mode'}</button>
    </section>
}