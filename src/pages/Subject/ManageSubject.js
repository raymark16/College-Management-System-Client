
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { DeleteMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom'

const ManageSubject = () => {
    const navigate = useNavigate()
    const { data: subjectList, isError: subjectListIsError, isLoading: subjectListIsLoading } = GetQuery({ key: 'SubjectList', url: `${URLi}/subject/manage` })

    const { mutate: deleteSubjectOnClick } = DeleteMutation({ key: 'SubjectList', success: 'Delete Subject Successful', error: 'Delete Subject Error' })
    const deleteSubject = (uuid) => {
        deleteSubjectOnClick({ url: `${URLi}/subject/manage/delete_subject/${uuid}` })
    }
    const editSubject = (uuid) => {
        navigate(`/subject/manage/edit_subject/${uuid}`)
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Subject',
            selector: row => row.subject
        },
        {
            name: 'Staff',
            selector: row => row.staff
        },
        {
            name: 'Course',
            selector: row => row.course
        },
        {
            name: 'Actions',
            selector: row => row.actions
        },
    ]
    let count = 1
    const newData = subjectList?.data?.result.map((e) => {
        const action =
            <div key={e.uuid}>
                <button onClick={() => editSubject(e.uuid)}>Edit</button>
                <button onClick={() => deleteSubject(e.uuid)}>Delete</button>
            </div>
        let resultObj = {
            id: count,
            subject: e.subject_name,
            staff: e.staff,
            course: e.course,
            actions: action
        }
        count++
        return resultObj
    })

    return (
        <ContentComponent contentTitle='Manage Subject'>
            {subjectListIsLoading ? <Loading /> : subjectListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ManageSubject