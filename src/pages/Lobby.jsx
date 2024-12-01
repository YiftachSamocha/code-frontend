import { useEffect } from "react"
import { useNavigate } from "react-router"
import { SOCKET_EVENT_BLOCK_TYPE_CHOSEN, SOCKET_EVENT_SET_CURR_USER, socketService } from "../services/socket.service"
import { useDispatch, useSelector } from "react-redux"
import { SET_CURR_USER } from "../store/reducers/block.reducer"
import { loadBlock } from "../store/actions/block.actions"


export function Lobby() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.blockModule.currUser)
    const currBlock = useSelector(state => state.blockModule.currBlock)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_SET_CURR_USER, setUser)
        socketService.on(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, setBlock)
       
        return () => {
            socketService.off(SOCKET_EVENT_SET_CURR_USER, setUser)
            socketService.off(SOCKET_EVENT_BLOCK_TYPE_CHOSEN, loadBlock)
        }
    }, [])

    function setUser(user) {
        dispatch({ type: SET_CURR_USER, currUser: user })
    }

    function setBlock(type) {
        loadBlock(type)
    }

    function getClass(type) {
        if (!currUser || currUser.isMentor) return 'mentor-option'
        if (currBlock && currBlock.type === type) return 'student-option'
        return 'student-not-option'
    }

    function onSetBlock(url) {
        if (!currUser.isMentor && currBlock.type !== url) return

        navigate(`/code/${url}`)

    }

    return <section className="lobby">
        <h1>Choose code block</h1>
        <div className="lobby-container">
            <div onClick={() => onSetBlock('async')} className={getClass('async')} >Async case</div>
            <div onClick={() => onSetBlock('dom')} className={getClass('dom')}>DOM manipulation</div>
            <div onClick={() => onSetBlock('array')} className={getClass('array')}>Array methods</div>
            <div onClick={() => onSetBlock('event')} className={getClass('event')}>Event loop</div>
            <div onClick={() => onSetBlock('error')} className={getClass('error')}>Error handeling</div>
            <div onClick={() => onSetBlock('data')} className={getClass('data')} >Data structures</div>
        </div>
    </section>
}