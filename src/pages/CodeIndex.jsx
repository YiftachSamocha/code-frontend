import { useParams } from "react-router";
import { CodeBlock } from "../cmps/CodeBlock";
import { useEffect, useState } from "react";
import { blockService } from "../services/block/block.service";
import { useSelector } from "react-redux";


export function CodeIndex() {
    const type = useParams().type
    const [title, setTitle] = useState('')
    const currUser = useSelector(state => state.blockModule.currUser)
    
    useEffect(() => {
        const newTitle = blockService.getTitle(type)
        setTitle(newTitle)
    }, [type])

    return <section className="code-index">
        <h1>{title}</h1>
        <h3>{currUser.isMentor ? 'Hello Mentor' : 'Hello student'}</h3>
        <CodeBlock type={type} />
        
    </section>
}