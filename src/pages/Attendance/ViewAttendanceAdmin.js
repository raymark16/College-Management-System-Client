import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { GetQuery } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const ViewAttendanceAdmin = () => {
    const { userInfo } = useAuth()
    const [courseData, setCourseData] = useState({})
    const [attendanceDetails, setAttendanceDetails] = useState({})
    const [fetchAttendanceClicked, setFetchAttendanceClicked] = useState(false)
    const [fetchAttendanceDetails, setFetchAttendanceDetails] = useState([])
    const [studentAttendance, setStudentAttendance] = useState([])

    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: studentList } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const { data: attendanceList } = GetQuery({ key: 'AttendanceList', url: `${URLi}/admin/get/attendance` })
    const submitFetchAttendance = (e) => {
        e.preventDefault()
        if (e.target.select_subject.value === '----' || e.target.select_session.value === '----') return toast.error('Fields are all required')
        setAttendanceDetails({})
        setCourseData({})
        let course = "";
        const subjectSelected = subjectList?.data?.result.map((s) => {
            if (s.subject_name === e.target.select_subject.value) {
                setCourseData({ course: s.course })
                course = s.course
            }
        })
        setAttendanceDetails({ subject: e.target.select_subject.value, session: e.target.select_session.value })
        setFetchAttendanceDetails([])
        const attendanceFilteredDate = attendanceList?.data?.result.map((item) => {
            if (course === item.course && item.subject === e.target.select_subject.value && item.session === e.target.select_session.value) {
                setFetchAttendanceDetails(prev => [...prev, item])
            }
        })
        setFetchAttendanceClicked(true)
    }

    const submitFetchStudents = (e) => {
        e.preventDefault()
        if (e.target.select_date.value === '----') return toast.error('Fields are all required')
        let includeInAttendance
        const fetchStudent = fetchAttendanceDetails?.map((item) => {
            if (item.date === e.target.select_date.value) {
                includeInAttendance = {
                    absentStudents: item?.absentStudents,
                    presentStudents: item?.presentStudents
                }
            }
        })
        let emailInAbsent = includeInAttendance?.absentStudents?.split(';')
        let emailInPresent = includeInAttendance?.presentStudents?.split(';')
        setStudentAttendance([])
        const fetchStudentDetails = studentList?.data?.result.map((item) => {
            if (item.course === courseData.course && item.session === attendanceDetails.session) {
                if (emailInAbsent.includes(item.email)) {
                    setStudentAttendance(prev => [...prev, { status: "Absent", studentUuid: item.uuid, fullName: `${item.lastname}, ${item.firstname}` }])
                } else if (emailInPresent.includes(item.email)) {
                    setStudentAttendance(prev => [...prev, { status: "Present", studentUuid: item.uuid, fullName: `${item.lastname}, ${item.firstname}` }])
                }
            }
        })
    }
    return (

        <ContentComponent contentTitle='View Attendance'>
            <form onSubmit={submitFetchAttendance}>
                <div className="d-flex flex-column mb-3">
                    <label>Subject:</label>
                    <select name='select_subject' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {subjectList?.data?.result.map((e) => {
                            return (
                                <option key={e.subject_name} defaultValue={e.subject_name}>{e.subject_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="d-flex flex-column mb-3">
                    <label>Session:</label>
                    <select name='select_session' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {sessionList?.data?.result.map((e) => {
                            return (
                                <option key={e.uuid} defaultValue={`From ${e.start_year} to ${e.end_year}`}>{`From ${e.start_year} to ${e.end_year}`}</option>
                            )
                        })}
                    </select>
                </div>

                <button type='submit' className='btn btn-primary w-100 mb-3'>Fetch Attendance</button>
            </form>
            {fetchAttendanceClicked && (
                <form onSubmit={submitFetchStudents}>
                    <div className="d-flex flex-column mb-3">
                        <label>Attendance Date:</label>
                        <select name='select_date' className='updateInput'>
                            <option defaultValue='----'>----</option>
                            {fetchAttendanceDetails?.map((e) => {
                                return (
                                    <option key={e.uuid}>{e.date}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Fetch Students</button>
                </form>
            )}
            {studentAttendance.length != 0 && (
                <div className="d-flex flex-wrap">
                    {studentAttendance?.sort((a, b) => {
                        let x = a.status.toLowerCase()
                        let y = b.status.toLowerCase()
                        if (x < y) return -1
                        if (x > y) return 1
                        return 0
                    }).map((e) => {
                        return (
                            <div key={e.studentUuid} style={{ flex: '0 24%' }} className={`ms-2 mt-1 rounded ${e.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                                <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                                    <h4 className='text-white font-weight-bold'>{e.fullName}</h4>
                                    <h5 className='text-white'>{e.status}</h5>
                                </div>
                            </div>

                        )
                    })}
                </div>
            )}
        </ContentComponent>


    )
}

export default ViewAttendanceAdmin