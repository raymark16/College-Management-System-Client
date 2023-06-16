
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { PostMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import ContentFormComponent from '../../components/ContentFormComponent'
import { useState, useRef } from 'react'
import { Modal } from 'antd';
import useAuth from '../../hooks/useAuth'

const NotifyStudent = () => {
    const { userInfo } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputNotificationValue, setInputNotificationValue] = useState("");
    const [studentUuid, setStudentUuid] = useState("");
    const { mutate: notifyStudentOnClick } = PostMutation({ key: 'Notification', shouldNavigate: false, success: 'Notify Successfully', error: 'Notify Error' })
    const handleOk = () => {
        notifyStudentOnClick({ url: `${URLi}/student/notify`, data: { receiverUuid: studentUuid, senderUuid: userInfo?.uuid, notification_desc: inputNotificationValue } })
        setInputNotificationValue('')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setInputNotificationValue('')
        setIsModalOpen(false);
    };
    const { data: studentList, isError: studentListIsError, isLoading: studentListIsLoading } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })


    const notifyStudent = (uuid) => {
        setStudentUuid(uuid)
        setIsModalOpen(true);
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Full Name',
            selector: row => row.full_name
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Gender',
            selector: row => row.gender
        },
        {
            name: 'Course',
            selector: row => row.course_name
        },
        {
            name: 'Avatar',
            selector: row => row.avatar
        },
        {
            name: 'Actions',
            selector: row => row.actions
        },
    ]
    let count = 1
    const newData = studentList?.data?.result.map((e) => {
        const profileImg = `${URLi}/Uploads/${e.profilePicture}`
        const action =
            <div key={e.uuid}>
                <button onClick={() => notifyStudent(e.uuid)}>Send Notification</button>
            </div>
        const avatar = <img src={profileImg} className='rounded-circle me-1' width='40px' height='40px' alt='profile pic'></img>
        let resultObj = {
            id: count,
            full_name: `${e.lastname}, ${e.firstname}`,
            email: e.email,
            gender: e.gender,
            course_name: e.course,
            avatar: avatar,
            actions: action
        }
        count++
        return resultObj
    })
    return (
        <>
            <ContentComponent contentTitle='Send Notifications to Student'>
                {studentListIsLoading ? <Loading /> : studentListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
            </ContentComponent>
            <Modal title='Send Notification' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ContentFormComponent name='inputStudentNotification' value={inputNotificationValue} changeValue={(e) => setInputNotificationValue(e.target.value)} type='text' classname='updateInput' />
            </Modal>
        </>
    )
}

export default NotifyStudent