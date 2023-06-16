import FormComponent from '../../components/FormComponent'
import axios from 'axios'
import toast from 'react-hot-toast'
import styles from './Login.module.css'
import { URLi } from '../../App'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const Login = () => {
    const { verifyAuth } = useAuth()
    const loginUser = async (e) => {
        e.preventDefault()
        if (!e.target.email.value || !e.target.password.value) return toast.error('Fields are all required')
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        try {
            const result = await axios.post(`${URLi}/auth/login`, user)
            verifyAuth()
            toast.success('Login Success')
        } catch (error) {
            console.log(error)
            toast.error('Login Failed')
        }
    }
    return (
        <center className={styles.container2}>
            <h2 className={styles.title_page}>Login</h2>

            <form onSubmit={loginUser}>
                <FormComponent classTitle={styles.email} name='email' placeholder='Email' type='email' />
                <br />
                <FormComponent classTitle={styles.password} name='password' placeholder='Password' type='password' />
                <br />
                <button type='submit' className={styles.animated} >Login</button>
                <a href="/register" className={styles.link_to_login}>Don't have an account?</a>
            </form>
        </center>
    )
}

export default Login