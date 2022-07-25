import React, { useEffect, useState } from 'react'

const AllChat = ({ data, uid }) => {
    const [thisMe, setThisMe] = useState(false)



    useEffect(() => {
        data.scrollIntoView({ behavior: "smooth" })
    }, [])



    return (
        <>
            <div style={{ width: '70%' }} className={(data.uid === uid ? 'ms-auto' : '')}>

                <div className={'bubble-chat bg-light m-2 p-3 text-start text-dark shadow ' +
                    (data.uid === uid ? 'cht-right' : 'cht-left')}
                    style={{ clear: 'both', float: data.uid === uid ? 'right' : 'left', }}>

                    <h6 className={'text-muted ' +
                        (data.uid === uid ? 'text-end' : 'text-start')}>{data.name}</h6>

                    <div>
                        {data.messege}
                    </div>

                    <span className={'text-muted mx-2 ' +
                        (data.uid === uid ? 'text-start' : 'text-end')}>
                        {data.date}
                    </span>
                </div>

                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { data = el; }}>
                </div>

            </div>

        </>
    )
}

export default AllChat