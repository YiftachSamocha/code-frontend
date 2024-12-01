import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EMIT_SET_BLOCK_TYPE, socketService } from "../services/socket.service"

export function AppHeader() {
    const navigate = useNavigate()
    const currUser = useSelector(state => state.blockModule.currUser)
    const amount = useSelector(state => state.blockModule.usersAmount)
    function toLobby() {
        navigate('/lobby')
        if (currUser.isMentor) {
            socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, null)
        }
    }

    function getConectionStr() {
        if (currUser.isMentor) {
            if (amount === 1) return 'No students connected'
            else if (amount === 2) return '1 student is connected'
            else if (amount > 2) return `${amount-1} studens are connected`
        } else {
            if (amount === 2) return 'The mentor is connected'
            else if (amount === 3) return 'The mentor and 1 user are connected'
            else if (amount > 3) return `The mentor and ${amount-1} users are connected`
        }
    }

    return <section className="app-header">
        <p onClick={toLobby} >Lobby</p>
        <h3>CodeSync</h3>
        <p>{getConectionStr()}</p>
    </section>
}