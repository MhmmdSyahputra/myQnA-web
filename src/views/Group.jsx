import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AllChat from '../Components/AllChat';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { IoMdSend } from 'react-icons/io'

const Group = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [inputmessege, setInputmessege] = useState("")
  const [inputname, setInputName] = useState("")
  const [allmessege, setAllmessege] = useState([]);
  const [uid, setUid] = useState(Math.floor(Math.random() * 1000000000) * new Date());
  const [btndisable, setBtndisable] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'groups/' + id), (snapshot) => {
      const data = snapshot.val()
      if (data == null) {
        navigate('/notfound');
        throw new Error("Here we stop");
      }
    })
  }, [])


  // read all cht
  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'groups/' + id + '/chat/'), (snapshot) => {
      setAllmessege([]);
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((alldata) => {
          setAllmessege((olddata) => [...olddata, alldata]);
        });
      }
    })
  }, []);


  // send messege
  const sendmessege = () => {
    const db = getDatabase();
    const now = new Date()
    const time = String(now.getHours() + ':' + now.getMinutes()).padStart(5, '0');
    push(ref(db, 'groups/' + id + '/chat/'), {
      uid: uid,
      name: inputname,
      messege: inputmessege,
      date: time
    });
    setInputmessege("")
  }

  // cek input kosong atau tidak
  useEffect(() => {
    if (inputname.length > 0 && inputmessege.length > 0) {
      setBtndisable(false)
    } else {
      setBtndisable(true)
    }
  })
  return (

    <>
      <div className="container groupcht-m">
        <div className="row">
          <div className="col-md-8 m-auto bg-dark text-light" style={{ height: '92.1vh', padding: '0' }}>
            <h2 className='mb-3'>Group QnA {id}</h2>

            <div className="all-chat shadow px-1" style={{ height: '60vh', overflow: 'auto', backgroundColor: '#1a1e20s' }}>
              {
                allmessege.map((data, index) => (
                  // console.log(data)
                  <AllChat key={index} data={data} uid={uid} />
                ))
              }
            </div>

            <div className="input-question px-3 py-3" style={{ marginTop: '1vh' }}>

              <div className="col-md-4">
                <input className='form-control me-2 mb-3' type="text" style={{ borderRadius: '15px' }} onChange={e => setInputName(e.target.value.replace(/\s/g, ''))} value={inputname} placeholder="Masukan Nama Anda" />
              </div>

              <div className="d-flex">
                <textarea placeholder="Masukan Pertanyaan Anda" style={{ borderRadius: '15px' }} className='form-control me-2' onChange={e => setInputmessege(e.target.value)} value={inputmessege}></textarea>

                <button onClick={() => sendmessege()} style={{ width: '10vh', background: '#6D62FF', borderRadius: '15px' }} className={'btn' + (btndisable ? 'disable' : 'enable')} disabled={btndisable} ><IoMdSend className='fs-2 m-auto' /></button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Group