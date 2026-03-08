import { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import againwrong from './againwrong.mp4'
import first from './first.mp4'
import correct from './correct.mp4'
import wrong from './wrong.mp4'

function App() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [failCount, setFailCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef();
  const resetBtnRef = useRef();
  const navigate = useNavigate();
  const timeRef = useRef(null)

const BASE_URL = process.env.REACT_APP_BACKEND_URL;


  function handleUser(evt) {
    setUser(evt.target.value);
  }

  function handlePass(evt) {
    setPass(evt.target.value);
  }

  async function check() {
    if (!user || !pass) {
      setMessage("Please enter both username and password");
      setMsgType("error");
      return;
    }

    setLoading(true);
    setMessage("");


    setTimeout(async () => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          username: user.trim(),
          password: pass.trim(),
        });

        if (response.data === true) {
          // SUCCESS
          setMessage("Login Successful!");
          setMsgType("success");
          setFailCount(0);
          if (videoRef.current) videoRef.current.src = correct;
          setTimeout(() => {
            navigate("/Success");
          }, 6000)

        } else {
          // FAILURE
          const newFailCount = failCount + 1;
          setFailCount(newFailCount);
          setMessage("Login Failed!");
          setMsgType("error");

          if (videoRef.current) {
            videoRef.current.src = newFailCount === 1 ? wrong : againwrong;
            videoRef.current.load();
            videoRef.current.play();
          }

          if (resetBtnRef.current) resetBtnRef.current.style.display = "block";


          timeRef.current = setTimeout(() => {
            navigate("/Fail");
          }, 8000)

        }
      } catch (err) {
        console.error("Server error", err);
        setMessage("Cannot connect to server!");
        setMsgType("error");
      } finally {
        setLoading(false);
      }
    }, 1200);
  }

  function resetForm() {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
    setFailCount(0);
    setUser("");
    setPass("");
    setMessage("");
    setMsgType("");
    if (videoRef.current) videoRef.current.src = first;
    if (resetBtnRef.current) resetBtnRef.current.style.display = "none";
  }

  return (
    <div className='body'>
      <div className='logincontainer'>
        <div className='imgpart'>
          <video ref={videoRef} autoPlay muted playsInline>
            <source src={first} type="video/mp4" />
          </video>
        </div>

        <div className='login-part'>
          <h2>Sign In</h2>

          <div className='input-part'>
            <label htmlFor="username">User Name</label>
            <input type="text" value={user} onChange={handleUser} />
          </div>

          <div className='input-part'>
            <label htmlFor="password">Password</label>
            <input type="password" value={pass} onChange={handlePass} />
          </div>

          {message && (
            <div className={`message ${msgType}`}>
              {message}
            </div>
          )}

          <button className='btn' onClick={check} disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

          <button
            className="btn btn-secondary"
            ref={resetBtnRef}
            style={{ display: "none" }}
            onClick={resetForm}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;