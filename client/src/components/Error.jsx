import React from 'react'
import Button from "@mui/material/Button";
import { NavLink } from 'react-router-dom';



const Error = () => {
  return (
    <>
    <div className='error_container'>
       <div className='error_container_inner'>
       <h2>WE ARE SORRY,PAGE NOT FOUND</h2>
        <p> The page you are looking might have been removed or had its name changed or temporory unavailable</p>
        <Button className='btn' variant="outlined"> <NavLink className="error_link" to="/">Back to Homepage</NavLink></Button>

       </div>
    </div>

    </>
  )
}

export default Error;