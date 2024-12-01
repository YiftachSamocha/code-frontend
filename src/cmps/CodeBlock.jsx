import { useEffect, useState } from "react"
import { loadBlock, updateBlock } from "../store/actions/block.actions"
import { useSelector } from "react-redux"

export function CodeBlock({ type }) {
    const [content, setContent] = useState('')
    const block = useSelector(state => state.blockModule.currBlock)

    useEffect(() => {
        loadBlock(type)
            .then(block => {
                setContent(block.content)
            })
    }, [])

    async function editText({ target }) {
        const { value } = target
        setContent(value)
        const blockToUpdate = { ...block, content: value }
        await updateBlock(blockToUpdate)
    }

    return <section className="code-block">
        <textarea value={content} onChange={editText}></textarea>
    </section>
}