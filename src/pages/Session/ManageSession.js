
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { DeleteMutation, GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom'

const ManageSession = () => {
    const navigate = useNavigate()
    const { data: sessionList, isError: sessionListIsError, isLoading: sessionListIsLoading } = GetQuery({ key: 'SessionList', url: `${URLi}/session/manage` })

    const { mutate: deleteSessionOnClick } = DeleteMutation({ key: 'SessionList', success: 'Delete Session Successful', error: 'Delete Session Error' })
    const deleteSession = (uuid) => {
        deleteSessionOnClick({ url: `${URLi}/session/manage/delete_session/${uuid}` })
    }
    const editSession = (uuid) => {
        navigate(`/session/manage/edit_session/${uuid}`)
    }
    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Start',
            selector: row => row.start_year
        },
        {
            name: 'End',
            selector: row => row.end_year
        },
        {
            name: 'Actions',
            selector: row => row.actions
        },
    ]
    let count = 1
    const newData = sessionList?.data?.result.map((e) => {
        const action =
            <div key={e.uuid}>
                <button onClick={() => editSession(e.uuid)}>Edit</button>
                <button onClick={() => deleteSession(e.uuid)}>Delete</button>
            </div>
        let resultObj = {
            id: count,
            start_year: e.start_year,
            end_year: e.end_year,
            actions: action
        }
        count++
        return resultObj
    })

    return (
        <ContentComponent contentTitle='Manage Session'>
            {sessionListIsLoading ? <Loading /> : sessionListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ManageSession