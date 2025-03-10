import { useParams } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../App"

const PollShow = () => {
    const { state } = useContext(UserContext)
    const { id } = useParams()

    const poll = state.myPolls.find((ele) => {
        return ele._id === id
    })




    return (
        <div>
            {poll && (
                <div>
                    <h1> {poll.question}  </h1>
                    <label> options</label> <br /> <br />
                    {poll.options.map((ele) => {
                        return < li key={ele._id} > {ele.optionText} </li>
                    })}
                </div>
            )}


        </div>
    )
}

export default PollShow