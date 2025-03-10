import { Link, useParams } from "react-router-dom"
import { useContext, useState } from "react"
import _ from 'lodash'
import { PollsContext, UserContext } from "../App"
import axios from '../config/axios'
function SinglePoll() {
    const { id } = useParams()
    const { state, dispatch } = useContext(UserContext)
    const { pollsState } = useContext(PollsContext)


    const poll = pollsState.activePolls.find((ele) => {
        return ele._id === id
    })

    const hasVoted = state.myVotes.find((ele) => {
        return ele.poll === id
    })


    const [selectedOption, setSelectedOption] = useState(hasVoted ? hasVoted.option : '')
    const [serverErrors, setServerErrors] = useState([])



    const handleVote = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/polls/vote/${id}`, { option: selectedOption }, {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            alert('thank you for voting')
            dispatch({ type: 'ADD_MY_VOTE', payload: response.data })

        } catch (e) {
            setServerErrors(e.response.data.errors)

        }
    }


    /*
     instead of wring ternary if else we can use this approach and call the fucntion in jsx
         const displayButton = () => {
          if (_.isEmpty(state.user)) {
              return <Link to='/login' > <button> Login to vote</button> </Link>
          } else {
              if (hasVoted) {
                  return <b>  your vote is recorded </b>
              } else {
  
              }
          }
      }
    */


    return (
        <div>

            {serverErrors.length > 0 && (
                <div>
                    <h3 style={{ color: 'red' }} >These errors prohibitted the form from being saved: </h3>
                    <ul>
                        {serverErrors.map((ele, i) => {
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div>
            )}
            <h2>{poll?.question} - {poll?.categoryId?.name} </h2>
            <b>options</b>
            <ul>
                {poll?.options.map((ele) => {
                    return <li key={ele._id} >
                        <input
                            type="radio"
                            value={selectedOption}
                            name="poll"
                            disabled={_.isEmpty(state.user)}
                            id={ele._id}
                            onChange={(e) => { setSelectedOption(ele._id) }}
                            checked={ele._id === selectedOption}
                        />
                        <label htmlFor={ele._id} >{ele.optionText}</label>

                    </li>
                })}
            </ul>
            {_.isEmpty(state.user) ? <Link to='/login' > <button> Login to vote</button> </Link> :
                (
                    <div>
                        {hasVoted ? <b>  your vote is recorded </b> : <button onClick={handleVote} > Vote</button>}
                    </div>
                )


            }


            <br />
            <small> created by - <b> {poll?.creator.username} </b>  and  expiring on - <b> {new Date(poll?.endDate).toDateString()}</b>   </small>
        </div>
    )
}

export default SinglePoll