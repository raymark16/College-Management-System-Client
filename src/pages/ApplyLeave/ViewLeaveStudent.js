import React from 'react'
import LeaveApplication from '../../components/LeaveApplication'
import { URLi } from '../../App'

const ViewLeaveStudent = () => {
    return (
        <>
            <LeaveApplication keyList='StudentList' urlList={`${URLi}/student/manage`} user='Student' contentTitle='Leave Applications From Student' />
        </>
    )
}

export default ViewLeaveStudent