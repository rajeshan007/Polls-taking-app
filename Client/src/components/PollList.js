import PollsItem from "./PollsItem"


const PollList = (props) => {
    const { polls } = props
    return (
        <div>

            <ul>


                {polls.map((ele) => {
                    return <PollsItem key={ele._id}
                        _id={ele._id}
                        question={ele.question}
                        category={ele.categoryId} />
                })}
            </ul>

        </div>
    )
}

export default PollList