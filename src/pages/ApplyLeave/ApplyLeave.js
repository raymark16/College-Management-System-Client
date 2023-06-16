import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import ContentTableComponent from "../../components/ContentTableComponent"
import toast from 'react-hot-toast'
import { URLi } from "../../App"
import { PostMutation, GetQuery } from "../../hooks/queries"
import ErrorPage from '../ErrorPage/ErrorPage'
import Loading from '../../components/Loading'

const ApplyLeave = () => {
    const { mutate: applyLeaveOnClick } = PostMutation({ key: 'LeaveList', shouldNavigate: false, success: 'Apply Leave Successful', error: 'Apply Leave Error' })
    const { data: leaveList, isError: leaveListIsError, isLoading: leaveListIsLoading } = GetQuery({ key: 'LeaveList', url: `${URLi}/get/leave` })
    const submitLeave = (e) => {
        e.preventDefault()
        if (!e.target.message.value || !e.target.date.value) return toast.error('All fields are required')
        applyLeaveOnClick({ url: `${URLi}/apply/leave`, data: { date: e.target.date.value, message: e.target.message.value } })
        e.target.message.value = ""
        e.target.date.value = ""
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Date',
            selector: row => row.date
        },
        {
            name: 'Message',
            selector: row => row.message
        },
        {
            name: 'Status',
            selector: row => row.status
        }
    ]
    let count = 1
    const newData = leaveList?.data?.result.map((e) => {
        let resultObj = {
            id: count,
            date: e.date,
            message: e.message,
            status: e.status
        }
        count++
        return resultObj
    })

    return (
        <>
            <form onSubmit={submitLeave}>
                <ContentComponent contentTitle='Apply for Leave'>
                    <ContentFormComponent label='Date:' name='date' type='date' classname='updateInput' />
                    <div className='d-flex flex-column mt-3 mb-3'>
                        <label>Message:</label>
                        <textarea rows='5' cols='5' name="message" required maxLength='256'></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Apply Leave</button>
                </ContentComponent>
            </form>
            <br></br>
            <ContentComponent contentTitle='Leave History'>
                {leaveListIsLoading ? <Loading /> : leaveListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
            </ContentComponent>
        </>
    )
}

export default ApplyLeave