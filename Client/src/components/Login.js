import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom'
import Register from './Register'
import axios from '../config/axios'
import { UserContext } from '../App'

const Login = () => {
  const { dispatch } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()
  const message = location.state?.message

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverErrors, setServerErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email,
      password
    }
    try {
      const response = await axios.post('/api/users/login', formData)
      // once user logs in set the token in to localStorage
      localStorage.setItem('token', response.data.token)
      const token = localStorage.getItem('token')

      // after that get the users account information
      const accountResponse = await axios.get('/api/users/account', { headers: { "Authorization": token } })
      const user = accountResponse.data
      dispatch({ type: "USER_LOGIN", payload: user })

      // once the user logs in we get account information and polls information so make an api call in login 
      const pollsResponse = await axios.get('/api/polls/mypolls', { headers: { 'Authorization': token } })
      dispatch({ type: 'SET_MY_POLLS', payload: pollsResponse.data })

      const votesResponse = await axios.get('/api/votes/myvotes', { headers: { 'Authorization': token } })
      dispatch({ type: 'SET_MY_VOTES', payload: votesResponse.data })

      navigate('/dashboard')
    } catch (e) {
      setServerErrors(e.response.data.errors)
    }
  }





  return (
    <div>
      {message && <b> {message} </b>}

      <h1> Login</h1>
      {serverErrors.length > 0 && (
        <div>
          <h3>These errors prohibitted the form from being saved: </h3>
          <ul>
            {serverErrors.map((ele, i) => {
              return <li key={i}>{ele.msg}</li>
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} >
        <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='enter email' /><br />
        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='enter password' /><br />
        <input type='submit' value='login' /> <br />

      </form>
      not registered? <Link to='/register' > <b>  Registerhere</b></Link>

      <Routes>
        <Route path='/register' Component={Register} ></Route>
      </Routes>

    </div >
  )
}

export default Login