import React from "react";
import { useNavigate } from "react-router-dom";
import "./Fail.css";
function Fail() {
    const navigate = useNavigate()
    function goback() {
        navigate("/")
    }
    return (
        <div className="fail-page">
            <div className="card">
                <div className="card-in">
                    <div className="card-front">
                        <h2 className="textf">Login Failed ❌</h2>
                        <p className="textf2">Hover to see Y!!</p>
                    </div>
                    <div className="card-back">
                        <h1 className="ftext">Wrong Credentials</h1>
                        <p className="ftext2">Please try again</p>
                        <button className='ftext3' onClick={goback}>Try again</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Fail