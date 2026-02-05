import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "siiimple-toast";
import "siiimple-toast/dist/style.css"; // style required
import { getDatabase, ref, push, onValue } from "firebase/database";
import Footer from "../Components/Footer";
import { AiOutlineCopy } from "react-icons/ai";
import { HiOutlineSearch, HiOutlinePlus, HiOutlineUsers } from "react-icons/hi";
import { BiLinkExternal } from "react-icons/bi";

const Home = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState("");
  const [namenewgroup, setNamenewgroup] = useState("");
  const [disable_s, setDisable_s] = useState(true);
  const [disable_c, setDisable_c] = useState(true);
  const [linkgroup, setLinkgroup] = useState("");
  const [inputsearch, setInputsearch] = useState("");
  const [allgroup] = useState([]);

  // FUNGSI CARI GRUP | BUTTON SEARCH ONCLICK
  const search = () => {
    const db = getDatabase();
    onValue(ref(db, "groups/" + inputsearch), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        grouptrue();
      } else {
        toast.alert("Nama Grup Tidak Ditemukan! ", {
          position: "top|right",
          margin: 15,
          delay: 0,
          duration: 2000,
        });
      }
    });
  };

  // FUNGSI INI BERJALAN KETIKA DATA YG DICARI DITEMUKAN
  const grouptrue = () => {
    if (allgroup.length > 0) {
      navigate(`/group/` + inputsearch);
    }
  };

  // FUNGSI KETIKA BTN CREATE GRUP ONCLICK
  const createGroup = () => {
    // ADD DATA TO FIREBASE
    const db = getDatabase();
    const date = new Date().getTime();

    onValue(ref(db, "groups/" + input + "/detail/"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        toast.alert("Nama Grup Sudah Dipakai! ", {
          position: "top|right",
          margin: 15,
          delay: 0,
          duration: 2000,
        });
        setInput("");
        throw new Error("Here we stop");
      } else {
        setNamenewgroup(input);
        push(ref(db, "groups/" + input + "/detail/"), {
          namegroup: input,
          date_create: date,
        }).then(() => {
          setDisable_c(false);
          toast.success("Success ", {
            position: "top|right",
            margin: 15,
            delay: 0,
            duration: 2000,
          });
          setLinkgroup(`/group/${input}`);
          setInput("");
        });
      }
    });
  };

  const copylink = () => {
    navigator.clipboard.writeText("http://my-qna-pt.vercel.app" + linkgroup);
    toast.success("Link Disalin ", {
      position: "top|right",
      margin: 15,
      delay: 0,
      duration: 2000,
    });
  };

  // BTN DISABLE IF LENGTH INPUT > 5
  useEffect(() => {
    // BTN SEARCH
    if (inputsearch.length > 5) {
      setDisable_s(false);
    } else {
      setDisable_s(true);
    }

    //BTN INPUT CREATE GRUP
    if (input.length > 5) {
      setDisable_c(false);
    } else {
      setDisable_c(true);
    }
  });

  return (
    <>
      <Hero />
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "80vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-lg-5 col-md-6">
              <Card
                className="card-home card-search h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        borderRadius: "50%",
                      }}
                    >
                      <HiOutlineSearch className="text-white" size={24} />
                    </div>
                    <Card.Title
                      className="h4 mb-2"
                      style={{ color: "#2d3748" }}
                    >
                      Search Group QNA
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      Find and join existing groups
                    </Card.Subtitle>
                  </div>
                  <Card.Text>
                    <div className="mb-4">
                      <input
                        type="text"
                        onChange={(e) =>
                          setInputsearch(e.target.value.replace(/\s/g, ""))
                        }
                        value={inputsearch}
                        className="form-control"
                        placeholder="Enter group name..."
                        style={{
                          borderRadius: "15px",
                          border: "2px solid #e2e8f0",
                          padding: "12px 20px",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#667eea")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !disable_s) {
                            search();
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={() => search()}
                      className="btn btn-primary w-100"
                      disabled={disable_s}
                      style={{
                        background: disable_s
                          ? "#cbd5e0"
                          : "linear-gradient(135deg, #667eea, #764ba2)",
                        border: "none",
                        borderRadius: "15px",
                        padding: "12px",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        transform: disable_s ? "none" : "translateY(0)",
                      }}
                      onMouseEnter={(e) => {
                        if (!disable_s) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 10px 25px rgba(102, 126, 234, 0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!disable_s) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      <HiOutlineSearch className="me-2" />
                      Search Group
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-5 col-md-6">
              <Card
                className="card-home card-create h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(135deg, #48bb78, #38a169)",
                        borderRadius: "50%",
                      }}
                    >
                      <HiOutlinePlus className="text-white" size={24} />
                    </div>
                    <Card.Title
                      className="h4 mb-2"
                      style={{ color: "#2d3748" }}
                    >
                      Create New Group
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      Start your own QnA community
                    </Card.Subtitle>
                  </div>
                  <Card.Text>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) =>
                          setInput(e.target.value.replace(/\s/g, ""))
                        }
                        className="form-control"
                        placeholder="Enter group name..."
                        style={{
                          borderRadius: "15px",
                          border: "2px solid #e2e8f0",
                          padding: "12px 20px",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#48bb78")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !disable_c) {
                            createGroup();
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={() => createGroup()}
                      disabled={disable_c}
                      className="btn btn-success w-100"
                      style={{
                        background: disable_c
                          ? "#cbd5e0"
                          : "linear-gradient(135deg, #48bb78, #38a169)",
                        border: "none",
                        borderRadius: "15px",
                        padding: "12px",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!disable_c) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 10px 25px rgba(72, 187, 120, 0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!disable_c) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      <HiOutlinePlus className="me-2" />
                      Create Group
                    </button>
                  </Card.Text>

                  <div
                    className={
                      linkgroup !== "" ? "mt-4 p-3 rounded-3" : "d-none"
                    }
                    style={{
                      background: "linear-gradient(135deg, #e6fffa, #b2f5ea)",
                      border: "1px solid #81e6d9",
                    }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <HiOutlineUsers className="text-success me-2" />
                      <small className="fw-bold text-success">
                        Group Created Successfully!
                      </small>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Group Name:</small>
                      <div className="fw-semibold" style={{ color: "#2d3748" }}>
                        {namenewgroup}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Link
                        className="btn btn-sm btn-outline-success d-flex align-items-center"
                        to={linkgroup}
                        style={{ borderRadius: "10px", textDecoration: "none" }}
                      >
                        <BiLinkExternal className="me-1" size={14} />
                        Go to Group
                      </Link>
                      <button
                        onClick={() => copylink()}
                        className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                        style={{ borderRadius: "10px" }}
                        title="Copy link"
                      >
                        <AiOutlineCopy size={14} />
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
