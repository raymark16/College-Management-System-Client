import ContentComponent from "./ContentComponent"
import ContentTableComponent from "./ContentTableComponent"
import toast from 'react-hot-toast'
import { URLi } from "../App"
import { GetQuery, EditMutation } from "../hooks/queries"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import Loading from "./Loading"
import { useState } from "react"
import { Modal } from 'antd';
const LeaveApplication = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputReplyValue, setInputReplyValue] = useState("");
    const [leaveUuid, setLeaveUuid] = useState("");
    const { mutate: updateLeaveOnClick } = EditMutation({ key: 'LeaveList', shouldNavigate: false, success: 'Leave Updated', error: 'Leave Error' })
    const { data: leaveList, isError: leaveListIsError, isLoading: leaveListIsLoading } = GetQuery({ key: 'LeaveList', url: `${URLi}/get/admin/leave` })
    const { data: UserList } = GetQuery({ key: props.keyList, url: props.urlList })
    const replyToUser = (uuid) => {
        setLeaveUuid(uuid)
        setIsModalOpen(true);
    }
    const handleOk = () => {
        if (!inputReplyValue) return toast.error('Fields are all required')
        updateLeaveOnClick({ url: `${URLi}/update/leave`, data: { uuid: leaveUuid, status: inputReplyValue } })
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
            name: props.user,
            selector: row => row.user
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
            name: 'Status',
            selector: row => row.status
        },
        {
            name: 'Action',
            selector: row => row.action
        }
    ]

    const dataFunc = () => {
        let count = 1
        let data = []
        const newData = leaveList?.data?.result.map((e) => {
            UserList?.data?.result.map((list) => {
                if (list.uuid === e.userUuid) {
                    data.push({ userUuid: e.uuid, user: `${list.lastname}, ${list.firstname}`, course: list.course, message: e.message, leaveDate: e.date, sentOn: e.createdAt, status: e.status })
                }
            })
        })
        const userData = data?.map((e) => {
            let resultObj = {
                id: count,
                user: e.user,
                course: e.course,
                message: e.message,
                leaveDate: e.leaveDate,
                sentOn: e.sentOn.slice(0, 19).replace('T', ' '),
                status: e.status,
                action: <button className='btn btn-primary w-100' onClick={() => replyToUser(e.userUuid)}>Reply</button>
            }
            count++
            return resultObj
        })
        return userData
    }



    return (
        <>
            <ContentComponent contentTitle={props.contentTitle}>
                {leaveListIsLoading ? <Loading /> : leaveListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={dataFunc()} />}
            </ContentComponent>
            <Modal title='Send Reply' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="d-flex flex-column mb-3">
                    <label>Reply:</label>
                    <select name='select_reply' onChange={(e) => setInputReplyValue(e.target.value)} value={inputReplyValue} className='updateInput'>
                        <option>----</option>
                        <option>Approve</option>
                        <option>Reject</option>
                    </select>
                </div>
            </Modal>
        </>
    )
}

export default LeaveApplication