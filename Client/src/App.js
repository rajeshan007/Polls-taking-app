import React, { useReducer, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import axios from '../src/config/axios'
import NewPoll from './components/NewPoll'
import MyPolls from './components/MyPolls'
import PollShow from './components/PollShow'
import userReducer from './reducers/user-reducer'
import pollsReducer from './reducers/polls-Reducer'
import categoriesReducer from './reducers/categories-reducer'
import SinglePoll from './components/SinglePoll'
import SingleCategory from './components/SingleCategory'




export const UserContext = createContext()
export const PollsContext = createContext()
export const CategoriesContext = createContext()


const App = () => {
  const [state, dispatch] = useReducer(userReducer, { user: {}, myPolls: [], myVotes: [] })
  const [pollsState, pollsDispatch] = useReducer(pollsReducer, { activePolls: [] })
  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, { data: [], selectedPolls: [] })



  useEffect(() => {
    if (localStorage.getItem('token')) { // handling page reload  when the user is logged in only 
      (async () => {
        try {
          const response = await axios.get('/api/users/account', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
          dispatch({ type: 'USER_LOGIN', payload: response.data })

          const pollsResponse = await axios.get('/api/polls/mypolls', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
          dispatch({ type: 'SET_MY_POLLS', payload: pollsResponse.data })

          const votesResponse = await axios.get('/api/votes/myvotes', { headers: { 'Authorization': localStorage.getItem('token') } })
          dispatch({ type: 'SET_MY_VOTES', payload: votesResponse.data })

        } catch (e) {
          console.log(e);
        }
      })()
    }

    (async () => {
      try {
        const response = await Promise.all([await axios.get('/api/polls/activePolls'), await axios.get('/api/categories')])
        const polls = response[0].data
        const categories = response[1].data
        pollsDispatch({ type: 'ACTIVE_POLLS', payload: polls })
        categoriesDispatch({ type: 'SET_CATEGORIES', payload: categories })

      } catch (e) {
        console.log(e.message);
      }


    })()

  }, [])


  return (

    <BrowserRouter >
      <UserContext.Provider value={{ state, dispatch }}>
        <PollsContext.Provider value={{ pollsState, pollsDispatch }}>
          <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }} >

            <div>
              <h1>Polling App </h1>
              <h2>total categories - {categoriesState.data.length} </h2>

              <NavBar />

              <Routes>
                <Route path='/' Component={Home} ></Route>
                <Route path='/register' Component={Register} ></Route>
                <Route path='/login' Component={Login} ></Route>
                <Route path='/dashboard' Component={Dashboard}></Route>
                <Route path='/polls/createPoll' Component={NewPoll}>  </Route>
                <Route path='/polls/mypolls' Component={MyPolls} ></Route>
                <Route path='/myPolls/:id' Component={PollShow} ></Route>
                <Route path='/polls/:id' Component={SinglePoll} ></Route>
                <Route path='/polls/category/:name' Component={SingleCategory} ></Route>

              </Routes>
            </div>
          </CategoriesContext.Provider>
        </PollsContext.Provider>
      </UserContext.Provider>


    </BrowserRouter>

  )
}

export default App