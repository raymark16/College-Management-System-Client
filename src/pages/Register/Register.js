import styles from './Register.module.css'
import FormComponent from '../../components/FormComponent'
import toast from 'react-hot-toast'
import axios from 'axios'
import { URLi } from '../../App'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const [userPicture, setUserPicture] = useState('')
    const RegisterUser = async (e) => {
        e.preventDefault()
        if (!e.target.firstname.value || !e.target.lastname.value || !e.target.email.value || !e.target.gender.value || !e.target.password.value || !e.target.address.value || userPicture === '') return toast.error('Fields are all required')
        try {
            const formData = new FormData()
            formData.append('firstname', e.target.firstname.value)
            formData.append('lastname', e.target.lastname.value)
            formData.append('email', e.target.email.value)
            formData.append('gender', e.target.gender.value)
            formData.append('password', e.target.password.value)
            formData.append('profilePicture', userPicture)
            formData.append('address', e.target.address.value)
            formData.append('role', 'Admin')
            await axios.post(`${URLi}/auth/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Registration Success')
            navigate('/login')
        } catch (err) {
            toast.error('Registration failed')
        }
    }

    return (
        <center className={styles.container2}>
            <h2 className={styles.title_page}>Register</h2>
            <form onSubmit={RegisterUser}>
                <FormComponent classTitle={styles.firstname} name='firstname' placeholder='Firstname' type='text' />
                <br />
                <FormComponent classTitle={styles.lastname} name='lastname' placeholder='Lastname' type='text' />
                <br />
                <FormComponent classTitle={styles.email} name='email' placeholder='Email' type='email' />
                <br />
                <FormComponent classTitle={styles.gender} name='gender' placeholder='Gender' type='text' />
                <br />
                <FormComponent classTitle={styles.password} name='password' placeholder='Password' type='password' />
                <br />
                <FormComponent classTitle={styles.profilePicture} accept='.png, .jpg, .jpeg' changeValue={(e) => {
                    setUserPicture(e.target.files[0])
                }} name='profilePicture' placeholder='Profile Picture' type='file' />
                <br />
                <br />
                <textarea rows='4' cols='47' className={styles.address} required maxLength='256' name='address' placeholder='address'></textarea>
                <br />
                <button type='submit' className={styles.animated} >Register</button>
                <a href="/login" className={styles.link_to_login}>Already have an account?</a>
            </form>

        </center>
    )
}

export default Register