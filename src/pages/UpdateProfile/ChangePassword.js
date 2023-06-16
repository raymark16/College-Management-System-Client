import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import axios from "axios"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import useAuth from "../../hooks/useAuth"
const ChangePassword = () => {
    const { userInfo, verifyAuth } = useAuth()
    const submitChangePassword = async (e) => {
        e.preventDefault()
        if (!e.target.password.value || !e.target.new_password.value || !e.target.re_enter_new_password.value) return toast.error('All fields are required')
        if (e.target.new_password.value !== e.target.re_enter_new_password.value) return toast.error("Password doesn't match")
        const userPassword = {
            password: e.target.password.value,
            new_password: e.target.new_password.value,
            email: userInfo.email
        }
        try {
            await axios.patch(`${URLi}/update_profile/change_password`, userPassword)
            await axios.get(`${URLi}/auth/logout`)
            verifyAuth()
            toast.success('New Password has been set, Log in again')
        } catch (error) {
            toast.error('Wrong password')
        }
    }
    return (
        <form onSubmit={submitChangePassword}>
            <ContentComponent contentTitle='Change Password'>
                <ContentFormComponent label='Enter password:' name='password' type='password' classname='updateInput' />
                <ContentFormComponent label='Enter new password:' name='new_password' type='password' classname='updateInput' />
                <ContentFormComponent label='Re-enter new password:' name='re_enter_new_password' type='password' classname='updateInput' />

                <button type='submit' className='btn btn-primary w-100'>Change Password</button>
            </ContentComponent>
        </form>
    )
}

export default ChangePassword