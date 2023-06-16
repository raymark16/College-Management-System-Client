import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { GetQuery } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const ViewAttendance = () => {
    const { userInfo } = useAuth()
    const [studentAttendance, setStudentAttendance] = useState([])
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: attendanceList } = GetQuery({ key: 'AttendanceList', url: `${URLi}/student/get/attendance` })
    const fetchAttendanceData = (e) => {
        e.preventDefault()
        if (e.target.select_subject.value === '----' || !e.target.startDate.value || !e.target.endDate.value) return toast.error('Fields are all required')
        setStudentAttendance([])
        const attendanceMap = attendanceList?.data?.result.map((list) => {
            if (userInfo.course === list.course && e.target.select_subject.value === list.subject) {
                let attendance = [];
                let attendanceDate = new Date(list.date)
                let startDate = new Date(e.target.startDate.value)
                let endDate = new Date(e.target.endDate.value)
                if (attendanceDate >= startDate && attendanceDate <= endDate) {
                    attendance.push(list)
                } else {
                    setStudentAttendance([])
                    return toast.error('No attendance at start date and end date')
                }

                const attendanceMap = attendance?.map((item) => {
                    let includeInAttendance;
                    let emailInAbsent = item?.absentStudents?.split(';')
                    let emailInPresent = item?.presentStudents?.split(';')

                    if (emailInAbsent.includes(userInfo.email)) {
                        includeInAttendance = {
                            status: "Absent",
                            email: userInfo.email,
                            date: list.date
                        }
                    } else if (emailInPresent.includes(userInfo.email)) {
                        includeInAttendance = {
                            status: "Present",
                            email: userInfo.email,
                            date: list.date
                        }
                    }
                    setStudentAttendance(prev => [...prev, includeInAttendance])
                })




            }

        })
    }

    return (
        <ContentComponent contentTitle='View Attendance'>
            <form onSubmit={fetchAttendanceData}>
                <div className="d-flex flex-column mb-3">
                    <label>Subject:</label>
                    <select name='select_subject' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {subjectList?.data?.result.map((e) => {
                            if (userInfo.course === e.course) {
                                return (
                                    <option key={e.subject_name} defaultValue={e.subject_name}>{e.subject_name}</option>
                                )
                            }
                        })}
                    </select>
                </div>
                <ContentFormComponent label='Start Date:' name='startDate' type='date' className='updateInput' />
                <ContentFormComponent label='End Date:' name='endDate' type='date' className='updateInput' />
                <button type='submit' className='btn btn-primary w-100 mb-3'>Fetch Attendance Data</button>
            </form>
            {studentAttendance.length != 0 && (
                <div className="d-flex flex-wrap">
                    {studentAttendance?.map((e) => {
                        return (
                            <div key={e.date} style={{ flex: '0 24%' }} className={`ms-2 mt-1 rounded ${e.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                                <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                                    <h4 className='text-white'>{e.date}</h4>
                                    <h4 className='text-white'>{e.status}</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </ContentComponent>


    )
}

export default ViewAttendance