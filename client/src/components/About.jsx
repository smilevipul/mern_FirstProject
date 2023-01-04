import React, { useEffect,useState } from "react";
import user_img from "../images/user.jpg";
import Button from "@mui/material/Button";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";


const About = () => {


  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({

  });

    const callAboutPage = async ()=>{
      try {
        const res = await fetch('/about',{
          method : "GET",
          headers : {
            Accept : "application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
  
        const data =await res.json();
        setUserData(data);
        // console.log(data);
        // console.log(userData.name);

        
        if(!res.status ===200)
        {
          const error = new Error(res.error);
          throw error;
        }
  
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
    }


    useEffect(()=>{
      callAboutPage();
    },[]);
  return (
    <>
      <div className="about_container">
        <div className="about_page">
          <form method="GET">
            <div className="left">
              <img src={user_img} alt="" style={{ height: "200px" }} />

              <h3>Work Link</h3>
              <div className="slinks">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/vipul-kumar-634821222/"
                >
                  LinkedIn
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/vipul-kumar-634821222/"
                >
                  LinkedIn
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/vipul-kumar-634821222/"
                >
                  LinkedIn
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/vipul-kumar-634821222/"
                >
                  LinkedIn
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/vipul-kumar-634821222/"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="middle">
              <div className="middiv_1">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p>Ranking : 1/10</p>
              </div>
              <div className="middiv_2">
                <div className="mt-5">
                  <ul className="nav nav-pills" id="myTab">
                    <li className="nav-item">
                      <a href="#home" className="nav-link active">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#profile" className="nav-link">
                        Profile
                      </a>
                    </li>
                  </ul>
                  
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="home">
                      <div>
                        <div className="heading">Name</div>
                        <div className="para">{userData.name}</div>
                      </div>
                      <div>
                        <div>Email</div>
                        <div>{userData.email}</div>
                      </div>
                      <div>
                        <div>phone Number</div>
                        <div>{userData.phone}</div>
                      </div>
                      <div>
                        <div>Work</div>
                        <div>{userData.work}</div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile">
                      <h4 className="mt-2">Profile tab content</h4>
                      <p>
                        Vestibulum nec erat eu nulla rhoncus fringilla ut non
                        neque. Vivamus nibh urna, ornare id gravida ut, mollis a
                        magna. Aliquam porttitor condimentum nisi, eu viverra
                        ipsum porta ut. Nam hendrerit bibendum turpis, sed
                        molestie mi fermentum id. Aenean volutpat velit sem. Sed
                        consequat ante in rutrum convallis. Nunc facilisis leo
                        at faucibus adipiscing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* {

document.addEventListener("DOMContentLoaded", function(){
  var tabList = [].slice.call(document.querySelectorAll("#myTab a"));
  tabList.forEach(function(tab){
      var tabTrigger = new bootstrap.Tab(tab);

      tab.addEventListener("click", function(event){
          event.preventDefault();
          tabTrigger.show();
      });
  });
})
} */}

                {/* <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">
                      Timeline
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>

            <div className="right">
              <Button
                className="btn-primary "
                variant="outlined"
                style={{ fontSize: "10px" }}
              >
                Edit Profile
              </Button>
            </div>

            {/* //data toggle */}
            {/* <div className="tab-content profile-tab " id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div>
                  hello
                </div>
                
              </div>
              
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
