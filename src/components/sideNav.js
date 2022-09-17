import React from "react";
import "./style/sidNav.css";
import Logo from "./images/logo.jpeg";
import { Link, NavLink } from "react-router-dom";
const Tap =({index,viewComponent,setView,name})=>{
    return (<>
    <li className="menu-item" onClick={()=>setView(viewComponent[index])}>{name}</li>
    <hr/>
    </>)
}
const SidNav = ()=> {
    const taps = [{name:"المستثمرين",path:""},{name:"العملاء",path:"clients"},{name:"عميل جديد",path:"addclient"},{name:"مستثمر جديد",path:"addpartener"},
                  {name:"موظف جديد",path:"add-worker"},
                   {name:"طرق الدفع",path:"addmethod"},
                   {name:"الاعدادات",path:"settings"}];
    
    
    return(
        <>
        <div className="sidnav ">
        <img src={Logo} className="logo"/> 
        <ul className="side-menu">
           {taps.map((t,index)=>(
               <li key={index} className="menu-item">
               <NavLink className="side-link"   to={t.path}>{t.name}</NavLink>
               <hr/>
               </li>
))}
        </ul>
        </div>
        </>
    )
}
export default SidNav;