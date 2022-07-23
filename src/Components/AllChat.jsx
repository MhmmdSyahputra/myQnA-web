import React, { useState } from 'react'

const AllChat = ({ data }) => {
    // console.log(data);
    const [who, setWho] = useState("me")
    return (
        <>
            <div style={{ width: '80%' }} className={"bubble-chat text-start bg-light text-dark m-2 p-3 shadow " + (who === 'me' ? 'cht-right ms-auto' : 'cht-left')}>
                <h6 className='text-muted'>{data.name}</h6>
                <div className="question">
                    {data.messege}
                </div>
            </div>
            {/* <div style={{ width: '80%' }} className="bubble-chat text-start bg-light text-dark m-2 p-3 shadow">
                <h6 className='text-muted'>Yusop</h6>
                <div className="question">
                    kenapa koding mudah?
                </div>
            </div>
            <div style={{ width: '80%' }} className="bubble-chat text-start bg-light text-dark m-2 p-3 shadow">
                <h6 className='text-muted'>Tiara</h6>
                <div className="question">
                    Dari mana saya harus mulai programming?
                </div>
            </div>
            <div style={{ width: '80%' }} className="bubble-chat text-start bg-light text-dark m-2 p-3 shadow">
                <h6 className='text-muted'>Novita</h6>
                <div className="question">
                    Kenapa saya sulit untuk belajar bahasa pemrograman
                </div>
            </div>
            <div style={{ width: '80%' }} className="bubble-chat text-start bg-light text-dark m-2 p-3 shadow">
                <h6 className='text-muted'>Aldi</h6>
                <div className="question">
                    Info Loker
                </div>
            </div>
            <div style={{ width: '80%' }} className="bubble-chat text-start bg-light text-dark m-2 p-3 shadow">
                <h6 className='text-muted'>Pane</h6>
                <div className="question">
                    apakah jadi programmer peluang kerja nya besar?
                </div>
            </div> */}
        </>
    )
}

export default AllChat