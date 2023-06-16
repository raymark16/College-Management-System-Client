import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { PostMutation, GetQuery } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const AddResult = () => {
    const { userInfo } = useAuth()
    const [fetchStudClick, setFetchStudClick] = useState(false)
    const [resultDetails, setResultDetails] = useState({ subject: "", session: "" })

    const { mutate: addResultOnClick } = PostMutation({ key: 'ResultList', shouldNavigate: false, success: 'Add Result Successful', error: 'Add Result Error' })
    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: studentList } = GetQuery({ key: 'StudentList', url: `${URLi}/student/manage` })
    const submitFetchStudent = (e) => {
        e.preventDefault()
        if (e.target.select_subject.value === '----' || e.target.select_session.value === '----') return toast.error('Fields are all required')

        setResultDetails({ subject: e.target.select_subject.value, session: e.target.select_session.value })
        setFetchStudClick(true)
    }

    const submitResult = (e) => {
        e.preventDefault()
        if (e.target.select_student.value === '----' || !e.target.testDescription.value || !e.target.testScore.value) return toast.error('Fields are all required')
        let student;
        const studentSelected = studentList?.data?.result.map((list) => {
            if (e.target.select_student.value === list.uuid) student = list
        })

        addResultOnClick({ url: `${URLi}/add/result`, data: { session: resultDetails.session, subject: resultDetails.subject, studentFullName: `${student.firstname} ${student.lastname}`, studentUuid: student.uuid, studentEmail: student.email, testDescription: e.target.testDescription.value, testScore: e.target.testScore.value } })
        setFetchStudClick(false)
    }

    return (

        <ContentComponent contentTitle='Result Upload'>
            <form onSubmit={submitFetchStudent}>
                <div className="d-flex flex-column mb-3">
                    <label>Subject:</label>
                    <select name='select_subject' className='updateInput'>
                        <option defaultValue='----'>----</option>
                        {subjectList?.data?.result.map((e) => {
                            if (userInfo.course === e.course) {
                                return (
                                    <option key={e.subject_name}>{e.subject_name}</option>
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
                                <option key={e.uuid} >{`From ${e.start_year} to ${e.end_year}`}</option>
                            )
                        })}
                    </select>
                </div>

                <button type='submit' className='btn btn-primary w-100 mb-3'>Fetch Students</button>
            </form>
            {fetchStudClick && (
                <form onSubmit={submitResult}>
                    <div className="d-flex flex-column mb-3">
                        <label>Student List:</label>
                        <select name='select_student' className='updateInput'>
                            <option defaultValue='----'>----</option>
                            {studentList?.data?.result.map((e) => {
                                return (
                                    <option key={e.uuid} value={e.uuid}>{`${e.firstname} ${e.lastname}`}</option>
                                )
                            })}
                        </select>
                    </div>
                    <ContentFormComponent label='Test Description:' name='testDescription' type='text' className='updateInput' />
                    <ContentFormComponent label='Test Score:' name='testScore' type='number' className='updateInput' />
                    <button type='submit' className='btn btn-primary w-100'>Save Result</button>
                </form>
            )}
        </ContentComponent>


    )
}

export default AddResult