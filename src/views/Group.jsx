import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AllChat from '../Components/AllChat';
import { getDatabase, ref, push, onValue } from "firebase/database";

const Group = () => {
  let { id } = useParams();
  const [inputmessege, setInputmessege] = useState("")
  const [inputname, setInputName] = useState("")
  const [allmessege, setAllmessege] = useState([]);
  const [uid, setUid] = useState(Math.floor(Math.random() * 1000000000));


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
    });
  }, []);
  allmessege.map((data, index) => (
    console.log(data.name)

  ), [])
  // console.log(allmessege.name);
  // send messege
  const sendmessege = () => {
    const db = getDatabase();
    const date = new Date().getTime();
    push(ref(db, 'groups/' + id + '/chat/'), {
      uid: uid,
      name: inputname,
      messege: inputmessege,
      date: date
    });
    setInputmessege("")
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto bg-dark text-light p-3" style={{ height: '92vh' }}>
            <h2 className='mb-3'>Group QnA {id}</h2>

            <div className="all-chat shadow" style={{ height: '350px', overflowY: 'scroll' }}>
              {
                allmessege.map((data, index) => (
                  <AllChat key={index} data={data} uid={uid} />
                ))
              }
            </div>

            <div className="input-question px-3 py-3">
              <div className="col-md-4">
                <input className='form-control me-2 mb-3' type="text" onChange={e => setInputName(e.target.value.replace(/\s/g, ''))} value={inputname} placeholder="Masukan Nama Anda" />
              </div>

              <div className="d-flex">
                <textarea placeholder="Masukan Pertanyaan Anda" className='form-control me-2' onChange={e => setInputmessege(e.target.value)} value={inputmessege}></textarea>
                <button onClick={() => sendmessege()} className='btn btn-primary'>Kirim</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Group