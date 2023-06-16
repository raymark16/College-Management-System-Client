import React from 'react'
import LeaveApplication from '../../components/LeaveApplication'
import { URLi } from '../../App'

const ViewLeaveStaff = () => {
    return (
        <>
            <LeaveApplication keyList='UserList' urlList={`${URLi}/staff/manage`} user='Staff' contentTitle='Leave Applications From Staff' />
        </>
    )
}

export default ViewLeaveStaff