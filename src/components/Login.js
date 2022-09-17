import React, { useRef, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import "./style/login.css";
import "./style/general.css";
import Logo from "./images/logo.jpeg";
import { logIn } from "../actions/login";
const Login =()=>{
  
    const result = useSelector(mapStateToProps)
    const userName = useRef();
    const passWord = useRef();
    const [type,setType] = useState(null)
    const dispatch = useDispatch()
const log_In=(e)=>{
    e.preventDefault()
    const username= userName.current.value;
    const password = passWord.current.value;
dispatch(logIn({username:username,password:password}));

    
}
const onChoose =(e,p)=>{ //
  

      let arr = document.querySelectorAll(".log-tab");
      arr.forEach(a=>{
        a.classList.remove(p);
        
      });
      if(e.target.className.includes(p)){
        e.target.classList.remove(p);  
        
      }
      if(!e.target.className.includes(p)){
        
        e.target.classList.add(p);
        
      }
      setType(e.target.value)
    
  }
    
    return (<>
<div className="log-cont c-h-flex">
            {/* <div className="log-nave">
                <ul>
                    <a className="log-tab" value="worker" onClick={(event)=>onChoose(event,"log-active")}>موظف </a>
                    <a className="log-tab" value="partener" onClick={(event)=>onChoose(event,"log-active")}>مستثمر </a>
                    <a className="log-tab" value="admin" onClick={(event)=>onChoose(event,"log-active")}>ادمن </a>
                </ul>
            </div> */}
    <div className="log-form c-v-flex">
        <form className='l-v-flex' onSubmit={log_In}>
        <div className="logo c-h-flex">
            <img src={Logo} width="200px"/>

        </div>
            

            <label>Username</label>
            <input type = "text" placeholder='username' ref={userName}/>
            
            <label>Password</label>
            <input type ="password" placeholder ='password' ref={passWord} />
              <input className="s-btn" id="btn" type="submit" value="login" />
        </form>
    </div>
</div>

        </>)
}
const mapStateToProps = ({user})=>{

    return user
    }
export default Login;