import { useParams } from 'react-router-dom'
import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import { useState } from "react"
import { EditMutation } from "../../hooks/queries"
import toast from 'react-hot-toast'
import { URLi } from "../../App"

const EditSession = () => {
    let { uuid } = useParams()
    const { mutate: editSessionOnClick } = EditMutation({ key: 'SessionList', shouldNavigate: true, navigate: '/session/manage', success: 'Edit Session Successfully', error: 'Edit Session Error' })

    const submitEditSession = (e) => {
        e.preventDefault()
        if (!e.target.start_year.value || !e.target.end_year.value) return toast.error('Fields are all required')

        editSessionOnClick({ url: `${URLi}/session/manage/edit_session/${uuid}`, data: { start_year: e.target.start_year.value, end_year: e.target.end_year.value } })
    }
    return (
        <form onSubmit={submitEditSession} >
            <ContentComponent contentTitle='Edit Session'>
                <ContentFormComponent label='Start year:' name='start_year' type='date' classname='updateInput' />
                <ContentFormComponent label='End year:' name='end_year' type='date' classname='updateInput' />
                <button type='submit' className='btn btn-primary w-100'>Add Session</button>
            </ContentComponent>
        </form>
    )
}

export default EditSession