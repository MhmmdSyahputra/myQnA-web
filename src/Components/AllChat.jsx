import React, { useEffect, useState } from 'react'

const AllChat = ({ data, uid }) => {
    const [uidlocal, setuidlocal] = useState([]);

    useEffect(() => {
        const uid = JSON.parse(localStorage.getItem('uid'));
        if (uid) {
            setuidlocal(uid);
        }
        console.log(uidlocal);
    }, []);

    useEffect(() => {
        data.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
        <>
            <div style={{ width: '80%' }} className={"bubble-chat text-start bg-light text-dark m-2 p-3 shadow " + (data.uid === uid ? 'cht-right ms-auto' : 'cht-left')}>
                <h6 className='text-muted'>{data.name}</h6>
                <div className="question">
                    {data.messege}
                </div>
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { data = el; }}>
                </div>
            </div>

        </>
    )
}

export default AllChat