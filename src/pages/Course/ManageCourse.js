
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { DeleteMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom'

const ManageCourse = () => {
    const navigate = useNavigate()
    const { data: courseList, isError: courseListIsError, isLoading: courseListIsLoading } = GetQuery({ key: 'CourseList', url: `${URLi}/course/manage` })

    const { mutate: deleteCourseOnClick } = DeleteMutation({ key: 'CourseList', success: 'Delete Course Successful', error: 'Delete Course Error' })
    const deleteCourse = (course) => {
        deleteCourseOnClick({ url: `${URLi}/course/manage/delete_course/${course}` })
    }

    const editCourse = (uuid) => {
        navigate(`/course/manage/edit_course/${uuid}`)
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Course',
            selector: row => row.course_name
        },
        {
            name: 'Actions',
            selector: row => row.actions
        },
    ]
    let count = 1
    const newData = courseList?.data?.result.map((e) => {
        const action =
            <div key={e.uuid}>
                <button onClick={() => editCourse(e.uuid)}>Edit</button>
                <button onClick={() => deleteCourse(e.course_name)}>Delete</button>
            </div>
        let resultObj = {
            id: count,
            course_name: e.course_name,
            actions: action
        }
        count++
        return resultObj
    })

    return (
        <ContentComponent contentTitle='Manage Course'>
            {courseListIsLoading ? <Loading /> : courseListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ManageCourse