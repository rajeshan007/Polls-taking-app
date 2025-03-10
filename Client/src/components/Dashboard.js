import { useContext } from 'react'
import { UserContext } from '../App'

const Dashboard = () => {
    const { state } = useContext(UserContext)

    return (
        <div>
            <h1>Dashboard component</h1>
            <h3>welcome  {state.user.username} ! </h3>
            <h3>total polls - {state.myPolls.length}</h3>
            {state.myPolls.map((ele) => {
                return <li key={ele._id} > <b> {ele.question}</b>   </li>
            })}

        </div>
    )
}

export default Dashboard


