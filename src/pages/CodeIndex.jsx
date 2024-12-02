import { useNavigate, useParams } from "react-router";
import { CodeBlock } from "../cmps/CodeBlock";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SOCKET_EMIT_SET_BLOCK_TYPE, SOCKET_EVENT_BLOCK_TYPE_CHOSEN, socketService } from "../services/socket.service";
import { loadBlock } from "../store/actions/block.actions";
import { AskQuestion } from "../cmps/msgs-cmps/AskQuestion";

export function CodeIndex() {
    const type = useParams().type
    const currUser = useSelector(state => state.blockModule.currUser)
    const currBlock = useSelector(state => state.blockModule.currBlock)
    const navigate = useNavigate()

    useEffect(() => {
        setBlock(type)
    }, [type])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, setBlock)
        return () => {
            socketService.off(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, setBlock)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, type)
    }, [type])

    async function setBlock(type) {
        const block = await loadBlock(type)
        if (!block) navigate('/lobby')

    }


    return <section className="code-index">
        <div className="code-cont">
            <div>
                <div className="challenge">
                    <h4>{currBlock && currBlock.title}</h4>
                    <h5>{currBlock && `Challenge: ${currBlock.subtitle}`}</h5>
                    <p>{currBlock && currBlock.challenge}</p>
                </div>
                {!currUser.isMentor && <AskQuestion />}
            </div>
            <CodeBlock currBlock={currBlock} />
        </div>
    </section>
}