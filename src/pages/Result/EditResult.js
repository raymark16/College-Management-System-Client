import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { GetQuery, EditMutation } from "../../hooks/queries"
import { useState } from 'react'
import useAuth from "../../hooks/useAuth"

const EditResult = () => {
    const { userInfo } = useAuth()
    const [fetchStudClick, setFetchStudClick] = useState(false)
    const [resultDetails, setResultDetails] = useState({ subject: "", session: "" })

    const { mutate: editResultOnClick } = EditMutation({ key: 'ResultList', shouldNavigate: false, success: 'Edit Result Successful', error: 'Edit Result Error' })
    const { data: sessionList } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })
    const { data: subjectList } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })
    const { data: resultList } = GetQuery({ key: 'ResultList', url: `${URLi}/get/result` })
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
        const studentSelected = resultList?.data?.result.map((list) => {
            if (e.target.select_student.value === list.uuid) student = list
        })

        editResultOnClick({ url: `${URLi}/edit/result`, data: { session: resultDetails.session, subject: resultDetails.subject, studentFullName: student.FullName, studentUuid: student.studentUuid, studentEmail: student.studentEmail, testDescription: e.target.testDescription.value, testScore: e.target.testScore.value } })
        setFetchStudClick(false)
    }

    return (

        <ContentComponent contentTitle="Edit Student's Result">
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
                            {resultList?.data?.result.map((e) => {
                                return (
                                    <option key={e.uuid} value={e.uuid}>{e.studentFullName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <ContentFormComponent label='Test Description:' name='testDescription' type='text' className='updateInput' />
                    <ContentFormComponent label='Test Score:' name='testScore' type='number' className='updateInput' />
                    <button type='submit' className='btn btn-primary w-100'>Update Result</button>
                </form>
            )}
        </ContentComponent>


    )
}

export default EditResult