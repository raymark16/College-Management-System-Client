import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { URLi } from '../App';

const HeaderComponent = () => {
    const { verifyAuth, auth } = useAuth()
    const Logout = async () => {
        await axios.get(`${URLi}/auth/logout`)
        verifyAuth()
        toast.success('Logout successful')
    }
    const classValue = 'navbar-dark bg-dark shadow pt-2 pb-2 ps-5 pe-5 mb-3 d-flex'
    return (
        <nav className={auth && `navbar justify-content-end ${classValue}`}>
            {auth && <button onClick={Logout} className='btn btn-danger'>Logout</button>}
        </nav>
    )
}

export default HeaderComponent