import React, { useEffect, useState } from 'react'

const AllChat = ({ data, uid }) => {
    const [thisMe, setThisMe] = useState(false)
    const userid = localStorage.getItem("iduser")


    return (
        <>
            <div style={{ width: '90%', maxWidth: '90%' }} className={(data.uid == userid ? 'ms-auto' : '')}>

                <div className={'bubble-chat bg-light m-2 p-3 text-start text-dark shadow ' +
                    (data.uid == userid ? 'cht-right' : 'cht-left')}
                    style={{ 
                        clear: 'both', 
                        float: data.uid == userid ? 'right' : 'left',
                        borderRadius: '15px',
                        maxWidth: '100%',
                        minHeight: 'auto'
                    }}>

                    <h6 className={'text-muted ' +
                        (data.uid == userid ? 'text-end' : 'text-start')}>{data.name}</h6>

                    <div style={{ 
                        whiteSpace: 'pre-wrap', 
                        wordBreak: 'break-word',
                        lineHeight: '1.4',
                        fontSize: '14px'
                    }}>
                        {data.messege}
                    </div>

                    <div className={'text-muted mx-2 ' +
                        (data.uid == userid ? 'text-start' : 'text-end')}>
                        {data.date}
                    </div>
                </div>

            </div>

        </>
    )
}

export default AllChat