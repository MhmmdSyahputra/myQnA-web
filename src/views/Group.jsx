import React from 'react'
import { useParams } from 'react-router-dom';
import AllChat from '../Components/AllChat';

const Group = () => {
  let { id } = useParams();
  return (
    <>
      {/* <p>INI Group {id} </p> */}
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto bg-dark text-light p-3" style={{ height: '91.2vh' }}>
            <h2 className='mb-3'>Group QnA {id}</h2>

            <div className="all-chat shadow" style={{ height: '350px', overflowY: 'scroll' }}>
              <AllChat />
            </div>


            <div className="input-question px-3 py-3">
              <div className="col-md-4">
                <input className='form-control me-2 mb-3' type="text" placeholder="Masukan Nama Anda" />
              </div>

              <div className="d-flex">
                <textarea placeholder="Masukan Pertanyaan Anda" className='form-control me-2'></textarea>
                <button className='btn btn-primary'>Kirim</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Group