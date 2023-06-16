import { useParams } from 'react-router-dom'
import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import { EditMutation, GetQuery } from "../../hooks/queries"
import toast from 'react-hot-toast'
import { URLi } from "../../App"

const EditSubject = () => {
    let { uuid } = useParams()
    const { data: courseList } = GetQuery({ key: 'CourseList', url: `${URLi}/course/manage` })
    const { data: staffList } = GetQuery({ key: 'UserList', url: `${URLi}/staff/manage` })
    const { mutate: editSubjectOnClick } = EditMutation({ key: 'SubjectList', shouldNavigate: true, navigate: '/subject/manage', success: 'Edit Subject Successfully', error: 'Edit Subject Error' })

    const submitEditSubject = (e) => {
        e.preventDefault()
        if (!e.target.subject_name.value || e.target.select_staff.value === '----' || e.target.select_course.value === '----') return toast.error('Fields are all required')

        editSubjectOnClick({ url: `${URLi}/subject/manage/edit_subject/${uuid}`, data: { subject_name: e.target.subject_name.value, staff: e.target.select_staff.value, course: e.target.select_course.value } })
    }
    return (
        <form onSubmit={submitEditSubject}>
            <ContentComponent contentTitle='Edit Subject'>
                <ContentFormComponent label='Name:' name='subject_name' type='text' classname='updateInput' />
                <div className="d-flex flex-column mb-3">
                    <label>Staff:</label>
                    <select name='select_staff' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {staffList?.data?.result.map((e) => {
                            return (
                                <option key={`${e.lastname} ${e.firstname}`} defaultValue={`${e.lastname} ${e.firstname}`}>{`${e.lastname} ${e.firstname}`}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="d-flex flex-column mb-3">
                    <label>Course:</label>
                    <select name='select_course' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {courseList?.data?.result.map((e) => {
                            return (
                                <option key={e.course_name} defaultValue={e.course_name}>{e.course_name}</option>
                            )
                        })}
                    </select>
                </div>

                <button type='submit' className='btn btn-primary w-100'>Edit Subject</button>
            </ContentComponent>
        </form>
    )
}

export default EditSubject