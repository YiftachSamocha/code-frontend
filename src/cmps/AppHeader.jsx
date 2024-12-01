import { useNavigate } from "react-router"

export function AppHeader() {
    const navigate = useNavigate()
    return <section className="app-header">
        <p onClick={() => navigate('/lobby')} >Lobby</p>
        <h3>CodeSync</h3>
        <p>3 students are in this room</p>
    </section>
}