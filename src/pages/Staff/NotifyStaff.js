
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

const NotifyStaff = () => {
    const { userInfo } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputNotificationValue, setInputNotificationValue] = useState("");
    const [staffUuid, setStaffUuid] = useState("");
    const { mutate: notifyStaffOnClick } = PostMutation({ key: 'Notification', shouldNavigate: false, success: 'Notify Successfully', error: 'Notify Error' })
    const handleOk = () => {
        notifyStaffOnClick({ url: `${URLi}/staff/notify`, data: { receiverUuid: staffUuid, senderUuid: userInfo?.uuid, notification_desc: inputNotificationValue } })
        setInputNotificationValue('')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setInputNotificationValue('')
        setIsModalOpen(false);
    };
    const { data: staffList, isError: staffListIsError, isLoading: staffListIsLoading } = GetQuery({ key: 'UserList', url: `${URLi}/staff/manage` })


    const notifyStaff = (uuid) => {
        setStaffUuid(uuid)
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
    const newData = staffList?.data?.result.map((e) => {
        const profileImg = `${URLi}/Uploads/${e.profilePicture}`
        const action =
            <div key={e.uuid}>
                <button onClick={() => notifyStaff(e.uuid)}>Send Notification</button>
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
            <ContentComponent contentTitle='Send Notifications to Staff'>
                {staffListIsLoading ? <Loading /> : staffListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
            </ContentComponent>
            <Modal title='Send Notification' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ContentFormComponent name='inputStaffNotification' value={inputNotificationValue} changeValue={(e) => setInputNotificationValue(e.target.value)} type='text' classname='updateInput' />
            </Modal>
        </>
    )
}

export default NotifyStaff