import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import { useState } from "react"
import { PostMutation, GetQuery } from "../../hooks/queries"
import toast from 'react-hot-toast'
import { URLi } from "../../App"

const AddStudent = () => {

    const [studentPicture, setStudentPicture] = useState('')
    const { mutate: addStudentOnClick } = PostMutation({ key: 'StudentList', shouldNavigate: true, navigate: '/student/manage', success: 'Add Student Successfully', error: 'Add Student Error' })
    const { data: courseList } = GetQuery({ key: 'CourseList', url: `${URLi}/course/manage` })
    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const submitAddStudent = (e) => {
        e.preventDefault()
        if (!e.target.student_firstname.value || !e.target.student_lastname.value || !e.target.student_email.value || !e.target.student_gender.value || !e.target.student_password.value || !e.target.student_address.value || studentPicture === '' || e.target.select_course.value === '----' || e.target.select_session.value === '----') return toast.error('Fields are all required')
        const formData = new FormData()
        formData.append('firstname', e.target.student_firstname.value)
        formData.append('lastname', e.target.student_lastname.value)
        formData.append('email', e.target.student_email.value)
        formData.append('gender', e.target.student_gender.value)
        formData.append('password', e.target.student_password.value)
        formData.append('profilePicture', studentPicture)
        formData.append('address', e.target.student_address.value)
        formData.append('course', e.target.select_course.value)
        formData.append('session', e.target.select_session.value)
        formData.append('role', 'Student')
        addStudentOnClick({ url: `${URLi}/student/add`, data: formData })

    }
    return (
        <form onSubmit={submitAddStudent} encType='multipart/form-data'>
            <ContentComponent contentTitle='Add Student'>
                <ContentFormComponent label='First name:' name='student_firstname' type='text' className='updateInput' />
                <ContentFormComponent label='Last name:' name='student_lastname' type='text' className='updateInput' />
                <ContentFormComponent label='Email:' name='student_email' type='email' className='updateInput' />
                <ContentFormComponent label='Gender:' name='student_gender' type='text' className='updateInput' />
                <ContentFormComponent label='Password:' name='student_password' type='password' className='updateInput' />
                <ContentFormComponent label='Profile picture:' name='student_profile_pic' type='file' accept='.png, .jpg, .jpeg' changeValue={(e) => {
                    setStudentPicture(e.target.files[0])
                }} className='updateInput' />
                <div className="d-flex flex-column mb-3">
                    <label>Address:</label>
                    <textarea rows='4' cols='47' required maxLength='256' name='student_address' ></textarea>
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
                <div className="d-flex flex-column mb-3">
                    <label>Session:</label>
                    <select name='select_session' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {sessionList?.data?.result.map((e) => {
                            return (
                                <option key={e.uuid} defaultValue={`From ${e.start_year} to ${e.end_year}`}>{`From ${e.start_year} to ${e.end_year}`}</option>
                            )
                        })}
                    </select>
                </div>
                <button type='submit' className='btn btn-primary w-100'>Add Student</button>
            </ContentComponent>
        </form>
    )
}
export default AddStudent