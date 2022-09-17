import React, { useRef } from "react";
import {  useSelector } from "react-redux";
import "./style/general.css";
import Logo from "./images/logo.jpeg"
import axios from "axios";
const Register =()=>{
    const result = useSelector(mapStateToProps)
    const name = useRef();
    const userName = useRef();
    const passWord = useRef();
    const email = useRef();
    

const register=(e)=>{
    e.preventDefault()
    const username= userName.current.value;
    const password = passWord.current.value;

        axios({
          method: "POST",
          data: {
            name:name.current.value,
            email:email.current.value,
            username: username,
            password: password,

          },
          withCredentials: true,
          url: "http://localhost:8080/register/admin",
        }).then((res) => console.log(res));
      

    
}
console.log(result)
    return (<>
<div className="log-cont c-h-flex">
    <div className="log-form c-v-flex">
        <form className='l-v-flex' onSubmit={register}>
        <div className="logo c-h-flex">
            <img src={Logo} width="200px"/>

        </div>
            
            <label>Full Name</label>
            <input type = "text" placeholder='Enter your Name' ref={name} required/>
            <label>Username</label>
            <input type = "text" placeholder='Enter your password' ref={userName} required/>
            <label>Email</label>
            <input type = "email" placeholder='Enter your email adddress...' ref={email} required/>
            <label>Password</label>
            <input type ="text" placeholder ='Enter your password' ref={passWord} required/>

              <input className="s-btn" id="btn-rg" type="submit" value="Register" />
              
        </form>
    </div>
</div>

        </>)
}
const mapStateToProps = ({parteners})=>{

    return parteners
    }
export default Register;