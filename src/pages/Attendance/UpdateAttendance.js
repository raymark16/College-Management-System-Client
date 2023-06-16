import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { EditMutation, GetQuery } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const UpdateAttendance = () => {
    const { userInfo } = useAuth()
    const [attendanceDate, setAttendanceDate] = useState("")
    const [attendanceDetails, setAttendanceDetails] = useState("")
    const [attendanceData, setAttendanceData] = useState({ subject: "", session: "" })
    const [attendanceDateInput, setAttendanceDateInput] = useState("")

    const { mutate: updateAttendanceOnClick } = EditMutation({ key: 'AttendanceList', shouldNavigate: false, success: 'Update Attendance Successful', error: 'Update Attendance Error' })
    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: studentList } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const { data: attendanceList } = GetQuery({ key: 'AttendanceList', url: `${URLi}/get/attendance` })

    const submitTakeAttendance = (e) => {
        e.preventDefault()
        if (e.target.select_subject.value === '----' || e.target.select_session.value === '----') return toast.error('Fields are all required')
        setAttendanceDate("")
        const fetchAttendance = attendanceList?.data?.result.map((list) => {
            if (list.subject === e.target.select_subject.value && list.session === e.target.select_session.value && list.staff === userInfo.email) {
                setAttendanceDate(attendance => [...attendance, { uuid: list.uuid, date: list.date }])
            }
        })
        setAttendanceData({ subject: e.target.select_subject.value, session: e.target.select_session.value })
        setAttendanceDetails('')
    }
    const submitAttendanceDate = (e) => {
        e.preventDefault()
        if (e.target.select_date.value === '----') return toast.error('Fields are all required')
        setAttendanceDetails("")
        setAttendanceDateInput(e.target.select_date.value)
        const fetchAttendanceDetails = attendanceList?.data?.result.map((list) => {
            if (list.date === e.target.select_date.value && list.subject === attendanceData.subject && list.session === attendanceData.session && list.staff === userInfo.email) {
                setAttendanceDetails(attendance => [...attendance, list])
            }
        })
    }
    const updateAttendance = (e) => {
        e.preventDefault()
        let studentData = []
        let absentStudentsEmail = ""
        let presentStudentsEmail = ""
        for (let i = 0; i < e.target.length - 1; i++) {
            studentData.push({ attendanceStatus: e.target[i].checked, studentEmail: e.target[i].getAttribute('data-student') })
        }
        const studentMap = studentData.map((data) => {
            if (data.attendanceStatus) {
                presentStudentsEmail += `${data.studentEmail};`
            } else if (!data.attendanceStatus) {
                absentStudentsEmail += `${data.studentEmail};`
            }
        })
        updateAttendanceOnClick({ url: `${URLi}/update/attendance`, data: { date: attendanceDateInput, course: userInfo.course, staff: userInfo.email, session: attendanceData.session, subject: attendanceData.subject, absentStudents: absentStudentsEmail.slice(0, -1), presentStudents: presentStudentsEmail.slice(0, -1) } })
        setAttendanceDetails('')
    }
    const getStudDetails = () => {
        let absentStudents = []
        let presentStudents = []
        const absentStudentsArr = attendanceDetails?.map((e) => {
            absentStudents = e.absentStudents?.split(';')
            presentStudents = e.presentStudents?.split(';')
        })

        const absentStudentData = studentList?.data?.result.filter((list) => {
            return absentStudents.includes(list.email)
        })
        const presentStudentData = studentList?.data?.result.filter((list) => {
            return presentStudents.includes(list.email)
        })

        return { absentStudentData, presentStudentData }

    }

    return (

        <ContentComponent contentTitle='Update Attendance'>
            <form onSubmit={submitTakeAttendance}>
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
            {attendanceDate !== "" && (
                <form onSubmit={submitAttendanceDate}>
                    <div className="d-flex flex-column mb-3">
                        <label>Attendance Date:</label>
                        <select name='select_date' className='updateInput'>
                            <option defaultValue='----'>----</option>
                            {attendanceDate?.map((e) => {
                                return (
                                    <option key={e.uuid}>{e.date}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Fetch Students</button>
                </form>
            )}
            {attendanceDetails !== "" && (
                <form onSubmit={updateAttendance}>
                    <div className="d-flex justify-content-around">
                        <div className="d-flex flex-column mb-3">
                            <h1>Absent</h1>
                            <div>
                                {getStudDetails().absentStudentData.map((e) => {
                                    return (
                                        <div key={e.uuid} >
                                            <input className='updateInput me-1' autoComplete='off' type='checkbox' data-student={e.email} />
                                            <label>{`${e.firstname} ${e.lastname}`}</label>
                                        </div>

                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-3">
                            <h1>Present</h1>
                            <div>
                                {getStudDetails().presentStudentData.map((e) => {
                                    return (
                                        <div key={e.uuid} >
                                            <input className='updateInput me-1' autoComplete='off' type='checkbox' defaultChecked data-student={e.email} />
                                            <label>{`${e.firstname} ${e.lastname}`}</label>
                                        </div>

                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Save Attendance</button>
                </form>
            )}
        </ContentComponent>


    )
}

export default UpdateAttendance