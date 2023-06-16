
const Card = (props) => {
    return (
        <div className="rounded pt-4 pb-4 me-2 ms-2" style={{ marginBottom: 5, display: 'flex', width: '25%', justifyContent: 'space-evenly', background: props.color }}>
            {props.icon}
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 style={{ color: 'white' }}>{props.title}</h3>
                <h1 style={{ color: 'white', fontWeight: 'bold' }}>{props.data}</h1>
            </div>
        </div>


    )
}

export default Card