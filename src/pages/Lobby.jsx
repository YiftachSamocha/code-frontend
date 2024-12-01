import { useEffect } from "react"
import { useNavigate } from "react-router"
import { SOCKET_EVENT_SET_CURR_USER, socketService } from "../services/socket.service"
import { useDispatch } from "react-redux"
import { SET_CURR_USER } from "../store/reducers/block.reducer"


export function Lobby() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_SET_CURR_USER, user => {
            dispatch({ type: SET_CURR_USER, currUser: user })
        })
    }, [])
    
    function onSetBlock(url) {
        navigate(`/code/${url}`)
    }
    return <section className="lobby">
        <h1>Choose code block</h1>
        <div className="lobby-container">
            <div onClick={() => onSetBlock('async')} >Async case</div>
            <div onClick={() => onSetBlock('dom')}>DOM manipulation</div>
            <div onClick={() => onSetBlock('array')}>Array methods</div>
            <div onClick={() => onSetBlock('event')}>Event loop</div>
            <div onClick={() => onSetBlock('error')}>Error handeling</div>
            <div onClick={() => onSetBlock('data')} >Data structures</div>
        </div>
    </section>
}