import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import ContentTableComponent from "../../components/ContentTableComponent"
import toast from 'react-hot-toast'
import { URLi } from "../../App"
import { GetQuery, EditMutation } from "../../hooks/queries"
import ErrorPage from '../ErrorPage/ErrorPage'
import Loading from '../../components/Loading'
import { useState } from "react"
import { Modal } from 'antd';
const ViewFeedbackStaff = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputReplyValue, setInputReplyValue] = useState("");
    const [feedbackUuid, setFeedbackUuid] = useState("");
    const { mutate: updateFeedbackOnClick } = EditMutation({ key: 'FeedbackList', shouldNavigate: false, success: 'Feedback Sent', error: 'Feedback Error' })
    const { data: feedbackList, isError: feedbackListIsError, isLoading: feedbackListIsLoading } = GetQuery({ key: 'FeedbackList', url: `${URLi}/get/admin/feedback` })
    const { data: staffList } = GetQuery({ key: 'UserList', url: `${URLi}/staff/manage` })

    const replyToStaff = (uuid) => {
        setFeedbackUuid(uuid)
        setIsModalOpen(true);
    }
    const handleOk = () => {
        if (!inputReplyValue) return toast.error('Fields are all required')
        updateFeedbackOnClick({ url: `${URLi}/update/admin/feedback`, data: { uuid: feedbackUuid, reply: inputReplyValue } })
        setInputReplyValue('')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setInputReplyValue('')
        setIsModalOpen(false);
    };

    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Staff',
            selector: row => row.staff
        },
        {
            name: 'Course',
            selector: row => row.course
        },
        {
            name: 'Message',
            selector: row => row.message
        },
        {
            name: 'Sent On',
            selector: row => row.sentOn
        },
        {
            name: 'Reply',
            selector: row => row.reply
        },
        {
            name: 'Action',
            selector: row => row.action
        }
    ]

    const dataFunc = () => {
        let count = 1
        let data = []
        const newData = feedbackList?.data?.result.map((e) => {
            staffList?.data?.result.map((list) => {
                if (list.uuid === e.senderUuid) {
                    data.push({ feedbackUuid: e.uuid, staff: `${list.lastname}, ${list.firstname}`, course: list.course, message: e.feedback, sentOn: e.createdAt, reply: e.reply })
                }
            })
        })
        const staffData = data?.map((e) => {
            let resultObj = {
                id: count,
                staff: e.staff,
                course: e.course,
                message: e.message,
                sentOn: e.sentOn.slice(0, 19).replace('T', ' '),
                reply: e.reply,
                action: <button className='btn btn-primary w-100' onClick={() => replyToStaff(e.feedbackUuid)}>Reply</button>
            }
            count++
            return resultObj
        })
        return staffData
    }



    return (
        <>
            <ContentComponent contentTitle='Staff Feedback Messages'>
                {feedbackListIsLoading ? <Loading /> : feedbackListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={dataFunc()} />}
            </ContentComponent>
            <Modal title='Send Reply' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ContentFormComponent name='inputStaffNotification' value={inputReplyValue} changeValue={(e) => setInputReplyValue(e.target.value)} type='text' classname='updateInput' />
            </Modal>
        </>
    )
}

export default ViewFeedbackStaff