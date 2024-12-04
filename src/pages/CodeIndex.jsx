import { CodeBlock } from "../cmps/CodeBlock";
import { useSelector } from "react-redux";
import { AskQuestion } from "../cmps/msgs-cmps/AskQuestion";

export function CodeIndex() {
    const currUser = useSelector(state => state.currUser)
    const currBlock = useSelector(state => state.currBlock)
   
    return <section className="code-index">
        <div className="cards-cont">
            <div className="challenge">
                <h4>{currBlock && currBlock.title}</h4>
                <h5>{currBlock && `Challenge: ${currBlock.subtitle}`}</h5>
                <p>{currBlock && currBlock.challenge}</p>
            </div>
            {currUser && !currUser.isMentor && <AskQuestion />}
        </div>
        <CodeBlock currBlock={currBlock} />
    </section>
}