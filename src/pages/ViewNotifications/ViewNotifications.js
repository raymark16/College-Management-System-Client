
import { URLi } from '../../App'
import Loading from '../../components/Loading'
import ContentComponent from '../../components/ContentComponent'
import ContentTableComponent from '../../components/ContentTableComponent'
import { GetQuery } from '../../hooks/queries'
import ErrorPage from '../ErrorPage/ErrorPage'

const ViewNotifications = () => {

    const { data: notificationList, isError: notificationListIsError, isLoading: notificationListIsLoading } = GetQuery({ key: 'Notification', url: `${URLi}/staff/view/notifications` })

    const columns = [
        {
            name: '#',
            selector: row => row.id
        },
        {
            name: 'Date',
            selector: row => row.date
        },
        {
            name: 'Message',
            selector: row => row.message
        }
    ]
    let count = 1
    const newData = notificationList?.data?.result.map((e) => {
        const dateNotify = e.createdAt.slice(0, 19).replace('T', ' ')
        let resultObj = {
            id: count,
            date: dateNotify,
            message: e.notification_desc,
        }
        count++
        return resultObj
    })

    return (
        <ContentComponent contentTitle='View Notifications'>
            {notificationListIsLoading ? <Loading /> : notificationListIsError ? <ErrorPage /> : <ContentTableComponent columns={columns} data={newData} />}
        </ContentComponent>
    )
}

export default ViewNotifications