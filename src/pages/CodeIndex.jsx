import { useParams } from "react-router";
import { CodeBlock } from "../cmps/CodeBlock";
import { useEffect, useState } from "react";
import { blockService } from "../services/block/block.service";


export function CodeIndex() {
    const type = useParams().type
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        const newTitle = blockService.getTitle(type)
        setTitle(newTitle)
    }, [type])

    return <section className="code-index">
        <h1>{title}</h1>
        <CodeBlock type={type} />

    </section>
}