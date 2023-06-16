

const ContentFormComponent = (props) => {
    return (
        <div className="d-flex flex-column mb-3">
            <label>{props.label}</label>
            <input style={{ height: '37px', borderRadius: '5px' }} key={props.key} value={props.value} className={props.classname} onChange={props.changeValue} autoComplete='off' name={props.name} accept={props.accept} placeholder={props.placeholder} required type={props.type} />
        </div >
    )
}

export default ContentFormComponent