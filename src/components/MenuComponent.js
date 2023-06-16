import { Menu } from 'antd';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
const MenuComponent = () => {
    const { userInfo } = useAuth()
    const getItems = (labelItem, keyItem, iconItem, childrenItem) => {
        return { label: labelItem, key: keyItem, icon: iconItem, children: childrenItem }
    }
    const navigate = useNavigate()
    const menuItems = userInfo?.role === 'Admin' ? (
        [getItems('Dashboard', '/', < PieChartOutlined />),
        getItems('Update Profile', 'sub1', < UserOutlined />, [{ label: 'Update Basic Info', key: '/update_profile/update_basic_info' }, { label: 'Change Password', key: '/update_profile/change_password' }]),
        getItems('Course', 'sub2', < UserOutlined />, [{ label: 'Add Course', key: '/course/add' }, { label: 'Manage Course', key: '/course/manage' }]),
        getItems('Subject', 'sub3', < UserOutlined />, [{ label: 'Add Subject', key: '/subject/add' }, { label: 'Manage Subject', key: '/subject/manage' }]),
        getItems('Session', 'sub4', < UserOutlined />, [{ label: 'Add Session', key: '/session/add' }, { label: 'Manage Session', key: '/session/manage' }]),
        getItems('Staff', 'sub5', < UserOutlined />, [getItems('Add Staff', '/staff/add'), getItems('Manage Staff', '/staff/manage'), getItems('Notify Staff', '/staff/notify'), getItems('Staff Feedback', '/staff/feedback'), getItems('Staff Leave', '/staff/leave')]),
        getItems('Student', 'sub6', < UserOutlined />, [getItems('Add Student', '/student/add'), getItems('Manage Student', '/student/manage'), getItems('Notify Student', '/student/notify'), getItems('Student Feedback', '/student/feedback'), getItems('Student Leave', 'student/leave')]),
        getItems('View Attendance', '/admin/view/attendance', < UserOutlined />)]) : userInfo?.role === 'Staff' ? (
            [getItems('Dashboard', '/', < PieChartOutlined />),
            getItems('Update Profile', 'sub1', < UserOutlined />, [{ label: 'Update Basic Info', key: '/update_profile/update_basic_info' }, { label: 'Change Password', key: '/update_profile/change_password' }]),
            getItems('Add Result', '/add/result', < UserOutlined />),
            getItems('Edit Result', '/edit/result', < UserOutlined />),
            getItems('Take Attendance', '/take/attendance', < UserOutlined />),
            getItems('Update Attendance', '/update/attendance', < UserOutlined />),
            getItems('View Notifications', '/view/notifications', < UserOutlined />),
            getItems('Apply For Leave', '/apply/leave', < UserOutlined />),
            getItems('Feedback', '/feedback', < UserOutlined />)]
        ) : (
        [getItems('Dashboard', '/', < PieChartOutlined />),
        getItems('Update Profile', 'sub1', < UserOutlined />, [{ label: 'Update Basic Info', key: '/update_profile/update_basic_info' }, { label: 'Change Password', key: '/update_profile/change_password' }]),
        getItems('View Attendance', '/view/attendance', < UserOutlined />),
        getItems('View Notifications', '/view/notifications', < UserOutlined />),
        getItems('Apply For Leave', '/apply/leave', < UserOutlined />),
        getItems('Feedback', '/feedback', < UserOutlined />)])

    return (

        <Menu theme="dark" defaultSelectedKeys={['1']} onClick={({ key }) => navigate(key)} mode="inline" items={menuItems} />
    )
}

export default MenuComponent