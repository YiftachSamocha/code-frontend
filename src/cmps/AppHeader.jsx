import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EMIT_SET_BLOCK_TYPE, socketService } from "../services/socket.service"

export function AppHeader() {
    const navigate = useNavigate()
    const currUser = useSelector(state => state.blockModule.currUser)
    function toLobby() {
        navigate('/lobby')
        if (currUser.isMentor) {
            socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, null)
        }

    }
    return <section className="app-header">
        <p onClick={toLobby} >Lobby</p>
        <h3>CodeSync</h3>
        <p>3 students are in this room</p>
    </section>
}