import { Link } from 'react-router-dom'
import _ from 'lodash'
import { UserContext } from '../App'
import { useContext } from 'react'

const NavBar = () => {
    const { state, dispatch } = useContext(UserContext)


    const handleLogOut = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER' })


    }

    return (
        <div>
            <nav>
                <li>  <Link to='/' > Home</Link> </li>
                {_.isEmpty(state.user) ? (
                    <>
                        <li>  <Link to='/register'  > Register</Link> </li>
                        <li>  <Link to='/login' > Login</Link> </li>
                    </>
                ) : (
                    <>
                        <li>  <Link to='/dashboard' > dashboard</Link> </li>
                        <li>  <Link to='/polls/createPoll' > create poll</Link> </li>
                        <li><Link to='/polls/mypolls' > my polls </Link></li>
                        <li>  <Link to='/' onClick={handleLogOut} > logout</Link> </li>
                    </>
                )}
            </nav>
        </div>
    )

}

export default NavBar