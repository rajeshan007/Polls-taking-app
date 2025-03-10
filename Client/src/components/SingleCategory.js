import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import axios from '../config/axios'
import { CategoriesContext } from '../App'
import PollList from './PollList'

const SingleCategory = () => {
    const { categoriesDispatch, categoriesState } = useContext(CategoriesContext)
    const { name } = useParams()
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/polls/category/${name}`)
                categoriesDispatch({ type: 'SET_SELECTED_POLLS', payload: response.data })
            } catch (e) {
                console.log(e);
            }


        })()
    }, [])

    useEffect(() => {
        return () => {
            categoriesDispatch({ type: 'CLEAR_SELECTED_POLLS' })
        }
    }, [])


    return (
        <div>
            <h2> selected category -  {name}</h2>
            <h3> Total polls-  {categoriesState.selectedPolls.length} </h3>
            <PollList polls={categoriesState.selectedPolls} />


        </div>
    )

}

export default SingleCategory