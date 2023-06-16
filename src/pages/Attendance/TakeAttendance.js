import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { PostMutation, GetQuery } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const TakeAttendance = () => {
    const { userInfo } = useAuth()
    const [attendanceStudents, setAttendanceStudents] = useState("")
    const [attendanceDetails, setAttendanceDetails] = useState({ course: "", staff: "" })
    const [subjectData, setSubjectData] = useState("")

    const { mutate: addAttendanceOnClick } = PostMutation({ key: 'AttendanceList', shouldNavigate: false, success: 'Add Attendance Successful', error: 'Add Attendance Error' })
    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: studentList } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const submitTakeAttendance = (e) => {
        e.preventDefault()
        if (e.target.select_subject.value === '----' || e.target.select_session.value === '----') return toast.error('Fields are all required')

        let course = "";
        const subjectSelected = subjectList?.data?.result.map((s) => {
            if (s.subject_name === e.target.select_subject.value) {
                setSubjectData({ course: s.course })
                course = s.course
            }
        })
        setAttendanceStudents("")
        const studentSelected = studentList?.data?.result.map((e) => {
            if (e.course === course) setAttendanceStudents(attendance => [...attendance, e])
        })
        setAttendanceDetails({ subject: e.target.select_subject.value, session: e.target.select_session.value })
    }

    const submitAttendance = (e) => {
        e.preventDefault()
        if (!e.target.date.value) return toast.error('Fields are all required')
        let studentData = []
        let absentStudentsEmail = ""
        let presentStudentsEmail = ""
        for (let i = 1; i < e.target.length - 1; i++) {
            studentData.push({ attendanceStatus: e.target[i].checked, studentEmail: e.target[i].getAttribute('data-student') })

        }
        const studentMap = studentData.map((data) => {
            if (data.attendanceStatus) {
                presentStudentsEmail += `${data.studentEmail};`
            } else if (!data.attendanceStatus) {
                absentStudentsEmail += `${data.studentEmail};`
            }
        })
        addAttendanceOnClick({ url: `${URLi}/take/attendance`, data: { date: e.target.date.value, course: subjectData.course, staff: userInfo.email, session: attendanceDetails.session, subject: attendanceDetails.subject, absentStudents: absentStudentsEmail.slice(0, -1), presentStudents: presentStudentsEmail.slice(0, -1) } })
        setAttendanceStudents('')
    }

    return (

        <ContentComponent contentTitle='Take Attendance'>
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

                <button type='submit' className='btn btn-primary w-100 mb-3'>Fetch Students</button>
            </form>
            {attendanceStudents !== "" && (
                <form onSubmit={submitAttendance}>
                    <ContentFormComponent label='Attendance Date:' name='date' type='date' className='updateInput' />
                    <div className="d-flex flex-wrap mb-5">
                        {attendanceStudents?.map((e) => {
                            return (
                                <div key={e.email} style={{ flex: '1 0 calc(25%)' }}>
                                    <input className='updateInput' autoComplete='off' type='checkbox' data-student={e.email} defaultChecked />
                                    <label>{`${e.firstname} ${e.lastname}`}</label>
                                </div>

                            )
                        })}
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Save Attendance</button>
                </form>
            )}
        </ContentComponent>


    )
}

export default TakeAttendance