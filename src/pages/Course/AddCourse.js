import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { PostMutation } from "../../hooks/queries"

const AddCourse = () => {
    const { mutate: addCourseOnClick } = PostMutation({ key: 'CourseList', shouldNavigate: true, navigate: '/course/manage', success: 'Add Course Successful', error: 'Add Course Error' })
    const submitAddCourse = (e) => {
        e.preventDefault()
        if (!e.target.course_name.value) return toast.error('Course field is empty')
        addCourseOnClick({ url: `${URLi}/course/add`, data: { course_name: e.target.course_name.value } })
    }
    return (
        <form onSubmit={submitAddCourse}>
            <ContentComponent contentTitle='Add Course'>
                <ContentFormComponent label='Course Name:' name='course_name' type='text' classname='updateInput' />

                <button type='submit' className='btn btn-primary w-100'>Add Course</button>
            </ContentComponent>
        </form>
    )
}

export default AddCourse