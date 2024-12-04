import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EMIT_GET_BLOCK_TYPE, socketService } from "../services/socket.service"
import { useEffect, useState } from "react"
import { updateBlock } from "../store/block.actions"

export function AppHeader() {
    const [isNarrow, setIsNarrow] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const currUser = useSelector(state => state.currUser)
    const currBlock = useSelector(state => state.currBlock)
    const usersAmount = useSelector(state => state.usersAmount)

    // useEffect to manage the screen size for adding/ removing the connection modal
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1200 && isNarrow) {
                setIsNarrow(false)
            } else if (window.innerWidth <= 1200 && !isNarrow) {
                setIsNarrow(true)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [window.innerWidth])

    // Function to navigate to the lobby page 
    async function toLobby() {
        navigate('/lobby') 
        if (currUser.isMentor && currBlock) {
            // Reset the block content if the user is a mentor
            await updateBlock({ ...currBlock, content: currBlock.starter })
            socketService.emit(SOCKET_EMIT_GET_BLOCK_TYPE, null) 
        }
    }

    // Function to generate a string describing the connection status based on the number of users connected
    function getConectionStr() {
        if (!currUser) return '' // Return an empty string if no user is logged in
        if (currUser.isMentor) {
            if (usersAmount === 1) return 'No students connected'
            else if (usersAmount === 2) return '1 student is connected'
            else if (usersAmount > 2) return `${usersAmount - 1} students are connected`
        } else {
            if (usersAmount === 2) return 'The mentor is connected'
            else if (usersAmount === 3) return 'The mentor and 1 other user are connected'
            else if (usersAmount > 3) return `The mentor and ${usersAmount - 2} other users are connected`
        }
    }

    return <section className="app-header">
        <h3 onClick={toLobby}>{`CodeSync</>`}</h3>
        <div className="centered"><h4>{(currUser && currUser.isMentor) ? 'MENTOR' : 'STUDENT'}</h4></div>
        {isNarrow ? <div className="connection-container">
            <p onClick={() => setIsModalOpen(prev => !prev)}>Who's connected?</p>
            {isModalOpen && <div className="connection-modal">{getConectionStr()}</div>}
        </div> : <p>{getConectionStr()}</p>}
    </section>
}
