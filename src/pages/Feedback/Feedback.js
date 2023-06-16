import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import ContentTableComponent from "../../components/ContentTableComponent"
import toast from 'react-hot-toast'
import { URLi } from "../../App"
import { PostMutation, GetQuery } from "../../hooks/queries"
import ErrorPage from '../ErrorPage/ErrorPage'
import Loading from '../../components/Loading'

const Feedback = () => {
    const { mutate: addFeedbackOnClick } = PostMutation({ key: 'FeedbackList', shouldNavigate: false, success: 'Feedback Sent', error: 'Feedback Error' })
    const { data: feedbackList, isError: feedbackListIsError, isLoading: feedbackListIsLoading } = GetQuery({ key: 'FeedbackList', url: `${URLi}/get/feedback` })
    const submitFeedback = (e) => {
        e.preventDefault()
        if (!e.target.feedback.value) return toast.error('All fields are required')
        addFeedbackOnClick({ url: `${URLi}/feedback`, data: { feedback: e.target.feedback.value } })
        e.target.feedback.value = ""
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Feedback',
            selector: row => row.feedback
        },
        {
            name: 'Reply',
            selector: row => row.reply
        },
        {
            name: 'Created At',
            selector: row => row.createdAt
        }
    ]
    let count = 1
    const newData = feedbackList?.data?.result.map((e) => {
        const dateNotify = e.createdAt.slice(0, 19).replace('T', ' ')
        let resultObj = {
            id: count,
            feedback: e.feedback,
            reply: e.reply,
            createdAt: dateNotify
        }
        count++
        return resultObj
    })

    return (
        <>
            <form onSubmit={submitFeedback}>
                <ContentComponent contentTitle='Add Feedback'>
                    <div className='d-flex flex-column mt-3 mb-3'>
                        <label>Feedback:</label>
                        <textarea rows='5' cols='5' name="feedback" required maxLength='256'></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Submit Feedback</button>
                </ContentComponent>
            </form>
            <br></br>
            <ContentComponent contentTitle='Feedback History'>
                {feedbackListIsLoading ? <Loading /> : feedbackListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
            </ContentComponent>
        </>
    )
}

export default Feedback