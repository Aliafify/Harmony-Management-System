import React,{useEffect} from "react";
import SidNav from "./sideNav";
import "./style/sidNav.css";
import "./style/topNav.css";
import {distribute} from "./glopalFunctions"
import { handelInetialData } from "../actions/getData";
import { useDispatch,useSelector } from "react-redux";
import { inetializeC } from "../actions/clients";
import { inetialize_admin } from "../actions/admin";
import { Outlet } from "react-router-dom";

 const Dashboard = ()=>{
  const dispatch = useDispatch();
  const result = useSelector(mapStateToProps)
  const role =result.user.user.role;
  useEffect(()=>{
    dispatch(handelInetialData());//inetialize parteners
    dispatch(inetializeC());//inetialize clients
  role === "Admin"&& dispatch(inetialize_admin());
  role === "Worker"&& dispatch(inetialize_admin());

  },[])
            return(<>
            <div className="dashboard-cont">
             {role==="Admin"&&<SidNav />}
             <div className={role==="Partener"?"part-report-cont":"view"}>
               {/* <h1> Welcome {result.user.user.username}</h1> */}
   
               <Outlet/>
             </div>
            </div>

            </>) 

}
const mapStateToProps = ({parteners,user,admin})=>{

  return {parteners,user,admin}
  }
export default Dashboard