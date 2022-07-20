import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import Hero from '../Components/Hero';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// style required

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
        <div className="col-md-3">
          <Card className='m-auto mt-5' style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>Search Group QNA</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Search Group</Card.Subtitle>
              <Card.Text>
                <input type="text" onChange={e => setInputsearch(e.target.value)} value={inputsearch} className='form-control ' placeholder='Name Group' />
                <div className="pesan text-start text-danger mb-4">{pesansearch}</div>
                <button onClick={() => search()} className='btn btn-primary'>Search</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 ">
          <Card className='m-auto mt-5' style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>Create New Group QNA</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">New Group</Card.Subtitle>
              <Card.Text>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} className='form-control mb-4' placeholder='New Name Group' />
                <button onClick={() => createGroup()} disabled={disable} style={{ cursor: disable == true ? 'not-allowed' : "pointer" }} className='btn btn-primary'>Create</button>
              </Card.Text>

              <p>Link : <Link to={linkgroup}>{linkgroup}</Link></p>
            </Card.Body>
          </Card>
        </div>

      </div>


    </>
  )
}

export default Home