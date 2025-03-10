import { useState, } from 'react'
import { useNavigate, Link, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

const Register = (props) => {

  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverErrors, setServerErrors] = useState([])


  const handleChange = (e) => {
    const name = e.target.name
    if (name === 'username') {
      setUserName(e.target.value)
    } else if (name === 'email') {
      setEmail(e.target.value)
    } else if (name === 'password') {
      setPassword(e.target.value)
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      username: username,
      email: email,
      password: password
    }
    try {
      const response = await axios.post('http://localhost:6004/api/users/register', formData)
      navigate('/login', { state: { message: response.data.message } })

    } catch (e) {
      setServerErrors(e.response.data.errors)
    }

  }

  return (
    <div>
      <h1>Register</h1>
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
        <input type='text' value={username} onChange={handleChange} placeholder='enter username' name="username" /> <br /> {' '}
        <input type='text' value={email} onChange={handleChange} placeholder='enter email' name="email" /> <br />
        <input type="password" value={password} onChange={handleChange} placeholder='enter password' name="password" /> <br />
        <input type="submit" value='register' /> <br />

      </form>
      if already registered <b> <Link to='/login'>login</Link></b>
      <Routes>
        <Route path='/login' Component={Login} ></Route>
      </Routes>
    </div>
  )
}

export default Register