import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AllChat from '../Components/AllChat';
import { getDatabase, ref, push, onValue } from "firebase/database";
import firebaseConfig from '../config';

const Group = () => {
  let { id } = useParams();
  const [inputmessege, setInputmessege] = useState("")
  const [inputname, setInputName] = useState("")
  const [info, setInfo] = useState([]);

  window.addEventListener('load', () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  // const Fetchdata = () => {
  //   const db = getDatabase();
  //   db.collection("data").get().then((querySnapshot) => {

  //     // Loop through the data and store
  //     // it in array to display
  //     querySnapshot.forEach(element => {
  //       var data = element.data();
  //       setInfo(arr => [...arr, data]);

  //     });
  //   })
  // }

  // const Fetchdata = () => {
  //   const db = getDatabase();
  //   firebaseConfig.collection("data").get().then((querySnapshot) => {

  //     // Loop through the data and store
  //     // it in array to display
  //     querySnapshot.forEach(element => {
  //       var data = element.data();
  //       setInfo(arr => [...arr, data]);

  //     });
  //   })
  // }

  // read
  const Fetchdata = () => {
    const db = getDatabase();
    onValue(ref(db, 'groups/' + id), (snapshot) => {
      setInfo([]);
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((alldata) => {
          setInfo((olddata) => [...olddata, alldata]);
        })
      }
    })
  }
  // useEffect(() => {
  //   const db = getDatabase();
  //   onValue(ref(db, 'groups/' + id), (snapshot) => {
  //     const data = snapshot.val()
  //     if (data !== null) {
  //       Object.values(data).map((alldata) => {
  //         setInfo((olddata) => [...olddata, alldata]);
  //       })
  //     }
  //   })
  // }, [])


  // const Fetchdata = () => {
  //   const db = getDatabase();
  //   const starCountRef = ref(db, 'groups/' + id);
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setInfo(arr => [...arr, data]);
  //   });
  // }

  const sendmessege = () => {
    const db = getDatabase();
    const date = new Date().getTime();
    push(ref(db, 'groups/' + id), {
      name: inputname,
      namegroup: inputmessege,
      date: date
    });
    setInputName("")
    setInputmessege("")
  }
  return (
    <>
      {/* <p>INI Group {id} </p> */}


      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto bg-dark text-light p-3" style={{ height: '92vh' }}>
            <h2 className='mb-3'>Group QnA {id}</h2>

            <div className="all-chat shadow" style={{ height: '350px', overflowY: 'scroll' }}>
              {
                info.map((data, index) => (
                  <AllChat data={data} />
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