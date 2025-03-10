import React, { useContext } from 'react'
import { useLocation,} from 'react-router-dom'
import { PollsContext } from '../App'
import PollList from './PollList'


const Home = () => {
  const location = useLocation()
  const message = location.state?.message
  const { pollsState } = useContext(PollsContext)


  return (
    <div>
      {message && <b> {message} </b>}

      <h1>Home component</h1>
      <h2>Active polls - {pollsState.activePolls.length} </h2>
      <PollList polls={pollsState.activePolls} />



    </div>
  )
}

export default Home