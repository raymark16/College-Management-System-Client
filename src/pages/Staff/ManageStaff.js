
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { DeleteMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom'
const ManageStaff = () => {
    const navigate = useNavigate()
    const { data: staffList, isError: staffListIsError, isLoading: staffListIsLoading } = GetQuery({ key: 'UserList', url: `${URLi}/staff/manage` })
    const { mutate: deleteStaffOnClick } = DeleteMutation({ key: 'UserList', success: 'Delete Staff Successfully', error: 'Delete Staff Error' })
    const deleteStaff = (uuid) => {
        deleteStaffOnClick({ url: `${URLi}/staff/manage/delete_staff/${uuid}` })
    }
    const editStaff = (uuid) => {
        navigate(`/staff/manage/edit_staff/${uuid}`)
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
                <button onClick={() => editStaff(e.uuid)}>Edit</button>
                <button onClick={() => deleteStaff(e.uuid)}>Delete</button>
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
        <ContentComponent contentTitle='Manage Staff'>
            {staffListIsLoading ? <Loading /> : staffListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ManageStaff