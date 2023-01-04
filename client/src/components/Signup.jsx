import React,{useState} from "react";
import signin from "../images/signin.webp";
import { NavLink, useNavigate} from "react-router-dom";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";

const Signup = () => {
  const navigate = useNavigate();

  const [getData, setData] = useState({
    name : "",
    email : "",
    phone : "",
    work : "",
    password : "",
    cpassword : "",
  })

  const InputEvent = (event)=>{
    const {name,value} = event.target;

    setData((preVal)=>{
      return {
        ...preVal,
        [name]:value,
      }

    })
  }



  const OnSubmit =async (e)=>{
    e.preventDefault();

    const {name,email,phone,work,password,cpassword} = getData;

    const res =await fetch('/register',{

      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify({
        name : name,
        email : email,
        phone : phone,
        work : work,
        password : password,
        cpassword : cpassword

      })

    })

    const data = res.json();
    if(!data || data.status === 422)
    {
      // window.alert("invalid registraion")
      console.log("Invalid registration")
    }
    else
    {
      // window.alert(" registraion successful")
      console.log("registration successful")
      navigate('/login')
      
    }

  }


  return (
    <>
      <div className="signl1">
        <div className="signl2">
          <div className="signl21">
            <h1>Sign up</h1>
            <form  method="POST" >
              <div className="input_div">
                <i className="fa-solid fa-user"></i>
                <input type="text" name="name" placeholder="Your Name" onChange={InputEvent}
                  value={getData.name} />
              </div>
              <div>
              <i className="fa-solid fa-envelope"></i>
                <input type="email" name="email" placeholder="Your Email"  onChange={InputEvent}
                  value={getData.email} />
              </div>
              <div>
              <i className="fa-solid fa-phone"></i>
                <input
                  type="phone"
                  name="phone"
                  onChange={InputEvent}
                  value={getData.phone}
                  placeholder="Your Mobile Number"
                />
              </div>
              <div>
              <i className="fa-solid fa-user-tie"></i>
                <input type="work" name="work" placeholder="Your Profession"  onChange={InputEvent}
                  value={getData.work} />
              </div>
              <div>
              <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  onChange={InputEvent}
                  value={getData.password}
                />
              </div>
              <div>
              <i className="fa-solid fa-lock"></i>
                <input
                  type="cpassword"
                  name="cpassword"
                  placeholder="Your Confirm Password"
                  onChange={InputEvent}
                  value={getData.cpassword}
                />
              
              </div>
            <Button variant="outlined" type="submit" onClick={OnSubmit}>register</Button>
            </form>
          </div>
          <div className="signl22">
            <img src={signin} alt="signin" style={{ height: "50%" }} />
            <NavLink className="rlogin" to="/login">
              I am already register
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
