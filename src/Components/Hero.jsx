import React, { Component } from 'react'

export default class Hero extends Component {
    render() {
        return (
            <>

                <div className="col-md-12 bg-dark p-4" style={{ height: '70vh' }}>
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h1 className='text-light'>Ayo mempermudah Presentasi anda dengan QNA ini</h1>
                        </div>
                        <div className="col-md-5">
                            <img src='https://i.pinimg.com/564x/e0/3c/a6/e03ca669523b0861edb5d53497c2693d.jpg' width="500" className='img-fluid' style={{ borderRadius: '30px' }} alt="" />
                        </div>
                    </div>


                </div>

            </>
        )
    }
}
