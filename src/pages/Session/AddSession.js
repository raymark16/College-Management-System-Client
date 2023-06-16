import ContentComponent from "../../components/ContentComponent"
import ContentFormComponent from "../../components/ContentFormComponent"
import toast from "react-hot-toast"
import { URLi } from "../../App"
import { PostMutation } from "../../hooks/queries"


const AddSession = () => {
    const { mutate: addSessionOnClick } = PostMutation({ key: 'SessionList', shouldNavigate: true, navigate: '/session/manage', success: 'Add Session Successful', error: 'Add Session Error' })
    const submitAddSession = (e) => {
        e.preventDefault()
        if (!e.target.start_year.value || !e.target.end_year.value) return toast.error('All fields are required')
        addSessionOnClick({ url: `${URLi}/session/add`, data: { start_year: e.target.start_year.value, end_year: e.target.end_year.value } })
    }
    return (
        <form onSubmit={submitAddSession}>
            <ContentComponent contentTitle='Add Session'>
                <ContentFormComponent label='Start year:' name='start_year' type='date' classname='updateInput' />
                <ContentFormComponent label='End year:' name='end_year' type='date' classname='updateInput' />
                <button type='submit' className='btn btn-primary w-100'>Add Session</button>
            </ContentComponent>
        </form>
    )
}

export default AddSession