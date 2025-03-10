import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const NewPoll = () => {
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [endDate, setEndDate] = useState('')
    const [options, setOptions] = useState([])
    //const [serverErrors, setServerErrors] = useState([])


    const { dispatch } = useContext(UserContext)


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:6004/api/categories/list')
                setCategories(response.data)
            } catch (e) {
                //setServerErrors(e.response.data.errors)
                console.log(e.message);

            }

        })()
    }, [])


    const handleAdd = async (e) => {
        e.preventDefault()
        if (categoryName) {
            try {
                const response = await axios.post('http://localhost:6004/api/categories/create', { name: categoryName }, {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                })
                const category = response.data
                setCategories([...categories, category])
                setCategoryId(category._id)
                setCategoryName('')
            } catch (e) {
                // setServerErrors(e.response.data.errors)
                console.log(e.message);

            }
        } else {
            //serverErrors([{ errors: 'category name is required' }])
            console.log(e.message);
        }

    }





    const handleAddOption = (e) => {
        // create a option object and add it to options array
        e.preventDefault()
        const option = {
            optionText: ''
        }
        setOptions([...options, option])
    }

    const handleRemoveOption = (index) => {
        const result = options.filter((ele, i) => {
            return i !== index
        })
        setOptions(result)
    }

    const handleOptionText = (index, value) => {
        const result = options.map((ele, i) => {
            if (i === index) {
                return { ...ele, optionText: value }
            } else {
                return { ...ele }
            }
        })
        setOptions(result)
    }


    const handleSubmit = async (e) => {
        const today = new Date()
        const mydate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        e.preventDefault()
        const formData = {
            question: question,
            categoryId: categoryId,
            createdDate: mydate,
            endDate: endDate,
            options: options

        }
        // console.log(formData);
        const response = await axios.post('http://localhost:6004/api/polls/create', formData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        const poll = response.data
        dispatch({ type: 'ADD_MY_POLL', payload: poll })
        // console.log(response.data);
        setQuestion('')
        setEndDate('')
        setCategoryId('')
        setCategoryName('')
        setOptions([])
        navigate(`/myPolls/${poll._id}`)
    }


    return (
        <div>
            <h2> create poll </h2>


            <form onSubmit={handleSubmit} >

                <label> enter question : </label>
                <input type='text'
                    value={question}
                    onChange={(e) => { setQuestion(e.target.value) }}
                    placeholder='enter question' /> <br /> <br />

                <label> select category :</label>
                <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }} >
                    <option value="" > select category </option>
                    {categories.map((ele) => {
                        return <option key={ele._id} value={ele._id}> {ele.name} </option>
                    })}

                </select>  or
                <input type='text'
                    value={categoryName}
                    onChange={(e) => { setCategoryName(e.target.value) }}
                    placeholder='create a new category' ></input>

                <button onClick={handleAdd} >create category</button>
                <br /> <br />

                <label> end Date : </label>
                <input type='date'
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value) }} /> <br /> <br />

                <label>Add options : </label>
                {options.map((ele, i) => {
                    return (
                        <div key={i}>
                            <input type='text'
                                value={ele.optionText}
                                onChange={(e) => { handleOptionText(i, e.target.value) }}
                                placeholder='enter option' />
                            <button onClick={() => { handleRemoveOption(i) }} >remove</button>
                            <br />
                        </div>
                    )
                })}

                <button onClick={handleAddOption} > add option</button> <br /> <br />

                <input type='submit' value='create poll' />

            </form>
        </div>
    )
}

export default NewPoll