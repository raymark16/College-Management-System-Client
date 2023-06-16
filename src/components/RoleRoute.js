import { Navigate } from "react-router-dom";
const RoleRoute = (props) => {

    const canAccess = props.roles.includes(props.role)

    return canAccess === true ? (
        <>
            {props.children}
        </>
    ) : <Navigate to='/error' />;


}

export default RoleRoute