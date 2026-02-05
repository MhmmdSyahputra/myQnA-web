import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import AllChat from '../Components/AllChat';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { IoMdSend } from 'react-icons/io'
import { nanoid } from 'nanoid'

const Group = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [inputmessege, setInputmessege] = useState("")
  const [inputname, setInputName] = useState("")
  const [allmessege, setAllmessege] = useState([]);
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
      // Auto scroll to bottom when new message arrives
      setTimeout(() => {
        const chatContainer = document.querySelector('.all-chat');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    })
  }, []);


  // send messege
  const sendmessege = () => {
    const db = getDatabase();
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = hours + ":" + minutes
    const uid = nanoid()
    push(ref(db, 'groups/' + id + '/chat/'), {
      uid: localStorage.getItem("iduser") !== null ? localStorage.getItem("iduser") : uid,
      name: inputname,
      messege: inputmessege,
      date: time
    });
    setInputmessege("")
    if (localStorage.getItem("iduser") == null) {
      localStorage.setItem("iduser", uid);
    }

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

            <div className="all-chat shadow px-1" style={{ 
              height: '60vh', 
              overflow: 'auto', 
              backgroundColor: '#1a1e20', 
              borderRadius: '10px',
              border: '1px solid #333'
            }}>
              {
                allmessege.map((data, index) => (
                  // console.log(data)
                  <AllChat key={index} data={data} />
                ))
              }
            </div>

            <div className="input-question px-3 py-3" style={{ marginTop: '1vh' }}>

              <div className="col-md-4">
                <input className='form-control me-2 mb-3' type="text" style={{ borderRadius: '15px' }} onChange={e => setInputName(e.target.value.replace(/\s/g, ''))} value={inputname} placeholder="Masukan Nama Anda" />
              </div>

              <div className="d-flex">
                <textarea 
                  placeholder="Masukan Pertanyaan Anda" 
                  style={{ 
                    borderRadius: '15px',
                    resize: 'vertical',
                    minHeight: '45px',
                    maxHeight: '120px'
                  }} 
                  className='form-control me-2' 
                  onChange={e => setInputmessege(e.target.value)} 
                  value={inputmessege}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      // Allow new line with Shift+Enter
                      return;
                    } else if (e.key === 'Enter' && !btndisable) {
                      e.preventDefault();
                      sendmessege();
                    }
                  }}
                ></textarea>

                <button 
                  onClick={() => sendmessege()} 
                  style={{ 
                    width: '10vh', 
                    background: btndisable ? '#666' : '#6D62FF', 
                    borderRadius: '15px',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }} 
                  className={btndisable ? 'btn btn-secondary' : 'btn btn-primary'} 
                  disabled={btndisable}
                >
                  <IoMdSend className='fs-2 m-auto' />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Group