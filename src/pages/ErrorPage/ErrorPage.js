import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>404</h1>
            <h3>Page Not Found</h3>

            <br></br>
            <Link to='/' style={{ textDecoration: 'none' }}>Go back to dashboard!</Link>
        </div>
    )
}

export default ErrorPage