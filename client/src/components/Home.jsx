import React,{useState,useEffect} from 'react'

const Home = () => {

  const [userData, setUserData] = useState({});
  const [greet,setGreet] = useState(false);

    const callHomePage = async ()=>{
      try {
        const res = await fetch('/getData',{
          method : "GET",
          headers : {
            
            "Content-Type":"application/json"
          },
        });
  
        const data =await res.json();
        setUserData(data);
        setGreet(true);

        
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
      callHomePage();
    },[]);


  return (
    <>
     <div className='home'>
     <p>Welcome</p>
     <h1 style={{fontSize :"70px" , color:"black"}}>{userData.name}</h1>
     <h6> {greet ? "Happy to see you back" : "We are the MERN Developer"}</h6>
     </div>
    </>
  )
}

export default Home