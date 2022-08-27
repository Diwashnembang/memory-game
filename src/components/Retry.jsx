
import "./retry.css"
const Retry = (props) => {
    const { restart } = props
    return (
        <>
            <h4>Game Over</h4>
            <button className="button-32" onClick={restart}>Retry</button>
        </>
    )
}

export default Retry;