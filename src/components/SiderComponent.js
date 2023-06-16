import { Layout } from 'antd';
import MenuComponent from './MenuComponent';
import { useState } from 'react';
import { URLi } from '../App';
import useAuth from '../hooks/useAuth';
const { Sider } = Layout;

const SiderComponent = () => {
    const { userInfo } = useAuth()
    const [collapsed, setCollapsed] = useState(false);
    const profileImg = `${URLi}/Uploads/${userInfo?.profilePicture}`
    const UserSection = () => {
        return (
            <div className='d-flex'>
                <img src={profileImg} className='rounded-circle me-1' width='30px' height='30px' alt='profile pic'></img>
                <h5>{userInfo?.lastname}, {userInfo?.firstname}</h5>
            </div>
        )
    }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div
                style={{
                    height: 50,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
            >{collapsed ? <img src={profileImg} className='rounded-circle' width='30px' height='30px' alt='profile pic'></img> : <UserSection />}</div>
            <MenuComponent />
        </Sider>
    )
}

export default SiderComponent