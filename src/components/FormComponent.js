

const FormComponent = (props) => {
    return (
        <input className={props.classTitle} onChange={props.changeValue} accept={props.accept} autoComplete='off' name={props.name} placeholder={props.placeholder} required type={props.type} />
    )
}

export default FormComponent