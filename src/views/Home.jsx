import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Hero from '../Components/Hero';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// style required
import firebase from '../config';
import { getDatabase, ref, push, onValue } from "firebase/database";
import Footer from '../Components/Footer';
import { AiOutlineCopy } from 'react-icons/ai'


const Home = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState("")
  const [disable_s, setDisable_s] = useState(true)
  const [disable_c, setDisable_c] = useState(true)
  const [linkgroup, setLinkgroup] = useState("")
  const [inputsearch, setInputsearch] = useState("")
  const [pesansearch, setPesansearch] = useState("")
  const [pesancreate, setPesancreate] = useState("")
  const [allgroup, setAllgroup] = useState([])

  // FUNGSI CARI GRUP | BUTTON SEARCH ONCLICK
  const search = () => {
    const db = getDatabase();
    onValue(ref(db, 'groups/' + inputsearch), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        grouptrue()
      } else {
        toast.alert("Nama Grup Tidak Ditemukan! ", {
          position: "top|right",
          margin: 15,
          delay: 0,
          duration: 2000,
        });
      }
    })
  }

  // FUNGSI INI BERJALAN KETIKA DATA YG DICARI DITEMUKAN
  const grouptrue = () => {
    if (allgroup !== []) {
      navigate(`/group/` + inputsearch);
    }
  }

  // FUNGSI KETIKA BTN CREATE GRUP ONCLICK
  const createGroup = () => {
    // ADD DATA TO FIREBASE
    const db = getDatabase();
    const date = new Date().getTime();

    onValue(ref(db, 'groups/' + input), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setPesancreate("Nama group sudah dipakai !")
        toast.alert("Nama Grup Sudah Dipakai! ", {
          position: "top|right",
          margin: 15,
          delay: 0,
          duration: 2000,
        })
        throw new Error("Here we stop");
      } else if (data === null) {
        push(ref(db, 'groups/' + input + '/detail/'), {
          namegroup: input,
          date_create: date
        }).then(() => {
          setDisable_c(false)
          toast.success("Success ", {
            position: "top|right",
            margin: 15,
            delay: 0,
            duration: 2000,
          });
          setLinkgroup(`/group/${input}`)
          setInput("")
        })
      }


    })







  }


  // BTN DISABLE IF LENGTH INPUT > 5
  useEffect(() => {
    // BTN SEARCH
    if (inputsearch.length > 5) {
      setDisable_s(false)
    } else {
      setDisable_s(true)
    }

    //BTN INPUT CREATE GRUP
    if (input.length > 5) {
      setDisable_c(false)
    } else {
      setDisable_c(true)
    }
  });


  return (
    <>
      <Hero />
      <div className="row m-auto d-flex justify-content-center">
        <div className="col-md-4 mx-5">
          <Card className='card-home card-search m-auto mt-5'>
            <Card.Body>
              <Card.Title>Search Group QNA</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Search Group</Card.Subtitle>
              <Card.Text>
                <input type="text" onChange={e => setInputsearch(e.target.value.replace(/\s/g, ''))} value={inputsearch} className='form-control mb-4' placeholder='Name Group' />
                <button onClick={() => search()} className='btn' disabled={disable_s}>Search</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className='card-home card-create mt-5'>
            <Card.Body>
              <Card.Title>Create New Group QNA</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">New Group</Card.Subtitle>
              <Card.Text>
                <input type="text" value={input} onChange={e => setInput(e.target.value.replace(/\s/g, ''))} className='form-control mb-4' placeholder='New Name Group' />
                <button onClick={() => createGroup()} disabled={disable_c} className='btn'>Create</button>
              </Card.Text>

              <p disabled='disabled' className={'text-light ' + (linkgroup !== '' ? '' : 'd-none')}>
                <Link className='text-light me-2' to={linkgroup}>Go to Group</Link> <AiOutlineCopy className='fs-4' />
              </p>
            </Card.Body>
          </Card>
        </div>

      </div>
      <Footer />

    </>
  )
}

export default Home