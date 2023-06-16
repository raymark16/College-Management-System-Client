import React from 'react'
import './Loading.css'
const Loading = () => {
    return (
        <center>
            <div className="spinner">
                <span>Loading...</span>
                <div className="half-spinner"></div>
            </div>
        </center>
    )
}
export default Loading