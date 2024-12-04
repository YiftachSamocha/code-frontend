import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export function Lobby() {
    const currUser = useSelector(state => state.currUser)
    const currBlock = useSelector(state => state.currBlock)
    const navigate = useNavigate()

    // Function to determine the class name based on user and block type
    function getClass(type) {
        if (!currUser || currUser.isMentor) return 'mentor-option'
        if (currBlock && currBlock.type === type) return 'student-option'
        return 'student-not-option'
    }

    // Function to handle setting the block type and navigating to the appropriate page
    function onSetBlock(url) {
        if (!currUser.isMentor && currBlock.type !== url) return
        navigate(`/code/${url}`)
    }

    return <section className="lobby">
        <h1>Choose code block</h1>
        <div className="lobby-container">
            <div onClick={() => onSetBlock('async')} className={getClass('async')} >
                <i className="fa-regular fa-hourglass"></i>
                <p> Async case</p>

            </div>
            <div onClick={() => onSetBlock('dom')} className={getClass('dom')}>
                <i className="fa-solid fa-pen"></i>
                <p>DOM manipulation</p>
            </div>
            <div onClick={() => onSetBlock('array')} className={getClass('array')}>
                <i className="fa-solid fa-layer-group"></i>
                <p>Array methods</p>
            </div>
            <div onClick={() => onSetBlock('event')} className={getClass('event')}>
                <i className="fa-solid fa-arrows-rotate"></i>
                <p> Event loop</p>
            </div>
            <div onClick={() => onSetBlock('error')} className={getClass('error')}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <p>Error handeling</p>
            </div>
            <div onClick={() => onSetBlock('data')} className={getClass('data')} >
                <i className="fa-solid fa-database"></i>
                <p>Data structures</p>
            </div>
        </div>
    </section>
}