import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "siiimple-toast";
import "siiimple-toast/dist/style.css"; // style required
import firebase from "../config";
import { getDatabase, ref, push, onValue } from "firebase/database";
import Footer from "../Components/Footer";
import { AiOutlineCopy } from "react-icons/ai";

// ─── Inline styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    --brand-primary: #5B4EFF;
    --brand-hover:   #4a3ee8;
    --brand-light:   #ede9ff;
    --surface:       #ffffff;
    --surface-alt:   #f7f6ff;
    --border:        #e4e1f7;
    --text-primary:  #1a1733;
    --text-secondary:#6b6897;
    --radius:        16px;
    --shadow:        0 4px 24px rgba(91,78,255,0.10);
    --shadow-hover:  0 8px 32px rgba(91,78,255,0.18);
  }

  body, .home-wrapper * {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .home-section {
    background: var(--surface-alt);
    padding: 48px 16px 64px;
    min-height: 40vh;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }
    .home-section {
      padding: 32px 16px 48px;
    }
  }

  .section-heading {
    text-align: center;
    margin-bottom: 36px;
  }
  .section-heading h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 6px;
  }
  .section-heading p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .qna-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px 28px;
    box-shadow: var(--shadow);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    display: flex;
    flex-direction: column;
  }
  .qna-card:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }

  .card-icon-wrap {
    width: 44px;
    height: 44px;
    background: var(--brand-light);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }
  .card-icon-wrap svg {
    width: 22px;
    height: 22px;
    color: var(--brand-primary);
    stroke: var(--brand-primary);
  }

  .qna-card h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 4px;
  }
  .qna-card .card-sub {
    font-size: 0.82rem;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .qna-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-size: 0.92rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text-primary);
    background: var(--surface-alt);
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 12px;
    box-sizing: border-box;
  }
  .qna-input:focus {
    border-color: var(--brand-primary);
    background: #fff;
  }
  .qna-input::placeholder {
    color: #b8b5d0;
  }

  .qna-btn {
    width: 100%;
    padding: 11px 16px;
    background: var(--brand-primary);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
    letter-spacing: 0.01em;
  }
  .qna-btn:hover:not(:disabled) {
    background: var(--brand-hover);
  }
  .qna-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .result-bar {
    margin-top: 16px;
    padding: 14px 16px;
    background: var(--brand-light);
    border-radius: 10px;
    border: 1px solid #d1caff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
  .result-bar-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .result-bar-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  .result-bar-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  .result-bar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .result-go-btn {
    padding: 6px 14px;
    background: var(--brand-primary);
    color: #fff !important;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none !important;
    transition: background 0.2s;
  }
  .result-go-btn:hover {
    background: var(--brand-hover);
  }
  .copy-btn {
    width: 34px;
    height: 34px;
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--brand-primary);
    font-size: 1.1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .copy-btn:hover {
    border-color: var(--brand-primary);
    box-shadow: 0 0 0 3px rgba(91,78,255,0.12);
  }
`;

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Home = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState("");
  const [namenewgroup, setNamenewgroup] = useState("");
  const [disable_s, setDisable_s] = useState(true);
  const [disable_c, setDisable_c] = useState(true);
  const [linkgroup, setLinkgroup] = useState("");
  const [inputsearch, setInputsearch] = useState("");
  const [allgroup, setAllgroup] = useState([]);

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
    if (allgroup !== []) {
      navigate(`/group/` + inputsearch);
    }
  };

  // FUNGSI KETIKA BTN CREATE GRUP ONCLICK
  const createGroup = () => {
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
    if (inputsearch.length > 5) {
      setDisable_s(false);
    } else {
      setDisable_s(true);
    }

    if (input.length > 5) {
      setDisable_c(false);
    } else {
      setDisable_c(true);
    }
  });

  return (
    <>
      <style>{styles}</style>
      {/* <Hero /> */}

      <div className="home-section home-wrapper">
        <div className="section-heading">
          <h2>Kelola Grup QNA Anda</h2>
          <p>
            Cari grup yang sudah ada atau buat grup baru untuk sesi presentasi
            Anda
          </p>
        </div>

        <div className="cards-grid">
          {/* Search Card */}
          <div className="qna-card">
            <div className="card-icon-wrap">
              <SearchIcon />
            </div>
            <h3>Cari Grup QNA</h3>
            <p className="card-sub">Masukkan nama grup untuk bergabung</p>
            <input
              type="text"
              className="qna-input"
              onChange={(e) =>
                setInputsearch(e.target.value.replace(/\s/g, ""))
              }
              value={inputsearch}
              placeholder="Nama Grup (min. 6 karakter)"
            />
            <button
              className="qna-btn"
              onClick={() => search()}
              disabled={disable_s}
            >
              Cari Grup
            </button>
          </div>

          {/* Create Card */}
          <div className="qna-card">
            <div className="card-icon-wrap">
              <PlusIcon />
            </div>
            <h3>Buat Grup Baru</h3>
            <p className="card-sub">Buat grup QNA untuk sesi presentasi Anda</p>
            <input
              type="text"
              className="qna-input"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/\s/g, ""))}
              placeholder="Nama Grup Baru (min. 6 karakter)"
            />
            <button
              className="qna-btn"
              onClick={() => createGroup()}
              disabled={disable_c}
            >
              Buat Grup
            </button>

            {linkgroup !== "" && (
              <div className="result-bar">
                <div className="result-bar-info">
                  <span className="result-bar-label">Grup berhasil dibuat</span>
                  <span className="result-bar-name">{namenewgroup}</span>
                </div>
                <div className="result-bar-actions">
                  <Link className="result-go-btn" to={linkgroup}>
                    Buka Grup
                  </Link>
                  <div
                    className="copy-btn"
                    onClick={() => copylink()}
                    title="Salin link"
                  >
                    <AiOutlineCopy />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
