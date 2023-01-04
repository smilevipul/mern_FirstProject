import React ,{useContext, useState} from 'react';
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import signin from "../images/login.webp";
import { userContext } from '../App';


const Login = () => {

  const {state,dispatch} = useContext(userContext);

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const userLogin =async (e)=>{
    e.preventDefault();

    

    const res =await fetch('/signin',{
          method : "POST",
          headers : {
              "Content-Type":"application/json"
          },
          body :JSON.stringify({
              email:email,
              password:password

          })
        })

        const data = res.json();

        if(!data || res.status === 400)
        {
          console.log("Invalid registrtrion")
        }
        else
        {
          dispatch({type: "USER",payload:true})
          console.log("login successfull")
          navigate('/');
        }
  }

  return (
    <>
        <div className="signl1">
        <div className="signl2">
        <div className="signl22">
            <img src={signin} alt="signin" style={{ height: "50%" }} />
            <NavLink className="rlogin" to="/signup">
              Create Account
            </NavLink>
          </div>
          <div className="signl21">
            <h1>Login</h1>
            <form method='POST'>
              <div>
              <i className="fa-solid fa-user"></i>
                <input type="email" name="email" value={email} onChange = {(event)=>{setEmail(event.target.value)}} placeholder="Your Email" />
              </div>
              <div>
              <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange = {(event)=>{setPassword(event.target.value)}}
                  placeholder="Your Password"
                />
              </div>
            <Button variant="outlined" onClick={userLogin}>Login</Button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login