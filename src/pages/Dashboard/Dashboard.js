import ContentComponent from "../../components/ContentComponent"
import useAuth from "../../hooks/useAuth"
import Card from "../../components/Card"
import { GetQuery } from '../../hooks/queries'
import { UserOutlined, PieChartOutlined } from '@ant-design/icons'
import { URLi } from "../../App"
import { useState } from "react"
const Dashboard = () => {
    const { userInfo } = useAuth()
    const { data: studentList } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const { data: staffList } = GetQuery({ key: 'UserList', url: `${URLi}/staff/manage` })
    const { data: courseList } = GetQuery({ key: 'CourseList', url: `${URLi}/course/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: leaveList } = GetQuery({ key: 'LeaveList', url: `${URLi}/get/leave` })
    const { data: attendanceList } = GetQuery({ key: 'AttendanceList', url: `${URLi}/get/attendance` })
    const dataStuds = () => {
        let stud = []
        const data = studentList?.data?.result?.map((e) => {
            if (e.course === userInfo?.course) stud.push(e)
        })
        return stud.length
    }
    const dataSubj = () => {
        let subj = []
        const data = subjectList?.data?.result?.map((e) => {
            if (e.staff === `${userInfo?.lastname} ${userInfo?.firstname}`) subj.push(e)

        })
        return subj.length
    }
    const studSubj = () => {
        let subj = []
        const data = subjectList?.data?.result?.map((e) => {
            if (e.course === userInfo?.course) subj.push(e)

        })
        return subj.length
    }
    return (
        <>
            <ContentComponent contentTitle={userInfo?.role === 'Admin' ? 'Admin Dashboard' : userInfo?.role === 'Staff' ? 'Staff Dashboard' : userInfo?.role === 'Student' ? 'Student Dashboard' : 'Dashboard'}>
                {userInfo?.role === 'Admin' && (
                    <>
                        <div className="d-flex">
                            <Card title='Total Students' data={studentList?.data?.result?.length} color='blue' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Staff' data={staffList?.data?.result?.length} color='green' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Course' data={courseList?.data?.result?.length} color='purple' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Subjects' data={subjectList?.data?.result?.length} color='red' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />
                        </div>
                    </>
                )}
                {userInfo?.role === 'Staff' && (
                    <>
                        <div className="d-flex">
                            <Card title='Total Students' data={dataStuds()} color='blue' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Attendance Taken' data={attendanceList?.data?.result?.length} color='green' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Leave Applied' data={leaveList?.data?.result?.length} color='purple' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />

                            <Card title='Total Subjects' data={dataSubj()} color='red' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />
                        </div>
                    </>
                )}
                {userInfo?.role === 'Student' && (
                    <>
                        <div className="d-flex">
                            <Card title='Total Subject' data={studSubj()} color='red' icon={< UserOutlined style={{ color: 'white', fontSize: 50, padding: 8, marginBottom: '5px' }} />} />
                        </div>
                    </>
                )}
            </ContentComponent>

        </>
    )
}

export default Dashboard