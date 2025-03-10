import { useContext } from 'react'
import { UserContext } from '../App'
import PollList from './PollList'

const MyPolls = () => {
    const { state } = useContext(UserContext)

    return (
        <div>
            <h3>my polls</h3>
            <h2> total polls - {state.myPolls.length} </h2>
            <PollList polls={state.myPolls} />
        </div>
    )
}

export default MyPolls