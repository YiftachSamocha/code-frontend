import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EMIT_SET_BLOCK_TYPE, socketService } from "../services/socket.service"
import { updateBlock } from "../store/actions/block.actions"
import { useEffect, useState } from "react"

export function AppHeader() {
    const [isNarrow, setIsNarrow] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const currUser = useSelector(state => state.blockModule.currUser)
    const currBlock = useSelector(state => state.blockModule.currBlock)
    const amount = useSelector(state => state.blockModule.usersAmount)


    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1200 && isNarrow) {
                setIsNarrow(false)
            } else if (window.innerWidth <= 1200 && !isNarrow) {
                setIsNarrow(true)
            }
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    async function toLobby() {
        navigate('/lobby')
        if (currUser.isMentor && currBlock) {
            await updateBlock({ ...currBlock, content: currBlock.starter })
            socketService.emit(SOCKET_EMIT_SET_BLOCK_TYPE, null)
        }
    }

    function getConectionStr() {
        if (!currUser) return ''
        if (currUser.isMentor) {
            if (amount === 1) return 'No students connected'
            else if (amount === 2) return '1 student is connected'
            else if (amount > 2) return `${amount - 1} studens are connected`
        } else {
            if (amount === 2) return 'The mentor is connected'
            else if (amount === 3) return 'The mentor and 1 other user are connected'
            else if (amount > 3) return `The mentor and ${amount - 2} other users are connected`
        }
    }

    return <section className="app-header">
        <h3 onClick={toLobby}>{`CodeSync</>`}</h3>
        <div className="centered"><h4>{currUser.isMentor ? 'MENTOR' : 'STUDENT'}</h4></div>
        {isNarrow ? <div className="connection-container">
            <p onClick={() => setIsModalOpen(prev => !prev)}>Who's connected?</p>
            {isModalOpen && <div className="connection-modal">{getConectionStr()}</div>}
        </div> : <p>{getConectionStr()}</p>}
    </section>
}