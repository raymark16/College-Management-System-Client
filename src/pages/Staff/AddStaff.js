import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import { useState } from "react"
import { PostMutation, GetQuery } from "../../hooks/queries"
import toast from 'react-hot-toast'
import { URLi } from "../../App"

const AddStaff = () => {

    const [staffPicture, setStaffPicture] = useState('')
    const { mutate: addStaffOnClick } = PostMutation({ key: 'UserList', shouldNavigate: true, navigate: '/staff/manage', success: 'Add Staff Successfully', error: 'Add Staff Error' })
    const { data: courseList, isError: courseListIsError, isLoading: courseListIsLoading } = GetQuery({ key: 'CourseList', url: `${URLi}/course/manage` })

    const submitAddStaff = (e) => {
        e.preventDefault()

        if (!e.target.staff_firstname.value || !e.target.staff_lastname.value || !e.target.staff_email.value || !e.target.staff_gender.value || !e.target.staff_password.value || !e.target.staff_address.value || staffPicture === '' || e.target.select_course.value === '----') return toast.error('Fields are all required')
        const formData = new FormData()
        formData.append('firstname', e.target.staff_firstname.value)
        formData.append('lastname', e.target.staff_lastname.value)
        formData.append('email', e.target.staff_email.value)
        formData.append('gender', e.target.staff_gender.value)
        formData.append('password', e.target.staff_password.value)
        formData.append('profilePicture', staffPicture)
        formData.append('address', e.target.staff_address.value)
        formData.append('course', e.target.select_course.value)
        formData.append('role', 'Staff')
        addStaffOnClick({ url: `${URLi}/staff/add`, data: formData })

    }
    return (
        <form onSubmit={submitAddStaff} encType='multipart/form-data'>
            <ContentComponent contentTitle='Add Staff'>
                <ContentFormComponent label='First name:' name='staff_firstname' type='text' className='updateInput' />
                <ContentFormComponent label='Last name:' name='staff_lastname' type='text' className='updateInput' />
                <ContentFormComponent label='Email:' name='staff_email' type='email' className='updateInput' />
                <ContentFormComponent label='Gender:' name='staff_gender' type='text' className='updateInput' />
                <ContentFormComponent label='Password:' name='staff_password' type='password' className='updateInput' />
                <ContentFormComponent label='Profile picture:' name='staff_profile_pic' type='file' accept='.png, .jpg, .jpeg' changeValue={(e) => {
                    setStaffPicture(e.target.files[0])
                }} className='updateInput' />
                <div className="d-flex flex-column mb-3">
                    <label>Address:</label>
                    <textarea rows='4' cols='47' required maxLength='256' name='staff_address' ></textarea>
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
                <button type='submit' className='btn btn-primary w-100'>Add Staff</button>
            </ContentComponent>
        </form>
    )
}
export default AddStaff