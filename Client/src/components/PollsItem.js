import { Link } from "react-router-dom"

function PollsItem(props) {
    const { _id, question, category, } = props


    return (
        <div>
            <li>
                <Link to={`/polls/${_id}`}>{question}</Link> - <b><Link to={`/polls/category/${category?.name}`}>{category?.name}</Link></b>
                
            </li>

        </div>
    )
}

export default PollsItem