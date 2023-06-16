import { useParams } from 'react-router-dom'
import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import { EditMutation } from "../../hooks/queries"
import toast from 'react-hot-toast'
import { URLi } from "../../App"

const EditCourse = () => {
    let { uuid } = useParams()
    const { mutate: editCourseOnClick } = EditMutation({ key: 'CourseList', shouldNavigate: true, navigate: '/course/manage', success: 'Edit Course Successfully', error: 'Edit Course Error' })

    const submitEditCourse = (e) => {
        e.preventDefault()
        if (!e.target.course_name.value) return toast.error('Course field is empty')

        editCourseOnClick({ url: `${URLi}/course/manage/edit_course/${uuid}`, data: { course_name: e.target.course_name.value } })
    }
    return (
        <form onSubmit={submitEditCourse} >
            <ContentComponent contentTitle='Add Course'>
                <ContentFormComponent label='Course Name:' name='course_name' type='text' classname='updateInput' />

                <button type='submit' className='btn btn-primary w-100'>Add Course</button>
            </ContentComponent>
        </form>
    )
}

export default EditCourse