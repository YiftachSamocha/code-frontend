import { useEffect, useState } from "react"
import { updateBlock } from "../store/actions/block.actions"
import { useSelector } from "react-redux"
import { SOCKET_EMIT_EDIT_BLOCK, SOCKET_EVENT_BLOCK_EDITED, socketService } from "../services/socket.service"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Lottie from "lottie-react"
import animationData from '../assets/img/smiley-animation.json'
import { compareFunctions } from "../services/block/compare.service";


export function CodeBlock({ currBlock }) {
    const [content, setContent] = useState('')
    const currUser = useSelector(state => state.blockModule.currUser)
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [isSolved, setIsSolved] = useState(false)
    const [blockSize, setBlockSize] = useState({ width: '600px', height: '450px' })

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_EDITED, editContent)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_EDITED, editContent)
        }
    }, [currBlock])

    useEffect(() => {
        checkSolution()
    }, [content])

    useEffect(() => {
        if (currBlock) setContent(currBlock.content)
    }, [currBlock])

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 720) {
                if (blockSize.width !== '350px' || blockSize.height !== '300px') {
                    setBlockSize({ width: '350px', height: '300px' })
                }
            } else if (window.innerWidth < 1200) {
                if (blockSize.width !== '500px' || blockSize.height !== '310px') {
                    setBlockSize({ width: '500px', height: '310px' })
                }
            } else if (window.innerWidth >= 1200) {
                if (blockSize.width !== '600px' || blockSize.height !== '450px') {
                    setBlockSize({ width: '600px', height: '450px' })
                }
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [blockSize])



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
        await editContent(currBlock.starter)
        socketService.emit(SOCKET_EMIT_EDIT_BLOCK, currBlock.starter)
        setIsSolved(false)
    }

    function checkSolution() {
        var solutionCheck
        if (currBlock) {
            solutionCheck = compareFunctions(content, currBlock.solution)
            if (isSolved && !solutionCheck) {
                setIsSolved(false)
            } else if (!isSolved && solutionCheck) {
                setIsSolved(true)
            }
        }
    }

    return <section className="code-block">
        <div >
            {isSolved ? <div className="solved-cont">
                <h3>{currUser.isMentor ? 'Challenge solved!' : 'Congratulations! You solved the challenge'}</h3>
                <Lottie animationData={animationData} loop={true} autoPlay={true}
                    style={{ width: '200px', height: '200px' }} />
                {currUser.isMentor && <button onClick={startOver}>Start over</button>}
            </div> :
                <div className="editor-cont">
                    <AceEditor
                        mode="javascript"
                        theme={isDarkMode ? 'monokai' : 'tomorrow'}
                        name="blah2"
                        onChange={handleChange}
                        fontSize={14}
                        lineHeight={19}
                        width={blockSize.width}
                        height={blockSize.height}
                        showPrintMargin={false}
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

                        }}
                    />
                    <button className={isDarkMode ? 'dark' : 'light'}
                        onClick={() => setIsDarkMode(prev => !prev)}>{isDarkMode ? 'Dark mode' : 'Light mode'}</button>
                </div>
            }
        </div>
    </section>
}