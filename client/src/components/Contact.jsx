import React, { useEffect,useState } from 'react';
import Button from "@mui/material/Button";

const Contact = () => {
  
  const [userData, setUserData] = useState({
    name : " ",
    email: " ",
    phone : " ",
    message: " "

  });

    const callAboutPage = async ()=>{
      try {
        const res = await fetch('/getData',{
          method : "GET",
          headers : {
            
            "Content-Type":"application/json"
          },
        });
  
        const data =await res.json();
        setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

        
        if(!res.status ===200)
        {
          const error = new Error(res.error);
          throw error;
        }
  
      } catch (error) {
        console.log(error)
        
      }
    }


    useEffect(()=>{
      callAboutPage();
    },[]);

    // storing data in states 
    const handleInputs = (e)=>{
      const name = e.target.name;
      const value = e.target.value;

      setUserData({...userData,[name]:value})
    }

    // send data to backend 
    const SubmitForm = async (e)=>{
      e.preventDefault();

      const {name,email,phone,message} = userData;
      
      const res = await fetch('/contact' ,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          phone:phone ,
          message:message
        })
      });

      const data = await res.json();

      if(!data){
        console.log("Messsge not sent");
      }
      else
      {
        alert("Message Sent");
        setUserData({...userData,message :""})
      }
    }
  

  return (
    <>
    <div className='contactl1'>
    <div className='contactl21'>
      <div className='contact_box'>
        📱
       <div>
       <h5>Phone</h5>
        <p>+91877887378</p>
       </div>
      </div>
      <div className='contact_box'>
        📧
       <div>
       <h5>Email</h5>
        <p>lws@smail.com</p>
       </div>
      </div>
      <div className='contact_box'>
        🏠
        <div>
        <h5>Address</h5>
        <p>Supaul,Bihar,India</p>
        </div>
      </div>
    </div>

    <div className='contactl22'>
      <h3>Get In Touch</h3>
      <form method='POST'>
        <div className='field1'>
          <input className='name' type="text" name="name" value = {userData.name} onChange={handleInputs}  placeholder='Your Name'/>
          <input className='email' type="email" name="email" value = {userData.email} onChange={handleInputs} placeholder='Your Email'/>
          <input type="number" name="phone" value = {userData.phone} onChange={handleInputs} placeholder='Your Phone Number'/>
        </div>
        <div className='filed2'>
          <textarea rows="5" cols="10" name='message' value = {userData.message} onChange={handleInputs}  placeholder='Message'/>
          <Button className='btn' variant="outlined" onClick={SubmitForm}>Send Message</Button>
        </div>
      </form>
        
    </div>
    </div>
    </>
  )
}

export default Contact