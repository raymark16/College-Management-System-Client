import DataTable from 'react-data-table-component';

const ContentTableComponent = (props) => {
    const customStyles = {

        header: {
            style: {
                fontSize: '3rem'
            }
        },
        head: {
            style: {
                fontSize: '1rem',
                borderTop: '2px solid #006AE8',
                borderBottom: '2px solid #006AE8',
            }
        }
    }
    return (
        <>
            <DataTable
                columns={props.columns}
                data={props.data}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='50vh'
                responsive='true'
                striped='true'
                highlightOnHover='true'

                customStyles={customStyles}
            />
        </>
    )
}

export default ContentTableComponent