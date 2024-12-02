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
import Lottie from "lottie-react"
import animationData from '../assets/img/smiley-animation.json'


export function CodeBlock({ type }) {
    const [content, setContent] = useState('')
    const currBlock = useSelector(state => state.blockModule.currBlock)
    const currUser = useSelector(state => state.blockModule.currUser)
    const navigate = useNavigate()
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [isSolved, setIsSolved] = useState(false)

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

    useEffect(() => {
        if (currBlock && content === currBlock.solution && !isSolved) {
            setIsSolved(true)
        } else if(currBlock && content !== currBlock.solution && isSolved){
            setIsSolved(false)
        }
    }, [content])

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

    async function startOver() {
        await editContent('')
        socketService.emit(SOCKET_EMIT_EDIT_BLOCK, '')
        setIsSolved(false)
    }

    return <section className="code-block">
        <div className="solved-cont">
            {isSolved ? <div>
                <h3>Congratulations! You solved the challenge</h3>
                <Lottie animationData={animationData} loop={true} autoPlay={true} style={{ width: '200px', height: '200px' }} />
                {currUser.isMentor && <button onClick={startOver}>Start over</button>}
            </div> :
                <div>
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
                </div>
            }
        </div>
    </section>
}