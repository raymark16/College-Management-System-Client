import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { URLi } from "../../App"
import { useState } from "react"
const UpdateProfile = () => {
    const { userInfo, verifyAuth } = useAuth()
    const [updatePicture, setUpdatePicture] = useState('')
    const submitUpdatedProfile = async (e) => {
        e.preventDefault()
        if (!e.target.firstname.value || !e.target.lastname.value || !e.target.email.value || !e.target.gender.value || !e.target.address.value || updatePicture === '') return toast.error('Fields are all required')
        try {
            const formData = new FormData()
            formData.append('firstname', e.target.firstname.value)
            formData.append('lastname', e.target.lastname.value)
            formData.append('email', e.target.email.value)
            formData.append('gender', e.target.gender.value)
            formData.append('profilePicture', updatePicture)
            formData.append('address', e.target.address.value)
            formData.append('prevEmail', userInfo?.email)
            formData.append('prevPicture', userInfo?.profilePicture)
            formData.append('role', userInfo?.role)
            await axios.patch(`${URLi}/update_profile/update_basic_info`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            await axios.get(`${URLi}/auth/logout`)
            verifyAuth()
            toast.success('Updated User, Log In again due to changes')

        } catch (error) {
            toast.error('Update Profile Failed')

        }
    }
    return (
        <>
            <form onSubmit={submitUpdatedProfile}>
                <ContentComponent contentTitle='Update Basic Information'>
                    <ContentFormComponent label='First name:' name='firstname' type='text' classname='updateInput' />
                    <ContentFormComponent label='Last name:' name='lastname' type='text' classname='updateInput' />
                    <ContentFormComponent label='Email:' name='email' type='email' classname='updateInput' />
                    <ContentFormComponent label='Gender:' name='gender' type='text' classname='updateInput' />
                    <ContentFormComponent label='Profile picture:' accept='.png, .jpg, .jpeg' name='profilePic' changeValue={(e) => {
                        setUpdatePicture(e.target.files[0])
                    }} type='file' classname='updateInput' />
                    <div className='d-flex flex-column mt-3 mb-3'>
                        <label>Address:</label>
                        <textarea rows='5' cols='5' name="address" required maxLength='256'></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Update Profile</button>
                </ContentComponent>
            </form>
        </>
    )
}

export default UpdateProfile