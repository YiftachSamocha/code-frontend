import { useNavigate } from "react-router"

export function Lobby() {
    const navigate = useNavigate()
    function onSetBlock(url) {
        navigate(`/code/${url}`)
    }
    return <section>

        <div>
            <div onClick={() => onSetBlock('async')} >Async case</div>
            <div onClick={() => onSetBlock('dom')}>DOM manipulation</div>
            <div onClick={() => onSetBlock('array')}>Array methods</div>
            <div onClick={() => onSetBlock('event')}>Event loop</div>
            <div onClick={() => onSetBlock('error')}>Error handeling</div>
            <div onClick={() => onSetBlock('data')} >Data structures</div>
        </div>
    </section>
}