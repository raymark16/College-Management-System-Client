
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { DeleteMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom'
const ManageStudent = () => {
    const navigate = useNavigate()
    const { data: studentList, isError: studentListIsError, isLoading: studentListIsLoading } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const { mutate: deleteStudentOnClick } = DeleteMutation({ key: 'StudentList', success: 'Delete Student Successfully', error: 'Delete Student Error' })
    const deleteStudent = (uuid) => {
        deleteStudentOnClick({ url: `${URLi}/student/manage/delete_student/${uuid}` })
    }
    const editStudent = (uuid) => {
        navigate(`/student/manage/edit_student/${uuid}`)
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
                <button onClick={() => editStudent(e.uuid)}>Edit</button>
                <button onClick={() => deleteStudent(e.uuid)}>Delete</button>
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
        <ContentComponent contentTitle='Manage Student'>
            {studentListIsLoading ? <Loading /> : studentListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ManageStudent