import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Hero from '../Components/Hero';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// style required
import FirebaseConfig from '../config';
import { getDatabase, ref, push } from "firebase/database";


const Home = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState("")
  const [disable, setDisable] = useState(true)
  const [linkgroup, setLinkgroup] = useState("")
  const [inputsearch, setInputsearch] = useState("")
  const [pesansearch, setPesansearch] = useState("")

  const search = () => {
    if (inputsearch === "programming") {
      navigate(`/group/programming`);
    } else {
      setInputsearch("")
      setPesansearch("Group Tidak ditemukan!")
    }
  }

  const createGroup = () => {
    if (input === "") {
      alert("jancek")
    } else {

      // ADD DATA TO FIREBASE
      const db = getDatabase();
      const date = new Date().getTime();
      push(ref(db, 'groups/'), {
        namegroup: input,
        date: date
      });

      setDisable(false)

      toast.success("Success ", {
        position: "top|right",
        margin: 15,
        delay: 0,
        duration: 2000,
      });

      setLinkgroup(`/group/${input}`)
      setInput("")
      // navigate(`/group/${input}`);
    }

  }
  useEffect(() => {
    if (input.length > 5) {
      setDisable(false)
    } else {
      setDisable(true)
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
                <input type="text" onChange={e => setInputsearch(e.target.value.replace(/\s/g, ''))} value={inputsearch} className='form-control ' placeholder='Name Group' />
                <div className="pesan text-start text-danger mb-4">{pesansearch}</div>
                <button onClick={() => search()} className='btn'>Search</button>
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
                <button onClick={() => createGroup()} disabled={disable} style={{ cursor: disable == true ? 'not-allowed' : "pointer" }} className='btn'>Create</button>
              </Card.Text>

              <p className='text-light'>Link : <Link className='text-light' to={linkgroup}>{linkgroup}</Link></p>
            </Card.Body>
          </Card>
        </div>

      </div>


    </>
  )
}

export default Home