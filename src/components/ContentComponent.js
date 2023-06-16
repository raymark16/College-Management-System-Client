import { Typography } from 'antd';

const ContentComponent = (props) => {
    return (
        <>
            <Typography.Title level={3} style={{ marginLeft: '10px' }}>{props.contentTitle}</Typography.Title>
            <div
                style={{
                    margin: 10,
                    padding: 24,
                    minHeight: 360,
                    borderRadius: 10,
                    background: 'white',
                }}
            >
                {props.children}
            </div>
        </>
    )
}

export default ContentComponent