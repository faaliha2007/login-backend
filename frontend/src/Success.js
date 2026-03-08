import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";
function Success() {
      const navigate = useNavigate()
    function logout()
    {
      
       navigate("/")
    }
    return (
        <div className="success-page">
            <div className="card">
                <div className="card-in">
                    <div className="card-front">
                        <h2 className="text2">Login Successful 🎉</h2>
                        <p className="text3">Flip to reveal</p>
                    </div>
                    <div className="card-back">
                        <h1 className="text">Welcome Faali 💗!!</h1>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Success