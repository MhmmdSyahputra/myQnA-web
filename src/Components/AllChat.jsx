import React, { useEffect, useState } from 'react'

const AllChat = ({ data, uid }) => {
    const [thisMe, setThisMe] = useState(false)


    useEffect(() => {
        data.scrollIntoView({ behavior: "smooth" })
    }, [])
    const userid = localStorage.getItem("iduser")


    return (
        <>
            <div style={{ width: '70%' }} className={(data.uid == userid ? 'ms-auto' : '')}>

                <div className={'bubble-chat bg-light m-2 p-3 text-start text-dark shadow ' +
                    (data.uid == userid ? 'cht-right' : 'cht-left')}
                    style={{ clear: 'both', float: data.uid == userid ? 'right' : 'left', }}>

                    <h6 className={'text-muted ' +
                        (data.uid == userid ? 'text-end' : 'text-start')}>{data.name}</h6>

                    <div>
                        {data.messege}
                    </div>

                    <div className={'text-muted mx-2 ' +
                        (data.uid == userid ? 'text-start' : 'text-end')}>
                        {data.date}
                    </div>
                </div>

                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { data = el; }}>
                </div>

            </div>

        </>
    )
}

export default AllChat