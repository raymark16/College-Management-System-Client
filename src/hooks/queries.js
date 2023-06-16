import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



export const GetQuery = (props) => {
    return useQuery([props.key], async () => {
        return await axios.get(props.url)
    })
}

const reqPost = async (props) => {
    return await axios.post(props.url, props.data)
}

export const PostMutation = (props) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation(reqPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(props.key)
            toast.success(props.success)
            if (props?.shouldNavigate) {
                navigate(props.navigate)
            }
        },
        onError: () => {
            toast.error(props.error)
        }
    })
}

const reqEdit = async (props) => {
    return await axios.patch(props.url, props.data)
}

export const EditMutation = (props) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation(reqEdit, {
        onSuccess: () => {
            queryClient.invalidateQueries(props.key)
            toast.success(props.success)
            if (props?.shouldNavigate) {
                navigate(props.navigate)
            }
        },
        onError: () => {
            toast.error(props.error)
        }
    })
}

const reqDelete = async (props) => {
    return await axios.delete(props.url)
}

export const DeleteMutation = (props) => {
    const queryClient = useQueryClient()
    return useMutation(reqDelete, {
        onSuccess: () => {
            queryClient.invalidateQueries(props.key)
            toast.success(props.success)
        },
        onError: () => {
            toast.error(props.error)
        }
    })
}

